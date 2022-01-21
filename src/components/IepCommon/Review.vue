<template>
  <iep-dialog :dialog-show="dialogShow" :title="dialogTitle" width="500px" @close="_close()">
    <iep-input-area
      v-model="content"
      :show-word-limit="showWordLimit"
      :maxlength="maxlength"
      :placeholder="placeholder"
    ></iep-input-area>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">保存</el-button>
      <el-button @click="close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  name: "IepReview",
  props: {
    maxlength: {
      type: Number,
      default: 500,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prop: "content",
      content: "",
      placeholder: "请输入理由",
      dialogTitle: "理由",
      dialogShow: false,
      submitFormLoading: false,
      formRequestFn: () => {},
      form: {},
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.content = "";
      this._close();
    },
    async submitForm() {
      this.submitFormLoading = true;
      try {
        const { data } = await this.formRequestFn({
          ...this.form,
          [this.prop]: this.content,
        });
        if (data) {
          this._;
          this.$emit("ok");
        } else {
          this.$emit("fail", data);
        }
      } catch (error) {
        this.$emit("fail", error);
      } finally {
        this._close();
        this.content = "";
        this.submitFormLoading = false;
      }
    },
  },
};
</script>
