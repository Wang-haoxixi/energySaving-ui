<template>
  <iep-basic-container>
    <h3 class="title">
      <iep-page-header :title="`#${title}#`" :backOption="backOption"></iep-page-header>
    </h3>
    <headTpl class="head" @load-page="submitCallBack" :subject="subjectTitle"></headTpl>
    <div class="content">
      <div class="content-left">
        <div class="explain">
          <h3>说说列表</h3>
          <span>（共{{total}}条说说）</span>
        </div>
        <div class="list">
          <IepNoData v-if="dataList.length == 0"></IepNoData>
          <div v-else>
            <div class="material">
              <library
                ref="library"
                @load-page="submitCallBack"
                :dataList="dataList"
                :params="params"
              ></library>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="total"
            :current-page="params.current"
            :page-size="params.size"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
      <div class="content-right">
        <!-- <subjectTpl ref="subject"></subjectTpl> -->
      </div>
    </div>

    <!-- 发表说说 -->
    <!-- <publish-dialog ref="publish" @load-page="searchPage"></publish-dialog> -->
    <!-- 转发 -->
    <forwardDialog ref="forward"></forwardDialog>
  </iep-basic-container>
</template>

<script>
import { getTopicThoughts } from "@/api/dms/thoughts";
import headTpl from "../library/form";
// import PublishDialog from "@/views/app/components/ThoughtsDialog/Publish";
import forwardDialog from "../forwardDialog";
// import subjectTpl from "../right/subject";
import library from "../library";

const initParams = () => {
  return {
    current: 1,
    size: 10,
    topicId: 0,
  };
};

export default {
  components: { headTpl, forwardDialog, library },
  beforeRouteUpdate(to, from, next) {
    this.$nextTick(() => {
      this.title = this.$route.query.title;
      this.subjectTitle = `#${this.title}#`;
      this.params.topicId = this.$route.query.id;
      this.params.current = 1;
      this.loadPage();
    });
    next();
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          // this.$router.push("/channel/thought_list");
          this.$router.go(-1);
        },
      },
      isShow: true,
      title: "",
      commontActiveIndex: -1,
      paramData: {},
      total: 0,
      activeIndex: -1,
      params: initParams(),
      dataList: [],
      subjectTitle: "",
    };
  },
  methods: {
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    searchPage(params) {
      if (params) {
        this.paramData = Object({}, this.paramData, params);
      }
      this.loadPage();
    },
    // 我要发布
    handlePublish() {
      this.$refs["publish"].open();
    },
    submitCallBack() {
      this.loadPage();
      this.$refs["subject"].loadData();
    },
    loadPage() {
      getTopicThoughts(this.params).then(({ data }) => {
        this.dataList = data.records;
        this.total = data.total;
        this.activeIndex = -1;
      });
    },
  },
  created() {
    this.title = this.$route.query.title;
    this.subjectTitle = `#${this.title}#`;
    this.params.topicId = this.$route.query.id;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
h3.title {
  width: 1200px;
  margin: auto;
  font-size: 24px;
  .akey {
    color: #c74c50;
  }
}
.head {
  margin: auto;
  margin-bottom: 20px;
  width: 1200px;
}
.content {
  display: flex;
  width: 1200px;
  margin: auto;
  .content-left {
    flex: 1;
    border-bottom: 1px solid $--border-color;
    .explain {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $--border-color;
      margin-bottom: 30px;
      padding-bottom: 10px;
      h3 {
        font-size: 16px;
        font-family: Microsoft YaHei;
        color: #303031;
        margin-right: 5px;
        margin-bottom: 0;
      }
      span {
        color: $--color-text-secondary;
        font-size: 12px;
      }
    }
    .material {
      width: 100%;
      margin: 0 auto;
    }
  }
  .content-right {
    width: 298px;
    margin-left: 20px;
    box-sizing: border-box;
  }
}
</style>
<style scoped>
.title >>> .page-title {
  font-size: 16px !important;
}
</style>
