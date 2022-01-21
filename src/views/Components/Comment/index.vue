<template>
  <div class="comment-page">
    <div class="comment-title">评论</div>
    <!-- 评论输入框 -->
    <div class="comment-form" v-if="canComment">
      <el-input type="textarea" :rows="5" v-model="content" placeholder="欢迎留言评论~！" maxlength="300"></el-input>
      <div class="button-list">
        <iep-button class="primary" @click="handleSubmit">发送</iep-button>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="comment-page" v-if="commentList.length > 0">
      <div class="comment-list">
        <div v-for="item in commentList" :key="item.commentId" :name="item.thoughtsId">
          <!-- 评论本体 -->
          <CommentTpl :item="item" @load-page="loadPage" :id="id" :type="type"></CommentTpl>
        </div>
      </div>
      <div class="comment-pagination">
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
    <iep-no-data v-else complex message="暂无评论"></iep-no-data>
    <!-- <div class="no-comment">暂无评论</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCommentPage, createComment } from "@/api/dms/common_comment";
import CommentTpl from "./comment";

const initParamsForm = () => {
  return {
    current: 1,
    size: 10,
  };
};

export default {
  name: "CommonComment",
  components: { CommentTpl },
  props: {
    id: {
      required: true,
      default: 0,
    },
    type: {
      required: true,
      default: "",
    },
    canComment: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      commentList: [],
      params: initParamsForm(),
      total: 0,
      content: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    loadPage() {
      getCommentPage(this.params).then(({ data }) => {
        this.$set(this, "commentList", data.records);
        this.total = data.total;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    handleSubmit() {
      const row = {
        category: this.type,
        content: this.content,
        dataId: this.id,
      };
      createComment(row).then(({ data }) => {
        if (data) {
          this.loadPage();
          this.content = "";
        }
      });
    },
  },
  created() {
    this.params.category = this.type;
    this.params.dataId = this.id;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.comment-page {
  .comment-title {
    font-size: 18px;
    display: flex;
    height: 30px;
    margin-bottom: 20px;
    &::before {
      content: "";
      background-color: $--color-primary;
      display: block;
      width: 4px;
      height: 18px;
      margin: 4px 6px 0 0;
    }
  }
  .comment-form {
    .button-list {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
      .primary {
        border-color: $--color-primary;
        color: $--color-primary;
        &:hover {
          background-color: $--custom-menu-background-color;
        }
      }
    }
  }
  .comment-list {
    padding: 15px 5px;
    border-radius: 10px;
    .comment {
      margin: 0 10px;
      border-bottom: 1px solid $--border-color;
    }
  }
  .comment-pagination {
    text-align: center;
    padding-bottom: 20px;
  }
  .no-comment {
    text-align: center;
    color: $--color-text-secondary;
  }
}
</style>
