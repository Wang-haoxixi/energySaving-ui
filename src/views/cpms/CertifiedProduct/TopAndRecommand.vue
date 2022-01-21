<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="optConfigMap.dialogTitle"
    :width="`${optConfigMap.dialogWidth}px`"
    @close="_close()"
  >
    <el-form :model="form" label-width="100px">
      <iep-form-item label-name="推荐图">
        <iep-upload-avatar
          v-model="form.imageUrl"
          :width="optConfigMap.options.width"
          :height="optConfigMap.options.height"
          :imgTip="true"
          :dialogWidth="optConfigMap.options.dialogWidth"
          :dialogHeight="optConfigMap.options.dialogHeight"
        ></iep-upload-avatar>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button
        type="primary"
        :loading="submitFormLoading"
        @click="submitForm()"
        :disabled="cannotSubmit"
      >确定</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
class TopRecommandDTO {
  id = 0;
  type = "1";
  imageUrl = "";
}
export default {
  name: "",
  data() {
    return {
      submitFormLoading: false,
      dialogShow: false,
      form: new TopRecommandDTO(),
      formRequestFn: () => {},
    };
  },
  computed: {
    cannotSubmit() {
      return this.form.imageUrl === "";
    },
    optConfigMap() {
      const optConfigMap = {
        "1": {
          options: {
            width: 502.5,
            height: 202.5,
            dialogWidth: 1005,
            dialogHeight: 405,
          },
          dialogTitle: "置顶",
          dialogWidth: 700,
        },
        "2": {
          options: {
            width: 387,
            height: 193.5,
            dialogWidth: 774,
            dialogHeight: 387,
          },
          dialogTitle: "推荐",
          dialogWidth: 600,
        },
      };
      return optConfigMap[this.form.type];
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
      this.$emit("load-page");
      this.resetForm();
    },
    async submitForm() {
      try {
        this.submitFormLoading = true;
        const { data } = await this.formRequestFn(this.form);
        if (data) {
          this.$message("操作成功");
          this._close();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.submitFormLoading = false;
      }
    },
    resetForm() {
      this.form = new TopRecommandDTO();
    },
  },
};
</script>
