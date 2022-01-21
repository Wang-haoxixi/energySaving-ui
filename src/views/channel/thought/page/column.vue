<template>
  <div class="thought-column">
    <div class="avatar">
      <iep-popover-user-card :user-id="formData.userId">
        <iep-img :src="formData.avatar" alt class="img"></iep-img>
      </iep-popover-user-card>
    </div>
    <div class="content-list">
      <div class="top">
        <div class="title">
          <iep-popover-user-card :user-id="formData.userId">
            <div class="name">{{formData.userName}}</div>
          </iep-popover-user-card>
          <div class="right" v-if="userInfo.userId !== formData.userId">
            <!-- 原先的关注按钮 -->
          </div>
          <div class="top" v-if="formData.isTop === 2">置顶</div>
        </div>
        <!-- 是否关注 -->

        <!-- <div class="date right">F{{formData.thoughtsId}}</div> -->
      </div>
      <!-- 说说的内容 -->
      <contentTpl :data="formData">
        <!-- 转发原内容 -->
        <div class="forward-content" v-if="formData.transmitId > 0">
          <forwardContent
            :contentData="formData.transmittedThoughts"
            @click.native="handleForwardDetail(formData.transmittedThoughts.thoughtsId)"
          ></forwardContent>
        </div>
      </contentTpl>
      <!-- 按钮组 -->
      <div class="footer">
        <!-- 时间 -->
        <div class="date">
          <i class="el-icon-woneng-shijian"></i>
          {{formData.createTime}}
        </div>
        <div class="right-opt">
          <!-- 评论 -->
          <div class="button" @click="handleComment(formData)">
            <span v-if="activeState">
              <i class="el-icon-woneng-arrowup"></i>收起
            </span>
            <span v-else title="评论">
              <i class="el-icon-woneng-pinglun" style="margin-top:1px"></i>
              <span v-if="formData.commentNum">{{formData.commentNum}}</span>
            </span>
          </div>
          <!-- 转发 -->
          <div class="button" @click="handleForward(formData)" v-if="formData.transmitId === 0">
            <i class="el-icon-woneng-zhuanfa"></i>
            <span v-if="formData.transmittedTimes">{{formData.transmittedTimes}}</span>
          </div>
          <!-- 点赞 -->
          <el-popover
            class="button"
            placement="left-start"
            title
            width="200"
            trigger="hover"
            :content="reference"
            :close-delay="0"
          >
            <div
              slot="reference"
              class="button"
              @click="hadnleAddUp(formData)"
              @mouseenter="mouseenterUp(formData)"
              @mouseleave="mouseleaveUp"
              :class="formData.praiseStatus > 0 ? 'red' : ''"
              title="点赞"
            >
              <i class="el-icon-woneng-zai" :class="{'isPraise': formData.praiseStatus === 1}"></i>
              <span v-if="formData.thumbsUpCount">{{formData.thumbsUpCount}}</span>
            </div>
          </el-popover>
          <!-- 收藏 -->
          <div class="button" title="收藏" @click="handleCollect(formData)">
            <i class="el-icon-woneng-heart"></i>
          </div>
          <!-- 举报 -->
          <div class="button" title="举报" @click="handleReport(formData, 0)">
            <i class="el-icon-woneng-jubao1"></i>
          </div>
        </div>
      </div>
      <!-- 说说评论 -->
      <div class="comment" v-if="activeState">
        <el-input type="textarea" rows="4" v-model="replyMsg" maxlength="250"></el-input>
        <iep-button class="comment-submit iep-btn-m" @click="() => {activeState = false}">取消</iep-button>
        <iep-button
          type="primary"
          class="comment-submit iep-btn-m"
          @click="commentSubmit(formData)"
        >发送</iep-button>
      </div>
      <!-- 评论列表 -->
      <div class="comment-list" v-if="formData.commentNum > 0 && activeState">
        <div class="comment-head">评论（{{ formData.commentNum }}）</div>
        <commentPage ref="comment" :data="formData" @load-data="freshComment(formData.thoughtsId)"></commentPage>
      </div>
    </div>
    <!-- 转发 -->
    <forwardDialog ref="forward" @load-page="loadPage"></forwardDialog>
  </div>
</template>

