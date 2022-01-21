<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="620px" @close="isClose" center>
    <div class="center-box">
      <el-form :model="form">
        <iep-is-open v-model="form"></iep-is-open>
      </el-form>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <iep-button @click="isClose">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: "公开状态",
      form: {
        isOpen: 3,
      },
      dialogShow: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("opten-select", this.form.isOpen);
      this.isClose();
    },
    isClose() {
      this.form.isOpen = 3;
      this.dialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.center-box {
  text-align: center;
  padding: 0 20px;
  .isOpen {
    margin-bottom: 20px;
  }
  .content {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>