<template>
  <iep-basic-container class="router-box">
    <div class="dynamic-wrapper">
      <iep-tabs :tabList="tabList" v-model="activeName" @tab-click="handleClick">
        <template v-if="activeName ==='professional_material'" v-slot:professional_material>
          <professional-material></professional-material>
        </template>
        <template v-if="activeName ==='thought'" v-slot:thought>
          <thought></thought>
        </template>
        <template v-if="activeName ==='product'" v-slot:product>
          <product></product>
        </template>
        <template v-if="activeName ==='activity'" v-slot:activity>
          <activity></activity>
        </template>
        <template v-if="activeName ==='recruit'" v-slot:recruit>
          <recruit></recruit>
        </template>
        <template v-if="activeName ==='questionnaire'" v-slot:questionnaire>
          <questionnaire></questionnaire>
        </template>
        <template v-if="activeName ==='material'" v-slot:material>
          <material></material>
        </template>
      </iep-tabs>
    </div>
  </iep-basic-container>
</template>
<script>
import { publishRouter } from "./router";
import thought from "./thought/index";
import ProfessionalMaterial from "./material/index";
import product from "./product/index";
import activity from "./activity/index";
import recruit from "./recruit/index";
import questionnaire from "./questionnaire/index";
import material from "./realMaterial/index";
export default {
  name: "dynamic",
  components: {
    thought,
    ProfessionalMaterial,
    product,
    activity,
    recruit,
    questionnaire,
    material,
  },
  data() {
    return {
      activeName: "professional_material",
    };
  },
  computed: {
    tabList() {
      return publishRouter.map(m => ({ label: m.tabName, value: m.path }));
    },
  },
  methods: {
    handleClick({ name }) {
      this.$router.push(name);
    },
  },
  watch: {
    "$route.path"(v) {
      this.activeName = v.split("/").pop();
    },
  },
  created() {
    this.activeName = this.$route.path.split("/").pop();
  },
};
</script>

<style lang="scss" scoped>
@import "../router-box";
.dynamic-wrapper {
  // margin-top: -10px;
  width: 100%;
  height: 100%;
}
.dynamic-wrapper ::v-deep .el-tabs__content {
  overflow: inherit;
}
</style>