<script>
import {
  addThumbsUpByRecord,
  CommentThoughts,
  getDetailById,
  getThumbMembers,
} from "@/api/dms/thoughts";
import forwardContent from "../library/forwardContent";
import commentPage from "../library/commentPage";
import contentTpl from "../library/content";
import { mapGetters } from "vuex";
import { getName } from "../library/util";
import { createCollection } from "@/api/dms/collection";
import { mapMutations } from "vuex";
import forwardDialog from "../forwardDialog";

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    nameList: [],
  };
};

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    forwardContent,
    commentPage,
    contentTpl,
    forwardDialog,
  },
  computed: {
    ...mapGetters(["userInfo"]),
    formData: {
      get() {
        return Object.assign({}, this.data, this.columnData);
      },
      set() {},
    },
  },
  data() {
    return {
      form: initFormData(),
      columnData: {},
      replyMsg: "",
      reference: "加载中...",
      activeState: false,
    };
  },
  methods: {
    loadPage() {
      this.$emit("load-page", true);
    },
    // 说说详情
    handleForwardDetail(id) {
      this.$router.push(`/thought/thought_detail/${id}`);
    },
    // 收起展开评论
    handleComment() {
      if (this.activeState) {
        this.activeState = false;
        return;
      }
      this.activeState = true;
      this.form = {
        replyMsg: "",
        // thoughtsId: item.thoughtsId,
        nameList: [],
      };
    },
    // 评论
    commentSubmit(item) {
      const form = initFormData();
      if (this.replyMsg == "") return;
      // 判断说说中是否存在人名
      item.replyMsg = this.replyMsg;
      const nameObj = getName(item.replyMsg);
      if (nameObj.type) {
        form.nameList = nameObj.list.map((m) => m.name);
      }
      form.thoughtsId = item.thoughtsId;
      form.replyMsg = item.replyMsg;
      CommentThoughts(form).then(({ data }) => {
        if (data) {
          this.freshComment(item.thoughtsId);
        }
      });
      this.replyMsg = "";
    },
    // 刷新单条数据
    freshComment(id) {
      getDetailById(id).then(({ data }) => {
        if (data) {
          this.columnData = { ...data };
          this.$emit("fresh-right", true);
        }
      });
    },
    // 点赞
    hadnleAddUp(row) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data }) => {
        if (data) {
          this.freshComment(row.thoughtsId);
          this.mouseenterUp(row, true);
        }
      });
    },
    // 点赞详情信息
    mouseenterUp(row, type = false) {
      if (row.thumbsUpCount > 0 || type) {
        getThumbMembers(row.thoughtsId).then(({ data }) => {
          if (data.length === 0) {
            this.reference = "暂无人点赞";
          } else {
            this.reference = data.map((m) => m.name).join("、");
          }
        });
      } else {
        this.reference = "暂无人点赞";
      }
    },
    mouseleaveUp() {},
    // 转发
    handleForward(row) {
      this.$refs["forward"].open(row);
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport(row, type) {
      this.openReportDialog({ id: row.thoughtsId, type: type });
    },
    // 收藏
    handleCollect(row) {
      createCollection({
        targetId: row.thoughtsId,
        type: 2,
        name: row.content.slice(0, 15),
      }).then(({ data }) => {
        if (data) {
          this.$message.success("收藏成功！");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.thought-column {
  margin-bottom: 40px;
  display: flex;
  .name {
    cursor: pointer;
  }
  .avatar {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: $--border-radius-base;
    .img {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: $--border-radius-base;
      overflow: hidden;
    }
  }
  .content-list {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .right.date {
      float: right;
      padding: 0 10px;
      font-size: 12px;
      color: $--color-text-secondary;
      background: rgba(244, 245, 246, 1);
      border-radius: 10px;
    }
    .comment {
      margin: 20px 0;
      text-align: right;
      .comment-submit {
        margin-top: 10px;
        margin-left: 10px;
        &:hover {
          background-color: $--custom-menu-background-color;
          color: $--color-primary;
        }
      }
    }
    .comment-list {
      background-color: $--background-color;
      margin-top: 15px;
      border-radius: 10px;
      .comment-head {
        margin-bottom: -15px;
        padding: 15px 0 0 25px;
      }
    }
    .title {
      display: flex;
      align-items: center;
      .name {
        font-family: Microsoft YaHei;
        color: #303031;
      }
      .date {
        padding-left: 15px;
        color: $--color-text-regular;
        i {
          font-size: 14px !important;
        }
        &:nth-of-type(3) {
          font-size: 14px;
          color: $--color-text-secondary;
        }
      }
      .top {
        border: 1px solid $--color-primary;
        color: $--color-primary;
        border-radius: 3px;
        font-size: 12px;
        padding: 0 5px;
        margin-left: 15px;
        margin-top: 5px;
        height: 18px;
        line-height: 18px;
      }
    }
    .right {
      .add {
        i {
          margin-right: 5px;
          font-size: 14px !important;
        }
      }
    }
    .item {
      margin-top: 7px;
    }
    .footer {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .right-opt {
        display: flex;
      }
      .date {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: $--color-text-secondary;
        i {
          margin-right: 5px;
          color: #babec0;
        }
      }
      .button {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 20px;
        height: 20px;
        cursor: pointer;
        color: $--color-text-secondary;
        .isPraise {
          color: $--color-primary !important;
        }
        i {
          margin-right: 3px;
        }
        span {
          display: flex;
          align-items: center;
          i {
            margin-right: 3px;
          }
        }
        &:last-child {
          margin-right: 0;
        }
        .button {
          i {
            margin-right: 3px;
            color: #666769;
          }
          span {
            color: $--color-text-secondary;
          }
        }
        // i {
        //   margin-top: 2px;
        //   margin-right: 5px;
        // }
        &:hover {
          color: #f74437;
          border-color: #f74437;
        }
      }
    }
    &::v-deep .forward-content {
      background-color: #fafafa;
      padding: 20px;
      margin-top: 15px;
      cursor: pointer;
    }
  }
}
.red {
  color: #f74437;
}
</style>
