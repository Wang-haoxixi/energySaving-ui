<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="_close()">
    <el-form :model="form" ref="form" label-width="60px" :disabled="disabled">
      <iep-form-item label-name="敏感词" prop="name">
        <el-input v-model.trim="form.name" placeholder="请填入敏感词"></el-input>
      </iep-form-item>
      <iep-form-item label-name="替换词" prop="replacement">
        <el-input v-model.trim="form.replacement" placeholder="请填入替换词"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from "./options";
import formMixins from "@/mixins/formMixins";
export default {
  mixins: [formMixins],
  data() {
    return {
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "创建",
      form: initForm(),
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = initForm();
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
