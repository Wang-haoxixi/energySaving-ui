<template>
  <div>
    <iep-page-header title :backOption="backOption"></iep-page-header>
    <el-tabs type="border-card">
      <el-tab-pane label="项目基本信息">
        <form-basic @load-page="loadPage"></form-basic>
      </el-tab-pane>

      <el-tab-pane label="项目预算信息">
        <form-budget></form-budget>
      </el-tab-pane>
      <el-tab-pane label="项目评分信息">
        <form-score></form-score>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FormBasic from "./FormBasic.vue";

import FormBudget from "./FormBudget.vue";
import FormScore from "./FormScore.vue";
export default {
  components: {
    FormBasic,
    FormBudget,
    FormScore,
  },
  props: {
    firstClass: {
      type: Array,
      default: () => {},
    },
    formStatus: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit("load-page", false);
        },
      },
    };
  },
  methods: {
    open() {
      // console.log(row);
    },
    loadPage() {
      this.$emit("load-page", true);
    },
  },
};
</script>

<style lang="" scoped>
</style>
