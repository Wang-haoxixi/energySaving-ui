<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="520px" @close="_close()" center>
    <div class="center-box">
      <el-radio-group v-model="status" class="status">
        <el-radio :label="isInverse ? 0 : 1">审核通过</el-radio>
        <el-radio :label="2">审核不通过</el-radio>
      </el-radio-group>
      <iep-input-area v-if="status === 2 && isContent" class="message" v-model="message">
      </iep-input-area>
    </div>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="handleSubmit">提 交</el-button>
      <el-button @click="_close()">取 消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  name: "IepReviewConfirm",
  props: {
    isInverse: {
      type: Boolean,
      default: false,
    },
    isContent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      submitFormLoading: false,
      title: "",
      formRequestFn: () => {},
      dialogShow: false,
      status: this.isInverse ? 0 : 1, // 待审核
      message: "",
      id: null,
      ids: [],
    };
  },
  computed: {
    currentIds() {
      if (this.id) {
        return [this.id];
      } else {
        return this.ids;
      }
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.status = 1;
      this.message = "";
      this._close();
      this.$emit("load-page");
    },
    handleSubmit() {
      if (this.message.length > 2000) {
        this.$message("字数不得超过 2000 !");
        return;
      }
      this.submitFormLoading = true;
      this.formRequestFn({
        ids: this.currentIds,
        status: this.status, // 用来变更状态
        message: this.message,
      }).then(data => {
        this.submitFormLoading = false;
        if (data.data) {
          this.$message.success("操作成功");
        } else {
          this.$message(data.msg);
        }
        this.close();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.center-box {
  text-align: center;
  padding: 0 20px;
  .status {
    margin-bottom: 20px;
  }
  .message {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>
