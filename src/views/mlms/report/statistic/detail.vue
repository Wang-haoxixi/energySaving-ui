<template>
  <div class="report">
    <iep-page-header :title="formData.title" :backOption="backOption"></iep-page-header>
    <div class="detail" v-if="requestFn === 'personDaily'">
      <pre>{{formData.workContent}}</pre>
    </div>
    <div class="detail" v-else>
      <div class="title">领导指示</div>
      <pre>{{formData.leaderIndication}}</pre>
      <div class="title">工作总结</div>
      <pre>{{formData.workSummary}}</pre>
      <div class="title">工作计划</div>
      <pre>{{formData.workPlan}}</pre>
      <div class="title">总结与感悟</div>
      <pre>{{formData.summarySentiment}}</pre>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";

export default {
  mixins: [mixins],
  components: {},
  data() {
    return {
      formData: {},
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("back_page", false);
        },
      },
      requestFn: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.detail {
  pre {
    padding: 0 20px;
    line-height: 24px;
    margin: 20px 0;
    min-height: 100px;
    font-size: 14px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, "微软雅黑", Arial, sans-serif;
    color: #666769;
    .el-tag {
      margin: 0 10px 10px 0;
    }
  }
  .title {
    margin-top: 10px;
    color: #666769;
  }
}
.report {
  position: relative;
}
.report ::v-deep .page-title {
  font-family: Microsoft YaHei;
  color: #303031;
}
.report ::v-deep .title-wrapper .title-col .right {
  position: absolute;
  top: -44px;
  right: 0;
}
</style>

