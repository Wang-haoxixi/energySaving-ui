<template>
  <iep-dialog :dialog-show="dialogShow" title="新增公告" width="500px" @close="_close()">
    <el-form
      class="iep-form-detail"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="65px"
      :disabled="disabled"
    >
      <iep-form-item label-name="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </iep-form-item>
      <iep-form-item label-name="内容" prop="content">
        <iep-input-area v-model="form.content" placeholder="请输入内容"></iep-input-area>
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
class PlatformNoticeDTO {
  title = "";
  content = "";
}
const rules = {
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
};
export default {
  mixins: [formMixins],
  data() {
    return {
      rules,
      disabled: false,
      dialogShow: false,
      form: new PlatformNoticeDTO(),
      formRequestFn: () => {},
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new PlatformNoticeDTO();
      this._close();
      this.disabled = false;
      this.$emit("load-page");
    },
    async submitForm() {
      const { data } = await this.formRequestFn(this.form);
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    resetForm() {
      this.form = new PlatformNoticeDTO();
    },
  },
};
</script>
