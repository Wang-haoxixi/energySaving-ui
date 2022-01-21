<template>
  <iep-basic-container class="router-box">
    <div class="participate-wrapper">
      <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="handleClick">
        <template v-if="tabName ==='questionnaire'" v-slot:questionnaire>
          <questionnaire></questionnaire>
        </template>
        <template v-if="tabName ==='vote'" v-slot:vote>
          <vote></vote>
        </template>
        <template v-if="tabName ==='activity'" v-slot:activity>
          <activity></activity>
        </template>
        <template v-if="tabName ==='recruit'" v-slot:recruit>
          <recruit></recruit>
        </template>
        <template v-if="tabName ==='exam'" v-slot:exam>
          <exam></exam>
        </template>
        <template v-if="tabName ==='exercise'" v-slot:exercise>
          <exercise></exercise>
        </template>
        <template v-if="tabName ==='certificate'" v-slot:certificate>
          <certificate></certificate>
        </template>
        <template v-if="tabName ==='mistake'" v-slot:mistake>
          <mistake></mistake>
        </template>
        <template v-if="tabName ==='feedback'" v-slot:feedback>
          <feedback></feedback>
        </template>
        <template v-if="tabName === 'course'" v-slot:course>
          <course></course>
        </template>
      </iep-tabs>
    </div>
  </iep-basic-container>
</template>
<script>
import questionnaire from "./questionnaire/index";
import vote from "./vote/index";
import activity from "../activity/index";
import recruit from "./recruit/index";
import exam from "./exam/index";
import exercise from "./exercise/index";
import certificate from "./certificate/index";
import mistake from "./mistake/index";
import feedback from "./feedback/index";
import course from "./course/index";
import { tabList } from "./option";

export default {
  name: "participate",
  components: {
    questionnaire,
    vote,
    activity,
    recruit,
    exam,
    exercise,
    certificate,
    mistake,
    feedback,
    course,
  },
  data() {
    return {
      tabList,
      tabName: "questionnaire",
    };
  },
  // watch: {
  //   tabName(v) {
  //     this.$router.push({
  //       path: "/my/index/participate",
  //       query: { tabName: v },
  //     });
  //   },
  // },
  methods: {
    handleClick({ name }) {
      this.$router.push({
        path: "/my/index/participate",
        query: { tabName: name },
      });
    },
  },
  created() {
    if (this.$route.query.tabName) {
      this.tabName = this.$route.query.tabName;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../router-box";
.participate-wrapper {
  background: transparent;
}
// .router-box {
//   position: relative;
//   ::v-deep .el-tabs__content {
//     margin-top: 10px;
//   }
// }
// .router-box ::v-deep .el-tabs__header {
//   position: absolute;
//   top: 20px;
//   left: 20px;
// }
// .participate-wrapper ::v-deep .operation-container {
//   position: relative;
//   top: -10px;
// }
</style>
