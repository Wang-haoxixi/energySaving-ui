<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form :model="form" ref="form" :rules="rules" label-width="85px">
      <iep-form-item label-name="版本号" prop="versionNumber">
        <el-input v-model="form.versionNumber"></el-input>
      </iep-form-item>
      <iep-form-item label-name="更新说明" prop="description">
        <iep-input-area v-model="form.description"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from "@/mixins/formMixins";
import { initForm } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      dialogShow: false,
      methodName: "新增",
      form: initForm(0),
      formRequestFn: () => {},
      rules: {
        versionNumber: [
          { required: true, message: "请填写版本号", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请填写更新说明", trigger: "blur" },
          { max: 500, message: "长度在不少于500个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    load(appId) {
      this.form = initForm(appId);
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm(0);
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
