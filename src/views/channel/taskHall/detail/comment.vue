<template>
  <div class="comment">
    <div class="title" id="comment_title">评论</div>
    <el-input type="textarea" v-model="comment" :rows="4" maxlength="250" placeholder="发表评论"></el-input>
    <div class="comment-footer">
      <el-button class="button" type="primary" @click="handleSubmit">评论</el-button>
    </div>
    <div class="list">
      <!-- 评论详情 -->
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="avatar">
          <iep-img class="img" :src="item.avatar"></iep-img>
        </div>
        <div class="content">
          <div class="head">
            <div class="name">{{item.name}}</div>
            <div class="date">{{item.createTime|parseToTimeMinutes}}</div>
          </div>
          <div class="comment-content" v-html="item.content"></div>
          <!-- 附件列表 -->
          <div class="footer">
            <div class="load-list">
              <div class="comment-annexes" v-if="item.commentAnnexes">
                <div
                  class="annexes-item"
                  v-for="annexes in item.commentAnnexes"
                  :key="annexes.id"
                  @click="downLoad(annexes)"
                >
                  <i class="el-icon-woneng-wendang"></i>
                  {{annexes.original}}
                </div>
              </div>
            </div>
            <div class="icon">
              <span v-if="replyIndex === index" @click="handleCommentButton(item, index, false)">
                <i class="el-icon-woneng-arrowup"></i>收起
              </span>
              <span v-else @click="handleCommentButton(item, index, true)">
                <i class="el-icon-woneng-pinglun"></i>
                <span v-if="item.reply">{{item.reply.total}}</span>
              </span>
            </div>
          </div>
          <!-- 回复输入框 -->
          <div class="reply-input" v-if="replyIndex === index">
            <el-input
              type="textarea"
              :rows="3"
              v-model="commentReply"
              :placeholder="`回复${item.name}`"
              class="input"
            ></el-input>
            <iep-button
              class="button"
              type="primary"
              @click="handleReplySubmit(item.id, 'commentReply')"
            >回复</iep-button>
          </div>
          <!-- 回复列表 -->
          <div class="reply-list" v-if="replyIndex === index && replyList.length > 0">
            <div class="item" v-for="(reply, rIndex) in replyList" :key="rIndex">
              <div class="avatar">
                <iep-img class="img" :src="reply.createAvatar"></iep-img>
              </div>
              <div class="content">
                <div class="head">{{`${reply.createName} 回复 ${reply.replyName}`}}</div>
                <div class="comment-content">{{reply.content}}</div>
                <div class="footer">
                  <div class="date">{{reply.createTime|parseToTimeMinutes}}</div>
                  <div class="button-list">
                    <div class="icon" @click="handleReplyButton(`${item.id}-${reply.id}`)">
                      <i class="el-icon-woneng-pinglun1"></i>回复
                    </div>
                  </div>
                </div>
                <!-- 回复输入框 -->
                <div class="reply-input" v-if="replyRIndex === `${item.id}-${reply.id}`">
                  <el-input
                    v-model="replyForm"
                    :placeholder="`回复${reply.createName}`"
                    class="input"
                  ></el-input>
                  <iep-button @click="handleReplySubmit(reply.id, 'replyForm')">回复</iep-button>
                </div>
              </div>
            </div>
            <div class="reply-pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="replyPageOption.current"
                :total="replyPageOption.total"
                @current-change="replyCurrentChange"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;" id="pagination" v-if="total > 10">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :current-page.sync="pageOption.current"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCommentPage,
  createComment,
  createReply,
} from "@/api/qms/cooperation_comment";
import replyMixin from "./replyMixin";

export default {
  mixins: [replyMixin],
  props: {
    id: {
      default: 0,
    },
  },
  data() {
    return {
      comment: "",
      commentReply: "",
      replyForm: "",
      replyIndex: -1,
      replyRIndex: -1,
      pageOption: {
        current: 1,
        size: 10,
      },
      total: 0,
      list: [],
    };
  },
  methods: {
    loadPage() {
      getCommentPage(
        Object.assign({ type: "3,5", taskId: this.id }, this.pageOption),
      ).then(({ data }) => {
        this.total = data.total;
        this.list = [...data.records];
      });
    },
    currentChange(val) {
      const top = document.getElementById("comment_title").offsetTop;
      console.log("top: ", top);
      document.getElementsByClassName("iep-basic-scroll")[0].scrollTo(0, top);
      this.pageOption.current = val;
      this.loadPage();
    },
    // 提交评论
    handleSubmit() {
      if (this.comment === "") return;
      createComment({
        taskId: this.id,
        content: this.comment,
      }).then(() => {
        this.loadPage();
        this.comment = "";
      });
    },
    // 展开收回评论
    handleCommentButton(row, index, type) {
      this.replyRIndex = -1;
      this.replyForm = "";
      this.commentReply = "";
      this.replyList = [];
      if (type) {
        this.replyIndex = index;
        this.replyCurrentChange();
      } else {
        this.replyIndex = -1;
      }
    },
    handleReplyButton(index) {
      this.replyRIndex = index;
      this.replyForm = "";
    },
    // 提交回复
    handleReplySubmit(id, form) {
      if (this[form] === "") return;
      createReply({
        content: this[form],
        commentId: id,
      }).then(({ data }) => {
        if (data) {
          this.replyRIndex = -1;
          this[form] = "";
          this.replyCurrentChange();
        }
      });
    },
  },
  watch: {
    id: {
      handler(val) {
        if (val) this.loadPage();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  .title {
    margin-bottom: 18px;
    height: 14px;
    line-height: 14px;
  }
  .comment-footer {
    text-align: right;
    padding-top: 20px;
  }
  .list {
    .item {
      padding: 30px 0 10px;
      border-bottom: 1px solid $--border-color;
      display: flex;
      &:last-of-type {
        border: 0;
        padding-bottom: 0;
      }
      .avatar {
        margin-right: 20px;
        .img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          border: 1px solid $--border-color;
        }
      }
    }
    .content {
      width: calc(100% - 70px);
      .head {
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .date {
          font-size: 14px;
          color: $--color-input-regular;
        }
      }
      .comment-content {
        font-size: 14px;
        color: $--color-text-regular;
        margin-bottom: 18px;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        line-height: 14px;
        .load-list {
          width: calc(100% - 100px);
          .comment-annexes {
            .annexes-item {
              cursor: pointer;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              height: 18px;
              line-height: 18px;
              background-color: $--background-color;
              margin-bottom: 3px;
              border-radius: $--small-border-radius;
              padding: 3px;
            }
          }
        }
        .date {
          font-size: 14px;
          color: $--color-input-regular;
        }
        .icon {
          height: 14px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $--color-text-secondary;
          cursor: pointer;
          i {
            margin-right: 3px;
          }
        }
      }
    }
    .reply-input {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 20px;
      .input {
        margin-bottom: 15px;
        width: 100%;
      }
      .button {
        width: 66px;
        height: 36px;
        background: $--custom-menu-background-color;
        border-color: $--custom-menu-background-color;
        &:hover {
          background-color: $--color-primary;
          border-color: $--color-primary;
        }
      }
    }
    .reply-list {
      .reply-pagination {
        margin: 10px 0 5px;
        text-align: center;
      }
    }
  }
}
.button {
  width: 66px;
  height: 36px;
  text-align: center;
}
</style>