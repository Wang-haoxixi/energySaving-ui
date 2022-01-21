<template>
  <div>
    <iep-page-header title :backOption="backOption"></iep-page-header>
    <el-tabs type="border-card">
      <el-tab-pane label="项目基本信息">
        <form-basic @load-page="loadPage"></form-basic>
      </el-tab-pane>
      <el-tab-pane label="项目文档信息">
        <form-document></form-document>
      </el-tab-pane>
      <el-tab-pane label="项目预算信息">
        <form-budget></form-budget>
      </el-tab-pane>
      <el-tab-pane label="项目过程信息">
        <form-process :steps="process.steps" :current-step="process.currentStep"></form-process>
      </el-tab-pane>
      <el-tab-pane label="项目评分信息">
        <form-score></form-score>
      </el-tab-pane>
      <el-tab-pane label="项目采购信息">
        <form-purchase></form-purchase>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FormBasic from "./FormBasic.vue";
import FormDocument from "./FormDocument.vue";
import FormBudget from "./FormBudget.vue";
import FormProcess from "./FormProcess.vue";
import FormScore from "./FormScore.vue";
import FormPurchase from "./Purchase.vue";
export default {
  components: {
    FormBasic,
    FormDocument,
    FormBudget,
    FormProcess,
    FormScore,
    FormPurchase,
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
      process: {
        currentStep: 1,
        steps: [
          {
            icon: "12",
            title: "项目预审",
            description: "2020-01-08 11:41:58--2020-01-08 11:43:50",
          },
          {
            icon: "312",
            title: "项目预审",
            description: "2020-01-08 11:41:58--2020-01-08 11:43:50",
          },
          {
            icon: "123",
            title: "项目预审",
            description: "2020-01-08 11:41:58--2020-01-08 11:43:50",
          },
          {
            icon: "312",
            title: "项目预审",
            description: "2020-01-08 11:41:58--2020-01-08 11:43:50",
          },
        ],
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
