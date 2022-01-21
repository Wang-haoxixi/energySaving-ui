<template>
  <div class="library">
    <div class="items" v-for="(item, index) in thoughtList" :key="index">
      <div class="avatar">
        <iep-popover-user-card :user-id="item.userId">
          <iep-img :src="item.avatar" alt class="img"></iep-img>
        </iep-popover-user-card>
      </div>
      <div class="content-list">
        <div class="top">
          <div class="title">
            <iep-popover-user-card :user-id="item.userId">
              <div class="name">{{item.userName}}</div>
            </iep-popover-user-card>
            <div class="right" v-if="userInfo.userId !== item.userId">
              <!-- 原先的关注按钮 -->
            </div>
            <div class="top" v-if="item.isTop === 2">置顶</div>
          </div>
          <!-- 是否关注 -->

          <!-- <div class="date right">F{{item.thoughtsId}}</div> -->
        </div>
        <!-- 说说的内容 -->
        <contentTpl :data="item">
          <!-- 转发原内容 -->
          <div class="forward-content" v-if="item.transmitId > 0">
            <forwardContent
              :contentData="item.transmittedThoughts"
              @click.native="handleForwardDetail(item.transmittedThoughts.thoughtsId)"
            ></forwardContent>
          </div>
        </contentTpl>
        <!-- 按钮组 -->
        <div class="footer">
          <!-- 时间 -->
          <div class="date">
            <i class="el-icon-woneng-shijian"></i>
            {{item.createTime}}
          </div>
          <div class="right-opt">
            <!-- 评论 -->
            <div class="button" @click="handleComment(item, index)">
              <span v-if="item.activeIndex === index">
                <i class="el-icon-woneng-arrowup"></i>收起
              </span>
              <span v-else title="评论">
                <i class="el-icon-woneng-pinglun" style="margin-top:1px"></i>
                <span v-if="item.commentNum">{{item.commentNum}}</span>
              </span>
            </div>
            <!-- 转发 -->
            <div class="button" @click="handleForward(item)" v-if="item.transmitId === 0">
              <i class="el-icon-woneng-zhuanfa"></i>
              <span v-if="item.transmittedTimes">{{item.transmittedTimes}}</span>
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
                @click="hadnleAddUp(item, index)"
                @mouseenter="mouseenterUp(item)"
                @mouseleave="mouseleaveUp"
                :class="item.praiseStatus > 0 ? 'red' : ''"
                title="点赞"
              >
                <i class="el-icon-woneng-zai" :class="{'isPraise': item.praiseStatus === 1}"></i>
                <span v-if="item.thumbsUpCount">{{item.thumbsUpCount}}</span>
              </div>
            </el-popover>
            <!-- 收藏 -->
            <div class="button" title="收藏" @click="handleCollect(item)">
              <i class="el-icon-woneng-heart"></i>
            </div>
            <!-- 举报 -->
            <div class="button" title="举报" @click="handleReport(item, 0)">
              <i class="el-icon-woneng-jubao1"></i>
            </div>
          </div>
        </div>
        <!-- 说说评论 -->
        <div class="comment" v-if="item.activeIndex === index">
          <el-input type="textarea" rows="4" v-model="replyMsg" maxlength="250"></el-input>
          <iep-button class="comment-submit iep-btn-m" @click="() => {item.activeIndex = -1}">取消</iep-button>
          <iep-button
            type="primary"
            class="comment-submit iep-btn-m"
            @click="commentSubmit(item, index)"
          >发送</iep-button>
        </div>
        <!-- 评论列表 -->
        <div class="comment-list" v-if="item.commentNum > 0 && item.activeIndex === index">
          <div class="comment-head">评论（{{ item.commentNum }}）</div>
          <commentPage ref="comment" :data="item" @load-data="freshComment(item.thoughtsId, index)"></commentPage>
        </div>
      </div>
    </div>
    <!-- 转发 -->
    <forwardDialog ref="forward" @load-page="loadPage"></forwardDialog>
  </div>
</template>

<script>
import {
  addThumbsUpByRecord,
  getThumbMembers,
  CommentThoughts,
  getDetailById,
} from "@/api/dms/thoughts";
import { mapGetters, mapMutations } from "vuex";
import forwardContent from "../library/forwardContent";
import commentPage from "../library/commentPage";
import contentTpl from "../library/content";
import forwardDialog from "../forwardDialog";
import { getName } from "../library/util";
import { createCollection } from "@/api/dms/collection";

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    nameList: [],
  };
};

export default {
  components: {
    forwardContent,
    commentPage,
    contentTpl,
    forwardDialog,
  },
  props: {
    dataList: {
      type: Array,
    },
    isTop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      activeIndex: -1,
      form: initFormData(),
      reference: "加载中...",
      thoughtList: [],
      replyMsg: "",
    };
  },
  methods: {
    loadPage() {
      this.$emit("load-page", true);
    },
    // 点赞
    hadnleAddUp(row, index) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data }) => {
        if (data) {
          this.freshComment(row.thoughtsId, index);
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
    // 说说详情
    handleForwardDetail(id) {
      this.$router.push(`/thought/thought_detail/${id}`);
    },
    mouseleaveUp() {},
    // 收起展开评论
    handleComment(item, index) {
      if (this.thoughtList[index].activeIndex === index) {
        this.thoughtList[index].activeIndex = -1;
        return;
      }
      this.$set(this.thoughtList[index], "activeIndex", index);
      this.form = {
        replyMsg: "",
        // thoughtsId: item.thoughtsId,
        nameList: [],
      };
    },
    // 评论
    commentSubmit(item, index) {
      const form = initFormData();
      if (this.replyMsg == "") return;
      // 判断说说中是否存在人名
      item.replyMsg = this.replyMsg;
      const nameObj = getName(item.replyMsg);
      if (nameObj.type) {
        form.nameList = nameObj.list.map((m) => m.name);
      }
      form.thoughtsId = this.thoughtList[index].thoughtsId;
      form.replyMsg = item.replyMsg;
      CommentThoughts(form).then(({ data }) => {
        if (data) {
          this.freshComment(item.thoughtsId, index);
        }
      });
      this.replyMsg = "";
    },
    // 转发
    handleForward(row) {
      this.$refs["forward"].open(row);
    },
    // 刷新单条数据
    freshComment(id, index) {
      getDetailById(id).then(({ data }) => {
        if (data) {
          data.activeIndex = this.thoughtList[index].activeIndex;
          this.thoughtList[index] = { ...data };
          this.$emit("fresh-right", true);
        }
      });
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
  watch: {
    dataList: {
      handler(val) {
        this.thoughtList = { ...val };
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.right-opt {
  display: flex;
}
.library {
  margin-top: 20px;
  .items {
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
            color: $--color-primary;
            background-color: #feeceb;
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
}
.red {
  color: #f74437;
}
</style>
