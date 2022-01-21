<template>
  <div class="comment">
    <div class="comment-item">
      <div class="comment-head">
        <div class="comment-avatar">
          <img :src="item.avatar" alt />
        </div>
        <div class="comment-name">{{item.realName}}</div>
        <div class="reply">{{type == 'comment' ? '评论' : '回复'}}</div>
        <div class="comment-name">{{userInfo.name}}</div>
      </div>
      <div class="comment-content">{{item.replyMsg}}</div>
      <div class="comment-date">
        <div class="date">{{item.createTime}}</div>
        <!-- 评论的按钮行 -->
        <div class="button-list" v-if="item.thoughtsReplyList">
          <div class="button" @click="hadnleAddUp(item)">
            <i class="el-icon-woneng-tuijian1"></i>
            （{{item.thumbsUpCount}}）
          </div>
          <div class="button" @click="hadnleComComment(item)">
            <i class="el-icon-woneng-pinglun1"></i>
            （{{item.thoughtsReplyList.length}}）
          </div>
        </div>
      </div>
      <div class="comment-comment" v-if="commontActiveIndex == 1">
        <el-input type="textarea" rows="4" v-model="form.replyMsg"></el-input>
        <iep-button class="comment-submit iep-btn-m" @click="() => {commontActiveIndex = -1}">取消</iep-button>
        <iep-button type="primary" class="comment-submit iep-btn-m" @click="comCommentSubmit">发送</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CommentReply, addcCommentThumbsByRecord } from "@/api/dms/thoughts";
// import { mapActions } from "vuex";

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    commentId: "",
  };
};

export default {
  props: {
    item: {
      type: Object,
    },
    userInfo: {
      type: Object,
    },
    type: {
      type: String,
      default: "comment",
    },
  },
  data() {
    return {
      commontActiveIndex: -1,
      form: initFormData(),
    };
  },
  methods: {
    // 回复评论
    hadnleComComment(row) {
      this.commontActiveIndex = 1;
      this.form = {
        replyMsg: "",
        thoughtsId: row.thoughtsId,
        commentId: row.commentId,
      };
    },
    // 回复评论提交
    comCommentSubmit() {
      if (this.form.replyMsg == "") return;
      CommentReply(this.form).then(({ data }) => {
        if (data) {
          this.$message.success("回复成功！");
          this.commontActiveIndex = -1;
          this.form = initFormData();
          this.$emit("load-page", true);
        } else {
          this.$message.error("评论出现了点问题，请重试！");
        }
      });
    },
    // 点赞
    hadnleAddUp() {
      addcCommentThumbsByRecord(this.item.commentId).then(({ data, msg }) => {
        if (data) {
          this.$emit("load-page", true);
        } else {
          this.$message.error(msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  .comment-item {
    border-bottom: 1px solid $--border-color;
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    .comment-head {
      display: flex;
      align-items: center;
      .comment-avatar {
        margin-right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid $--border-color;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .reply {
        font-size: 14px;
      }
      .comment-name {
        margin: 3px 5px;
        font-size: 14px;
        color: #4c6f8d;
      }
    }
    .comment-content {
      margin: 10px 0;
      font-size: 14px;
      text-align: left;
    }
    .comment-date {
      margin-bottom: 10px;
      color: $--color-text-secondary;
      display: flex;
      align-items: center;
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
          cursor: pointer;
          font-size: 14px;
          &:hover {
            color: #f74437;
            border-color: #f74437;
          }
        }
      }
    }
  }
  .comment-item:last-of-type {
    border: 0;
    .comment-date {
      margin-bottom: 0;
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
}
.comment-comment {
  margin-top: 20px;
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
</style>
