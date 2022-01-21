<template>
  <div class="reply-item">
    <div class="reply-head">
      <div class="reply-avatar">
        <iep-img :src="data.avatar" alt class="img" />
      </div>
      <div class="reply-name">{{data.realName}}</div>
      <div class="reply" v-if="data.replyUserId">回复</div>
      <div class="reply-name" v-if="data.replyUserId">{{data.replyRealName}}</div>
    </div>
    <!-- 评论显示区域 -->
    <div class="reply-content" v-html="data.content"></div>
    <!-- 评论显示区域 -->
    <div class="reply-date">
      <div class="date">{{data.createTime}}</div>
      <div class="button-list">
        <!-- 点赞 -->
        <div
          class="button"
          @click="hadnleAddUp(item)"
          :class="data.praiseStatus === 1 ? 'iep-red' : ''"
        >
          <i class="el-icon-woneng-tuijian1"></i>
          <span v-if="item.likes">（{{item.likes}}）</span>
        </div>
        <!-- 回复 -->
        <div class="button" @click="hadnleComment(item)">
          <i class="el-icon-woneng-pinglun1" v-if="!commontActiveState"></i>
          <span v-else>
            <i class="el-icon-woneng-arrowup"></i>收起
          </span>
        </div>
        <!-- 举报 -->
        <!-- <div class="button" @click="handleReport(item.replyId, 2)">
          <i class="el-icon-woneng-jubao1"></i>
        </div>-->
        <!-- 删除 -->
        <div class="button" @click="handleDelete(item)" v-if="userInfo.userId === item.createBy">
          <i class="el-icon-delete"></i>
        </div>
      </div>
    </div>
    <!-- 评论表单 -->
    <div class="reply-reply" v-if="commontActiveState == true">
      <el-input type="textarea" rows="4" v-model="replyMsg" maxlength="250"></el-input>
      <iep-button class="reply-submit iep-btn-m" @click="() => {commontActiveState = false}">取消</iep-button>
      <iep-button type="primary" class="reply-submit iep-btn-m" @click="handleSubmit">发送</iep-button>
    </div>
  </div>
</template>

<script>
import {
  createComment,
  commentDeleteById,
  likesComment,
  disLikesComment,
} from "@/api/dms/common_comment";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    item: {
      type: Object,
    },
    type: {
      type: String,
      default: "comment",
    },
  },
  data() {
    return {
      commontActiveState: false,
      replyMsg: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    data() {
      return { ...this.item };
    },
  },
  methods: {
    // 回复评论提交
    handleSubmit() {
      if (this.replyMsg == "") return;
      createComment({
        category: this.type,
        content: this.replyMsg,
        parentId: this.data.commentId,
        dataId: this.data.dataId,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("回复成功！");
          this.commontActiveState = false;
          this.replyMsg = "";
          this.$emit("load-page", false);
        }
      });
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport(id, type) {
      this.openReportDialog({ id: id, type: type });
    },
    hadnleAddUp(row) {
      let fn = likesComment;
      if (row.praiseStatus === 1) fn = disLikesComment;
      fn(row.commentId).then(({ data }) => {
        if (data) {
          this.$emit("load-page");
        }
      });
    },
    // 回复评论
    hadnleComment() {
      this.commontActiveState = !this.commontActiveState;
    },
    handleDelete(row) {
      commentDeleteById(row.commentId).then(({ data }) => {
        if (data) {
          this.$emit("load-page", 1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.reply-item {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $--border-color;
  .reply-head {
    position: relative;
    display: flex;
    align-items: center;
    .reply-avatar {
      margin-right: 5px;
      width: 30px;
      height: 30px;
      font-size: 14px;
      border-radius: 50%;
      border: 1px solid $--border-color;
      .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
      }
    }
    .reply {
      font-size: 14px;
    }
    .reply-name {
      margin: 3px 5px;
      font-size: 14px;
      color: #4c6f8d;
      cursor: pointer;
    }
  }
  .reply-content {
    margin: 10px 0;
    font-size: 14px;
    text-align: left;
  }
  .reply-date {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: $--color-text-secondary;
    display: flex;
    .date {
      width: 160px;
      font-size: 14px;
    }
    .button-list {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .button {
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: $--color-primary;
          border-color: $--color-primary;
        }
      }
    }
  }
  .reply-reply {
    margin-top: 20px;
    text-align: right;
    .reply-submit {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>
