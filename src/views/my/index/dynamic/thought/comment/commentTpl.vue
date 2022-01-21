<template>
  <div>
    <div class="comment-item" :class="type == 'comment' ? '' : 'comment-reply'">
      <div class="comment-avatar">
        <iep-popover-user-card
          :user-id="type == 'comment' ? item.commentUserId : item.repliedUserId"
        >
          <iep-img :src="item.avatar" alt class="img" />
        </iep-popover-user-card>
      </div>
      <div class="comment-windows">
        <!-- 个人信息 -->
        <div class="comment-head">
          <div class="comment-name">{{item.realName}}</div>
          <div class="reply">{{type == 'comment' ? '评论' : '回复'}}</div>
          <div
            class="comment-name"
            v-if="type == 'reply'"
          >{{type === 'comment' ? userData.name : item.replyTo}}</div>
        </div>
        <!-- 评论显示区域 -->
        <div class="comment-content">
          <span v-for="(t, i) in transfPerson(item.replyMsg)" :key="i">
            <span
              class="person"
              v-if="t.type"
              @click="handlePerson(t, item.mentionedUsers)"
            >{{t.html}}</span>
            <span v-else>{{t.html}}</span>
          </span>
        </div>
        <div class="comment-date">
          <div class="date">{{item.createTime}}</div>
          <!-- 评论的按钮行 -->
          <div class="button-list" v-if="item.thoughtsReplyList">
            <div
              class="button"
              @click="hadnleAddUp(item)"
              :class="item.praiseStatus > 0 ? 'iep-red' : ''"
            >
              <i class="el-icon-woneng-tuijian1"></i>
              （{{item.thumbsUpCount}}）
            </div>
            <div class="button" @click="hadnleComComment(item)">
              <i class="el-icon-woneng-pinglun"></i>
              （{{item.thoughtsReplyList.length}}）
            </div>
          </div>
          <div class="button-list" v-else>
            <!-- <div
              class="button"
              @click="handleDelete(item, 'reply')"
              v-if="userInfo.userId === item.userId"
            >
              <i class="icon-shanchu"></i> 删除
            </div>-->
            <div class="button" @click="hadnleAddUp(item, 'reply')">
              <i class="el-icon-woneng-tuijian1"></i>
              （{{item.thumbsUpCount}}）
            </div>
            <div class="button" @click="hadnleComComment(item, 'reply')">
              <i class="el-icon-woneng-pinglun"></i>
            </div>
            <div
              class="button"
              @click="handleDelete(item)"
              v-if="userInfo.userId === item.commentUserId"
            >删除</div>
          </div>
        </div>
        <!-- 评论表单 -->
        <div class="comment-comment" v-if="commontActiveIndex == 1">
          <el-input type="textarea" rows="4" v-model="form.replyMsg" maxlength="250"></el-input>
          <iep-button class="comment-submit iep-btn-m" @click="() => {commontActiveIndex = -1}">取消</iep-button>
          <iep-button type="primary" class="comment-submit iep-btn-m" @click="comCommentSubmit">发送</iep-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CommentReply,
  addcCommentThumbsByRecord,
  addReplyThumbsByRecord,
  getThumbMembers,
  deleteCommentThumbsById,
  deleteCommentById,
} from "@/api/dms/thoughts";
import { mapGetters } from "vuex";
import { transfPerson, getName } from "./util";

const initFormData = () => {
  return {
    replyMsg: "",
    thoughtsId: 0,
    commentId: "",
    nameList: [],
  };
};

export default {
  props: {
    item: {
      type: Object,
    },
    userData: {
      type: Object,
    },
    // 区分是评论还是回复
    type: {
      type: String,
      default: "comment",
    },
  },
  data() {
    return {
      commontActiveIndex: -1,
      form: initFormData(),
      transfPerson,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 回复评论
    hadnleComComment(row, isReply) {
      this.commontActiveIndex = 1;
      this.form = {
        replyMsg: "",
        commentId: row.commentId,
        nameList: [],
      };
      if (isReply) {
        this.form = Object.assign(this.form, {
          reReplyId: row.replyId,
          replyUserId: row.userId,
        });
      } else {
        this.form.thoughtsId = row.thoughtsId;
      }
    },
    // 回复评论提交
    comCommentSubmit() {
      if (this.form.replyMsg == "") return;
      // 判断说说中是否存在人名
      const nameObj = getName(this.form.replyMsg);
      if (nameObj.type) {
        this.form.nameList = nameObj.list.map(m => m.name);
      }
      CommentReply(this.form).then(({ data }) => {
        if (data) {
          this.$message.success("回复成功！");
        }
        this.commontActiveIndex = -1;
        this.form = initFormData();
        this.$emit("load-page", true);
      });
    },
    // 点赞
    hadnleAddUp(row, isReply) {
      let fn = () => {};
      let id = -1;
      if (isReply) {
        fn = addReplyThumbsByRecord;
        id = row.replyId;
      } else {
        fn = addcCommentThumbsByRecord;
        id = row.commentId;
      }
      fn(id).then(({ data, msg }) => {
        if (data) {
          this.$emit("load-page", true);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 点赞列表
    getThumbMembers() {
      getThumbMembers().then(() => {});
    },
    // 评论删除
    handleDelete(row, isReply) {
      if (isReply) {
        deleteCommentById(row.replyId).then(() => {
          this.$emit("load-page", true);
        });
      } else {
        deleteCommentThumbsById(row.commentId).then(() => {
          this.$emit("load-page", true);
        });
      }
    },
    // @人详情
    handlePerson(row, list) {
      // 首先匹配返回的数据中是否存在此人名，即此人名是否为真实人名
      for (const item of list) {
        if (`@${item.name} ` === row.html) {
          this.$router.push(`/app/personal_style/${item.id}`);
          return;
        }
      }
      this.$message.error("抱歉，没有找到此用户");
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  .comment-avatar {
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
  .comment-windows {
    flex: 1;
    .comment-head {
      display: flex;
      align-items: center;
      .reply {
        font-size: 14px;
      }
      .comment-name {
        margin: 3px 5px;
        font-size: 14px;
        color: #4c6f8d;
        cursor: pointer;
      }
    }
    .comment-content {
      margin: 10px 0;
      font-size: 14px;
      text-align: left;
    }
    .button-list {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .button {
        margin-left: 20px;
        cursor: pointer;
        &:hover {
          color: #f74437;
          border-color: #f74437;
        }
        .comment-date {
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
              &:hover {
                color: #f74437;
                border-color: #f74437;
              }
            }
          }
        }
        .person {
          color: #f74437;
          cursor: pointer;
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
  }
}
.comment-reply {
  margin-left: 30px;
}
.comment-item {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $--border-color;
}
.comment-item:last-child {
  .comment-date {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    font-size: 14px;
    color: $--color-text-secondary;
  }
}
</style>
