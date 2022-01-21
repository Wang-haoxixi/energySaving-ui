<template>
  <div class="library">
    <div class="items" v-for="(item, index) in dataList" :key="index">
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
            <div class="top" v-if="item.isTop === 2">置顶</div>
          </div>
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
          <div class="date">
            <i class="el-icon-woneng-shijian"></i>
            {{item.createTime}}
          </div>
          <div class="right-opt">
            <el-popover
              placement="right-start"
              title
              width="200"
              trigger="hover"
              :content="reference"
            >
              <div
                slot="reference"
                class="button"
                @click="hadnleAddUp(item)"
                @mouseenter="mouseenterUp(item)"
                @mouseleave="mouseleaveUp"
                :class="item.praiseStatus > 0 ? 'red' : ''"
              >
                <i class="el-icon-woneng-tuijian1"></i>
                （{{item.thumbsUpCount}}）
              </div>
            </el-popover>
            <div class="button" @click="hadnleComment(item, index)">
              <i class="el-icon-woneng-pinglun1"></i>
              （{{ item.commentNum }}）
            </div>
            <div class="button" @click="handleForward(item)" v-if="item.transmitId === 0">
              <i class="el-icon-woneng-zhuanfa"></i>
            </div>
          </div>
        </div>
        <!-- 说说评论 -->
        <div class="comment" v-if="activeIndex == index">
          <el-input type="textarea" rows="4" v-model="form.replyMsg" maxlength="1000"></el-input>
          <iep-button class="comment-submit iep-btn-m" @click="() => {activeIndex = -1}">取消</iep-button>
          <iep-button type="primary" class="comment-submit iep-btn-m" @click="commentSubmit">发送</iep-button>
        </div>
        <!-- 评论列表 -->
        <div class="comment-list" v-if="item.commentNum > 0">
          <commentPage ref="comment" :data="item"></commentPage>
        </div>
        <!-- <div class="comment-list" v-if="item.commentNum > 0">
          <div v-for="(t, i) in item.thoughtsCommentList" :key="i">
            <commentTpl :item="t" :userData="{id: item.userId, name: item.userName}" @load-page="loadPage"></commentTpl>
            <commentTpl v-for="(comItem, comIndex) in t.thoughtsReplyList" :key="`${i}-${comIndex}`" :item="comItem" :userData="{id: t.commentUserId, name: t.realName}" @load-page="loadPage" type="reply"></commentTpl>
          </div>
        </div>-->
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
} from "@/api/dms/thoughts";
import { mapGetters } from "vuex";
import forwardContent from "./forwardContent";
import commentPage from "./commentPage";
import contentTpl from "./content";
import forwardDialog from "../forwardDialog";
import { getName } from "./util";

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    nameList: [],
  };
};

export default {
  components: { forwardContent, commentPage, contentTpl, forwardDialog },
  props: {
    dataList: {
      type: Array,
    },
    params: {
      type: Object,
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
    };
  },
  methods: {
    loadPage() {
      this.$emit("load-page", true);
    },
    handleDetail() {
      // this.$router.push({
      //   path:`/app/personal_style/${id}`,
      // });
    },
    // 点赞
    hadnleAddUp(row) {
      addThumbsUpByRecord(row.thoughtsId).then(({ data, msg }) => {
        if (data) {
          this.loadPage();
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 点赞详情信息
    mouseenterUp(row) {
      if (row.thumbsUpCount > 0) {
        getThumbMembers(row.thoughtsId).then(({ data }) => {
          this.reference = data.map(m => m.name).join("、");
        });
      } else {
        this.reference = "暂无人点赞";
      }
    },
    // 说说详情
    handleForwardDetail(id) {
      this.$router.push(`/thought/thought_detail/${id}`);
    },
    mouseleaveUp() {
      setTimeout(() => {
        this.reference = "加载中...";
      }, 300);
    },
    hadnleComment(item, index) {
      this.activeIndex = index;
      this.form = {
        replyMsg: "",
        thoughtsId: item.thoughtsId,
        nameList: [],
      };
    },
    // 评论
    commentSubmit() {
      if (this.form.replyMsg == "") return;
      // 判断说说中是否存在人名
      const nameObj = getName(this.form.replyMsg);
      if (nameObj.type) {
        this.form.nameList = nameObj.list.map(m => m.name);
      }
      CommentThoughts(this.form).then(({ data }) => {
        if (!data) {
          this.$message.error(data.msg);
          return;
        }
        this.activeIndex = -1;
        this.loadPage();
      });
    },
    // 转发
    handleForward(row) {
      this.$refs["forward"].open(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.library {
  margin-top: 20px;
  .items {
    margin-bottom: 30px;
    display: flex;
    .name {
      cursor: pointer;
    }
    .avatar {
      margin-right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 10px;
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
      // margin-top: 5px;
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
      .title {
        display: flex;
        align-items: center;
        .name {
          font-size: 16px;
          // color: #2f80ff;
        }
        .date {
          padding-left: 15px;
          color: $--color-text-regular;
          i {
            font-size: 14px !important;
            color: $--color-input-regular;
          }
          &:nth-of-type(3) {
            font-size: 14px;
            color: $--color-text-secondary;
          }
        }
        &:nth-of-type(3) .date {
          font-size: 14px;
          color: $--color-text-secondary;
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
            font-size: 16px !important;
          }
        }
      }
      .item {
        margin-top: 7px;
      }
      .footer {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .date {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: $--color-input-regular;
          i {
            margin-right: 5px;
            color: #babec0;
          }
        }
        .right-opt {
          display: flex;
          align-items: center;
        }
        .button {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 20px;
          height: 20px;
          cursor: pointer;
          color: $--color-text-secondary;
          i {
            margin-right: 5px;
          }
          &:hover {
            color: $--color-primary;
            border-color: $--color-primary;
          }
        }
      }
    }
  }
}
.red {
  color: $--color-primary !important;
}
</style>

<style scoped>
.library >>> .forward-content {
  background-color: #fafafa;
  padding: 20px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
