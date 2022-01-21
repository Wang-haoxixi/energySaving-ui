<template>
  <div class="content-list">
    <div class="head">
      <div class="name">{{title}}</div>
      <el-button class="iep-back-btn" v-if="state === 'search'" @click="handleBack">返回</el-button>
    </div>
    <div class="content" v-if="state === 'list'">
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="handleSelect(item)">
          <p class="icon"></p>
          <p class="text">{{item.question}}</p>
        </div>
      </div>
      <div class="pages-box" v-if="list.length > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="params.current"
          :total="total"
          prev-text="上一页"
          next-text="下一页"
          :pager-count="5"
          :page-size="params.size"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
    <div class="detail" v-else-if="state === 'search'">
      <h3>{{qData.question}}</h3>
      <iep-jodit-read class="pre" v-model="qData.replyStr"></iep-jodit-read>
      <div class="tagKeyWords">
        <!-- <iep-tag-detail v-model="qData.tags"></iep-tag-detail> -->
        <el-tag v-for="(item, index) in qData.tags" :key="index">{{item}}</el-tag>
      </div>
      <div class="commit">
        <div class="title">你觉得这个答案是否有帮助？</div>
        <div class="button-list" v-if="qData.islike || qData.ishate">
          <div class="button">
            <i class="icon-like like"></i>感谢您的反馈！
          </div>
        </div>
        <div class="button-list" v-else>
          <el-button class="button" @click="handleLike">
            <i class="icon-like-b like"></i>有帮助
          </el-button>
          <el-button class="button" @click="handlehate">
            <i class="icon-caishixin hate"></i>无帮助
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestionPage, getQuestionById } from "@/api/ims/question";
import { goodReview, badReview } from "@/api/ims/question";

const initParamData = () => {
  return {
    current: 1,
    size: 10,
  };
};

const initQdata = () => {
  return {
    question: "",
    replyStr: "",
    tags: [],
  };
};

const defaultTitle = "全部问题";

export default {
  components: {},
  data() {
    return {
      title: defaultTitle,
      params: initParamData(),
      total: 0,
      list: [],
      state: "list",
      qData: initQdata(),
    };
  },
  methods: {
    searchForm(question) {
      this.state = "list";
      this.params = initParamData();
      this.title = defaultTitle;
      this.params.question = question;
      this.loadPage();
    },
    searchData(row) {
      this.state = "list";
      this.params = initParamData();
      this.title = row.typeName;
      this.params.type = row.id;
      this.loadPage();
    },
    loadPage() {
      getQuestionPage(this.params).then(({ data }) => {
        this.list = data.records;
        this.total = data.total;
      });
    },
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    handleSelect(row) {
      this.state = "search";
      this.qData = initQdata();
      this.qData.question = row.question;
      getQuestionById({ id: row.id }).then(({ data }) => {
        this.qData = data;
      });
    },
    handleBack() {
      this.state = "list";
    },
    handleLike() {
      this.$set(this.qData, "islike", true);
      goodReview({ id: this.qData.id }).then(() => {});
    },
    handlehate() {
      this.$set(this.qData, "ishate", true);
      badReview({ id: this.qData.id }).then(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.content-list {
  .head {
    display: flex;
    align-items: center;
    height: 18px;
    line-height: 18px;
    // width: calc(100% - 40px);
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    display: flex;
    .name {
      flex: 1;
      font-size: 18px;
    }
    ::v-deep .iep-back-btn {
      height: 36px;
      &:hover,
      &:focus {
        border-color: $--border-color;
        background-color: $--background-color;
        color: $--color-text-primary;
      }
    }
  }
  .content {
    font-size: 14px;
    margin-top: 20px;
    .list {
      min-height: 200px;
      .item {
        display: flex;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover .text {
          color: $--color-primary;
        }
        .icon {
          width: 5px;
          height: 5px;
          background-color: #d7d7d7;
          border-radius: 50%;
          line-height: 0px;
          margin: 11px 9px 0 0;
        }
        .text {
          margin: 0;
        }
      }
    }
  }
  .detail {
    position: relative;
    margin: 40px 0 0;
    min-height: 400px;
    font-size: 14px;
    h3 {
      font-size: 16px;
    }
    .pre {
      margin-bottom: 180px;
    }
    .tagKeyWords {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      margin-right: -10px;
      .el-tag {
        margin-right: 10px;
      }
    }
    .commit {
      position: absolute;
      width: 100%;
      bottom: 0;
      background-color: #f2f2f2;
      text-align: center;
      padding: 30px 0 25px;
      box-sizing: border-box;
      .title {
        font-size: 14px;
        margin-bottom: 20px;
      }
      .button-list {
        .like {
          color: #fcba62;
        }
        .hate {
          color: #7db7f6;
        }
        i {
          margin-left: 4px;
        }
        .button {
          font-size: 14px;
        }
      }
    }
  }
}
.pages-box {
  text-align: right;
}
</style>
