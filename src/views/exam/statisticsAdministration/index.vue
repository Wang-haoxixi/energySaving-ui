<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
        <template v-if="tabName ==='DataStatistics'" v-slot:DataStatistics>
          <DataStatistics></DataStatistics>
        </template>
        <template v-if="tabName ==='ExamStatistics'" v-slot:ExamStatistics>
          <ExamStatistics></ExamStatistics>
        </template>
        <template v-if="tabName ==='UserStatistics'" v-slot:UserStatistics>
          <UserStatistics></UserStatistics>
        </template>
        <template v-if="tabName ==='SoExamStatistics'" v-slot:SoExamStatistics>
          <SoExamStatistics></SoExamStatistics>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DataStatistics from "./DataStatistics/index";
import ExamStatistics from "./ExamStatistics/index";
import UserStatistics from "./UserStatistics/index";
import SoExamStatistics from "./SoExamStatistics/index";

export default {
  components: {
    DataStatistics,
    ExamStatistics,
    UserStatistics,
    SoExamStatistics,
  },
  data() {
    return {
      tabName: "DataStatistics",
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    tabList() {
      const tL = [
        {
          label: "数据统计",
          value: "DataStatistics",
        },
        {
          label: "考试统计",
          value: "ExamStatistics",
        },
        {
          label: "考生统计",
          value: "UserStatistics",
        },
      ];
      if (this.isPlatform) {
        tL.push({
          label: "组织考试统计",
          value: "SoExamStatistics",
        });
        return tL;
      } else {
        return tL;
      }
    },
  },
  created() {
    if (this.$route.query.tabName) {
      this.tabName = this.$route.query.tabName;
    }
  },
  methods: {
    handleClick({ name }) {
      this.$router.push({
        query: { tabName: name },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.title-desc {
  font-size: 14px;
  color: gray;
}
.el-tabs ::v-deep .basic-container {
  padding: 0;
  border: 0;
}
</style>
