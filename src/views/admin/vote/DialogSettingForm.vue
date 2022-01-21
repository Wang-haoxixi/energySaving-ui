<template>
  <iep-dialog :dialog-show="dialogShow" title="编辑设定" width="500px" @close="_close()">
    <el-form :model="form" :rules="rules" ref="form" label-width="95px">
      <iep-form-item label-name="指标类型" prop="typeName">
        <el-input v-model="form.typeName" readonly disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="最低值" prop="minimumValue">
        <iep-input-number v-model="form.minimumValue"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="最高值" prop="maximumValue">
        <iep-input-number v-model="form.maximumValue"></iep-input-number>
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
import { updateVoteSetting } from "@/api/fms/vote";
import { VoteSettingDTO } from "./options";
export default {
  mixins: [formMixins],
  data() {
    return {
      form: new VoteSettingDTO(),
      dialogShow: false,
      rules: {
        typeName: [{ required: true, message: "必填项", trigger: "blur" }],
        minimumValue: [{ required: true, message: "必填项", trigger: "blur" }],
        maximumValue: [{ required: true, message: "必填项", trigger: "blur" }],
      },
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new VoteSettingDTO();
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      delete this.form.typeName;
      const { data } = await updateVoteSetting(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
  },
};
</script>
