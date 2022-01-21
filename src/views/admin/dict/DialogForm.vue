<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}信息`" width="500px" @close="_close()">
    <el-form :model="form" ref="form" label-width="85px" :disabled="disabled">
      <iep-form-item label-name="字典编码" prop="code">
        <el-input v-model.trim="form.code"></el-input>
      </iep-form-item>
      <iep-form-item label-name="字典名称" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="创建时间" prop="createTime">
        <el-input v-model="form.createTime" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="更新时间" prop="updateTime">
        <el-input v-model="form.updateTime" disabled></el-input>
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
      dialogShow: false,
      disabled: false,
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
      this.dialogShow = false;
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
