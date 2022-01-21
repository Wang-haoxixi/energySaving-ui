<template>
  <div>
    <h3 class="title">
      <iep-page-header :title="`#${title}#`" :backOption="backOption"></iep-page-header>
    </h3>
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
            :page-size="params.size"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopicThoughts } from "@/api/dms/thoughts";
import library from "@/views/channel/thought/library/index.vue";

const initParams = () => {
  return {
    current: 1,
    size: 10,
    topicId: 0,
  };
};

export default {
  components: { library },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("back_page", false);
        },
      },
      isShow: true,
      title: "",
      total: 0,
      params: initParams(),
      dataList: [],
    };
  },
  methods: {
    currentChange(val) {
      this.params.current = val;
      this.loadPage();
    },
    submitCallBack() {
      this.loadPage();
      this.$refs["subject"].loadData();
    },
    loadPage() {
      getTopicThoughts(this.params).then(({ data }) => {
        this.dataList = data.records;
        this.total = data.total;
      });
    },
    loadData(row) {
      this.title = row.content;
      this.params.topicId = row.topicId;
      this.loadPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  margin: auto;
  margin-bottom: 20px;
  width: 1200px;
}
.content {
  display: flex;
  width: 100%;
  margin: auto;
  .content-left {
    flex: 1;
    border-bottom: 1px solid $--border-color;
    .explain {
      display: flex;
      border-bottom: 1px solid $--border-color;
      margin-bottom: 30px;
      h3 {
        font-size: 16px;
        color: #303031;
        margin: 0;
        line-height: 35px;font-family: Microsoft YaHei;
      }
      span {
        color: $--color-text-secondary;
        font-size: 12px;
        line-height: 35px;
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
