<template>
  <div class="footer-wrapper">
    <div class="btn-group">
      <el-button class="iep-btn-l" type="primary" @click="handleView">预览</el-button>
      <!-- <el-button :loading="disabled" @click="handleSubmit">提交</el-button> -->
      <el-button class="iep-btn-l" :loading="loading" @click="handleSave">保存</el-button>
      <el-button class="iep-btn-l" @click="close">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    openLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    },
    handleSubmit() {
      this.$emit("submit");
    },
    handleSave() {
      this.$emit("save");
    },
    handleView() {
      this.$emit("view");
    },
    close() {
      this.$confirm("此操作将不会保存当前内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("close");
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-wrapper {
  // position: fixed;
  // bottom: 0;
  // width: calc(100vh - 220px);
  // right: 0;
  margin-left: 340px;
  height: 56px;
  line-height: 56px;
  // border-bottom: 1px solid #d7d7d7;
  float: left;
}
</style>