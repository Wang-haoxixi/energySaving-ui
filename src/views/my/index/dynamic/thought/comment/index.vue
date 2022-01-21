<template>
  <div class="comment-page">
    <el-input type="textarea" rows="4" v-model="replyMsg" maxlength="250"></el-input>
    <el-button type="primary" class="comment-submit" @click="handleSubmit">提交</el-button>
    <!-- <iep-button class="comment-submit" @click="handleCancal">收起</iep-button> -->
    <!-- 评论的列表 -->
    <div class="comment-body" v-if="commentList.length > 0">
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
    <!-- 无数据 -->
    <div class="comment-nothing" v-else>暂无人评论</div>
    <div class="comment-footer" @click="handleCancal">
      收起评论
      <i class="el-icon-woneng-arrow-up"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getCommentsByThoughtsId,
  CommentThoughts,
  // getDetailById,
} from "@/api/dms/thoughts";
import commentTpl from "./commentTpl";
import { getName } from "./util";

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
      replyMsg: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    loadPage() {
      // this.commentList = [];
      getCommentsByThoughtsId(this.params).then(({ data }) => {
        this.$set(this, "commentList", data.records);
        this.total = data.total;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    loadPageByComment() {
      this.loadPage();
      // 通知父级进行数据更新
      this.$emit("fresh-data");
    },
    handleSubmit() {
      const form = {};
      if (this.replyMsg == "") return;
      // 判断说说中是否存在人名
      form.replyMsg = this.replyMsg;
      const nameObj = getName(form.replyMsg);
      if (nameObj.type) {
        form.nameList = nameObj.list.map(m => m.name);
      }
      form.thoughtsId = this.data.thoughtsId;
      CommentThoughts(form).then(({ data, msg }) => {
        if (!data) {
          this.$message.error(msg);
          return;
        } else {
          this.replyMsg = "";
          this.loadPageByComment();
        }
      });
    },
    handleCancal() {
      this.$emit("cancal", true);
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
  .comment-submit {
    margin-top: 10px;
    margin-left: 10px;
    &:hover {
      color: $--color-primary;
      background-color: #feeceb;
    }
  }
  .comment-body {
    .comment-list {
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
  .comment-nothing {
    text-align: center;
    color: $--color-input-regular;
    margin-bottom: 20px;
  }
  .comment-footer {
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: $--color-text-secondary;
    border-top: 1px solid $--border-color;
    padding: 10px 0;
    &:hover {
      opacity: 0.7;
    }
  }
}
.comment-pagination ::v-deep .number {
  background-color: #fafafa;
}
.comment-pagination ::v-deep .el-pager li.active {
  margin: 0 5px;
  padding: 0;
  border: 1px solid $--border-color;
  border-radius: 2px;
  background-color: #e8e8e8;
  color: $--color-text-regular;
}
.comment-pagination ::v-deep .el-pagination button {
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
  border-radius: 2px;
}
</style>
