<template>
  <iep-dialog :dialog-show="dialogShow" title="发送警告信息" width="500px" @close="_close()">
    <el-form :model="form" ref="form" :rules="rules" class="iep-form-detail" label-width="80px">
      <iep-form-item label-name="警告内容" prop="content">
        <iep-input-area v-model="form.content" show-word-limit :maxlength="500"></iep-input-area>
      </iep-form-item>
      <iep-form-item label-name="选择模板" prop="templateId">
        <el-button @click="handleShowTemplate()">{{buttonTitle}}</el-button>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="submitForm()">发送</el-button>
      <el-button @click="close()">取消</el-button>
    </template>
    <TemplateDialog ref="TemplateDialog" @submit="handleSelect"></TemplateDialog>
  </iep-dialog>
</template>
<script>
import { sendWarning } from "@/api/ims/message";
import TemplateDialog from "./TemplateDialog";
const initForm = () => {
  return {
    dataId: null,
    content: "",
    templateId: null,
    type: null, // 警告类型1用户，2组织
  };
};
export default {
  components: {
    TemplateDialog,
  },
  data() {
    return {
      buttonTitle: "选择模板",
      submitFormLoading: false,
      dialogShow: false,
      form: initForm(),
      rules: {},
    };
  },
  methods: {
    handleSelect(item) {
      this.buttonTitle = item.title;
      this.form.templateId = item.categoryId;
      this.form.content = item.template;
    },
    handleShowTemplate() {
      this.$refs["TemplateDialog"].dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    async submitForm() {
      this.submitFormLoading = true;
      const { data } = await sendWarning(this.form);
      if (data) {
        this.$message("操作成功");
        this.close();
      }
      this.submitFormLoading = false;
    },
  },
};
</script>
