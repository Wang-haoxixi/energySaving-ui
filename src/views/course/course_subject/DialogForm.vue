<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="800px" @close="_close()">
    <el-form class="iep-form-detail" :model="form" ref="form" label-width="120px">
      <iep-form-item label-name="模板ID" prop="id">
        <el-input v-model="form.id" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="模板标题" prop="title">
        <el-input v-model.trim="form.title" placeholder="请填入模板标题"></el-input>
      </iep-form-item>
      <iep-form-item label-name="模板图标" prop="icon">
        <el-input v-model.trim="form.icon" placeholder="请填入模板图标"></el-input>
      </iep-form-item>
      <iep-form-item label-name="模板内容" prop="template">
        <iep-input-area v-model="form.template" placeholder="请填入模板内容"></iep-input-area>
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
      form: initForm(),
      methodName: "创建",
      dialogShow: false,
      formRequestFn: () => {},
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
