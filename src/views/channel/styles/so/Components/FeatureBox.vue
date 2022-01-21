<template>
  <div class="feature-wrapper box-wrapper">
    <iep-tabs class="tabs" :activeName="activeName" :tabList="tabList" @tab-click="handleSelect">
      <feature-ques @setDataLength="setDataLength" ref="ques" slot="ques"></feature-ques>
      <feature-meeting @setDataLength="setDataLength" ref="meeting" slot="meeting"></feature-meeting>
      <feature-task @setDataLength="setDataLength" ref="task" slot="task"></feature-task>
    </iep-tabs>
    <join-more v-if="isMore" :path="activeName" v-bind="$attrs"></join-more>
  </div>
</template>
<script>
import FeatureQues from "./FeatureQues";
import FeatureMeeting from "./FeatureMeeting";
import FeatureTask from "./FeatureTask";
import JoinMore from "./JoinMore";
const tabList = [
  { label: "任务", value: "task" },
  { label: "问卷", value: "ques" },
  { label: "活动", value: "meeting" },
];
export default {
  name: "FeatureBox",
  components: {
    FeatureQues,
    FeatureMeeting,
    FeatureTask,
    JoinMore,
  },
  data() {
    return {
      tabList,
      activeName: "task",
      isMore: false,
    };
  },
  watch: {
    "$route.query.featureName"() {
      this.init();
    },
  },
  methods: {
    handleSelect({ name }) {
      if (name !== this.activeName) {
        this.$router.replace({ query: { featureName: name } });
        // this.$refs[name].load();
      }
    },
    init() {
      this.dataLength = 0;
      this.$route.query.featureName &&
        (this.activeName = this.$route.query.featureName);
      this.$refs[this.activeName].load();
    },
    setDataLength(v) {
      this.isMore = v;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.feature-wrapper {
  .tabs {
    width: 100%;
  }
  ::v-deep .el-tabs__content {
    overflow: inherit;
  }
}
.box-wrapper {
  justify-content: space-between;
}
</style>

