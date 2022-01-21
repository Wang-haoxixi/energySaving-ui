<template>
  <div class="comment-page">
    <div class="comment-list">
      <div v-for="(item, index) in commentList" :key="index" :name="item.thoughtsId">
        <!-- 评论本体 -->
        <commentTpl
          :item="item"
          :userData="{id: data.userId, name: data.userName}"
          @load-page="loadPage"
        ></commentTpl>
        <!-- 针对评论的回复 -->
        <commentTpl
          v-for="(comItem, comIndex) in item.thoughtsReplyList"
          :key="`${index}-${comIndex}`"
          :item="comItem"
          :userData="{id: item.commentUserId, name: item.realName}"
          @load-page="loadPage"
          type="reply"
        ></commentTpl>
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
</template>

<script>
import { mapGetters } from "vuex";
import { getCommentsByThoughtsId } from "@/api/dms/thoughts";
import commentTpl from "./commentTpl";

const initParamsForm = () => {
  return {
    current: 1,
    size: 10,
  };
};

export default {
  components: { commentTpl },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      commentList: [],
      params: initParamsForm(),
      total: 0,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    loadPage(type = false) {
      this.commentList = [];
      getCommentsByThoughtsId(this.params).then(({ data }) => {
        this.$set(this, "commentList", data.records);
        this.total = data.total;
      });
      if (type) {
        this.$emit("load-data");
      }
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
  },
  created() {
    this.params.thoughtsId = this.data.thoughtsId;
    this.loadPage();
  },
  watch: {
    // 'data.commentNum' () {
    //   this.loadPage()
    // },
    data: {
      handler() {
        this.params.thoughtsId = this.data.thoughtsId;
        this.loadPage();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-page {
  background-color: $--background-color;
  border-radius: $--border-radius-base;
  .comment-list {
    padding: 15px 30px;
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
}
.comment-pagination ::v-deep .number {
  background-color: #fafafa;
}
.comment-pagination ::v-deep .el-pager li.active {
  margin: 0 5px;
  padding: 0;
  border: 1px solid $--border-color;
  background-color: #fff;
  color: $--color-text-secondary;
}
.comment-pagination ::v-deep .el-pagination button {
  height: 34px;
  border: 1px solid $--border-color;
}
.comment-pagination ::v-deep .el-pagination .btn-prev {
  margin-left: 5px;
}
.comment-pagination ::v-deep .el-pagination .btn-next {
  margin-right: 5px;
}
.comment-pagination ::v-deep .el-pagination button {
  padding: 0 6px;
  border-radius: 5px;
}
.comment-pagination ::v-deep .el-pager {
  margin-left: 0;
}
.comment-pagination ::v-deep .el-pager li {
  border-radius: 5px;
}
</style>
