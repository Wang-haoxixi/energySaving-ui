<template>
  <iep-wrapper class="left" title="猜你喜欢">
    <iep-tabs
      class="like-box"
      v-loading="loading"
      v-model="tabName"
      :tabList="tabs"
      @tab-click="handleClick"
    >
      <template v-if="tabName ==='material'" v-slot:material>
        <material-list :value="data"></material-list>
      </template>
      <template v-if="tabName ==='questionnaire'" v-slot:questionnaire>
        <ques-list :value="data"></ques-list>
      </template>
      <template v-if="tabName ==='activity'" v-slot:activity>
        <meeting-list :value="data"></meeting-list>
      </template>
    </iep-tabs>
  </iep-wrapper>
</template>
<script>
import { getPersonRecommend } from "@/api/dms/material";
import { getQuesRecommendList } from "@/api/qms/questionnaire";
import { getPublishRecommend } from "@/api/meetting/publish";
import MaterialList from "./MaterialList";
import QuesList from "./QuesList";
import MeetingList from "./MeetingList";
const tabs = [
  {
    label: "专栏",
    value: "material",
  },
  {
    label: "问卷",
    value: "questionnaire",
  },
  {
    label: "活动",
    value: "activity",
  },
];
export default {
  components: {
    MaterialList,
    QuesList,
    MeetingList,
  },
  data() {
    return {
      data: [],
      loading: false,
      type: 3,
      tabs,
      tabName: "material",
      recommendRequestFn: getPersonRecommend,
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      const { data } = await this.recommendRequestFn(this.type);
      this.data = data;
      this.loading = false;
    },
    handleClick({ name }) {
      this.data = [];
      this.loading = true;
      switch (name) {
        case "material":
          this.type--;
          if (this.type < 1) this.type = 3;
          this.recommendRequestFn = getPersonRecommend;
          break;
        case "questionnaire":
          this.recommendRequestFn = getQuesRecommendList;
          break;
        case "activity":
          this.recommendRequestFn = getPublishRecommend;
          break;
        default:
          break;
      }
      this.load();
    },
  },
};
</script>
<style lang="scss" scoped>
.like-box {
  margin-top: -90px;
  width: 100%;
  height: 100%;
  & ::v-deep .el-tabs__nav {
    float: right;
  }
  & ::v-deep .el-tabs__content {
    height: calc(100% - 10px);
    .el-tab-pane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
  }
  ::v-deep .list-box {
    margin: 10px 0;
  }
}
</style>
