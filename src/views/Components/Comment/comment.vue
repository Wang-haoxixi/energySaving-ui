<template>
  <div class="comment-item">
    <div class="comment-avatar">
      <iep-img :src="data.avatar" alt class="img" />
    </div>
    <div class="comment-right">
      <div class="comment-head">{{data.realName || "游客"}}</div>
      <!-- 评论显示区域 -->
      <div class="comment-content" v-html="data.content"></div>
      <!-- 按钮组 -->
      <div class="comment-button">
        <div class="date">
          <i class="el-icon-woneng-shijian"></i>
          {{data.createTime}}
        </div>
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
            <i class="el-icon-woneng-pinglun1" v-if="!commontActive"></i>
            <span v-if="!commontActive && data.times > 0">（{{data.times}}）</span>
            <span v-if="commontActive">
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
      <div class="comment-comment" v-if="commontActive">
        <el-input type="textarea" rows="4" v-model="content" maxlength="250"></el-input>
        <iep-button class="comment-submit iep-btn-m" @click="() => {commontActive = false}">取消</iep-button>
        <iep-button type="primary" class="comment-submit iep-btn-m" @click="handleSubmit">发送</iep-button>
      </div>
      <!-- 回复 -->
      <div class="reply" v-if="commontActive && total > 0">
        <ReplyTpl
          ref="reply"
          v-for="(reply, index) in replyList"
          :key="index"
          :item="reply"
          :type="type"
          @load-page="getReply"
        ></ReplyTpl>
        <div class="comment-pagination" v-if="total > 10">
          <el-pagination
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :current-page.sync="params.current"
            :total="total"
            :page-size="params.size"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  likesComment,
  disLikesComment,
  createComment,
  getReplyPage,
  commentDeleteById,
} from "@/api/dms/common_comment";
import { mapGetters, mapMutations } from "vuex";
import ReplyTpl from "./reply";

export default {
  props: {
    item: {
      type: Object,
    },
    id: {
      required: true,
      default: 0,
    },
    type: {
      required: true,
      default: "",
    },
  },
  components: { ReplyTpl },
  data() {
    return {
      commontActive: false,
      content: "",
      replyList: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    data: {
      get() {
        return { ...this.item };
      },
      set() {
        this.commontActive = false;
      },
    },
  },
  methods: {
    // 回复评论
    hadnleComment() {
      this.commontActive = !this.commontActive;
      if (this.commontActive) {
        this.getReply();
      }
    },
    getReply(type = 0) {
      if (type === 1) {
        this.$emit("load-page");
      }
      getReplyPage(
        Object.assign(
          {},
          {
            commentId: this.data.commentId,
          },
          this.params,
        ),
      ).then(({ data }) => {
        this.replyList = [...data.records];
        this.total = data.total;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.getReply();
    },
    // 回复评论提交
    handleSubmit() {
      if (this.content == "") return;
      createComment({
        content: this.content,
        parentId: this.data.commentId,
        category: this.type,
        dataId: this.id,
      }).then(({ data }) => {
        if (data) {
          this.$message.success("回复成功！");
          this.content = "";
          this.getReply();
          this.$emit("load-page");
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
    handleDelete(row) {
      commentDeleteById(row.commentId).then(({ data }) => {
        if (data) {
          this.$emit("load-page");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid $--border-color;
  display: flex;
  .comment-avatar {
    margin-right: 20px;
    width: 60px;
    height: 60px;
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    .img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .comment-right {
    flex: 1;
    .comment-head {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 18px;
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
      color: $--color-text-regular;
    }
    .comment-button {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: $--color-text-secondary;
      display: flex;
      justify-content: space-between;
      .date {
        width: 160px;
        font-size: 12px;
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
    .reply {
      margin-top: 15px;
      background-color: $--background-color;
      padding: 15px 20px;
      .comment-pagination {
        text-align: center;
      }
    }
  }
}
.iep-red {
  color: $--color-primary;
}
</style>
