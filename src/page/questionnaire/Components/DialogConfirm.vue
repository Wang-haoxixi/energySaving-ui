<template>
  <el-dialog
    top="30vh"
    :visible.sync="dialogShow"
    :title="dialogTitle"
    width="80%"
    @close="_close()"
    class="dialog"
  >
    <div>是否提交问卷?</div>
    <el-button type="primary" @click="handleConfirm">确定</el-button>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogShow: false,
      dialogTitle: "提示",
      callback: () => {},
      params: {},
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleConfirm() {
      this.callback(this.params);
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    border-radius: $--border-radius-base;
    .el-dialog__body {
      padding-top: 0;
      .el-button {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
</style>