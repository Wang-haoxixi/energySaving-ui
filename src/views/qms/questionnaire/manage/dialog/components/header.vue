<template>
  <div class="title-wrapper">
    <div class="left">{{title}}</div>
    <div class="right">
      <el-button v-if="isAnalysis" @click="html2pdf">导出成PDF</el-button>
      <el-button v-if="isAnalysis" @click="changeIsAll" class="btn">{{isAll?"显示单题":"显示全部"}}</el-button>
      <el-button class="iep-back-btn" @click="back" v-show="isBack">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    isBack: {
      type: Boolean,
      default: false,
    },
    isAnalysis: {
      type: Boolean,
      default: false,
    },
    isAll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    back() {
      this.$emit("back");
    },
    changeIsAll() {
      this.$emit("change-isAll");
    },
    html2pdf() {
      this.$emit("html2pdf");
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 20px;
    padding: 0;
    margin-bottom: 20px;
  }
}
.btn {
  // padding: 0;
  // width: 76px;
  // height: 28px;
  // border-radius: 5px;
  margin-right: 5px;
}
</style>
