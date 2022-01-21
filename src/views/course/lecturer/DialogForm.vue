<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="600px" @close="_close()">
    <el-form
      class="iep-form-detail"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
      :disabled="disabled"
    >
      <iep-form-item label-name="讲师姓名" prop="lecturerName">
        <el-input v-model="form.lecturerName" placeholder="请输入讲师姓名" :maxlength="10"></el-input>
      </iep-form-item>
      <iep-form-item label-name="讲师标签" prop="tagKeyWords">
        <iep-tag-input v-model="form.tagKeyWords" placeholder="请输入讲师姓名"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="讲师头像" prop="avatar">
        <IepUploadAvatar v-model="form.avatar"></IepUploadAvatar>
      </iep-form-item>
      <iep-form-item label-name="对外头衔" prop="diplomacyTitle">
        <el-input v-model="form.diplomacyTitle" placeholder="请输入对外头衔" :maxlength="50"></el-input>
      </iep-form-item>
      <iep-form-item label-name="讲师介绍" prop="lecturerExplain">
        <IepInputArea v-model="form.lecturerExplain" placeholder="请输入讲师介绍" :maxlength="500"></IepInputArea>
      </iep-form-item>
    </el-form>
    <template v-if="!disabled" slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postLecturer, putLecturer } from "@/api/qms/course_lecturer";
import formMixins from "@/mixins/formMixins";
const initForm = () => {
  return {
    id: null,
    avatar: "",
    diplomacyTitle: "", //讲师头衔
    lecturerExplain: "", //讲师详情
    lecturerName: "", //讲师名称
    tagKeyWords: [], //标签
  };
};
export default {
  mixins: [formMixins],
  data() {
    return {
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "",
      form: initForm(),
      roleOptions: [],
      rules: {
        lecturerName: [
          {
            type: "string",
            required: true,
            message: "请填写讲师姓名",
            trigger: "blur",
          },
        ],
        tagKeyWords: [
          {
            type: "array",
            required: true,
            message: "请填写讲师标签",
            trigger: "blur",
          },
        ],
        avatar: [
          {
            type: "string",
            required: true,
            message: "请上传讲师头像",
            trigger: "blur",
          },
        ],
        diplomacyTitle: [
          {
            type: "string",
            required: true,
            message: "请填写对外头衔",
            trigger: "blur",
          },
        ],
        lecturerExplain: [
          {
            type: "string",
            required: true,
            message: "请填写讲师介绍",
            trigger: "blur",
          },
        ],
      },
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
    add() {
      this.form = initForm();
      this.methodName = "新增讲师";
      this.formRequestFn = postLecturer;
      this.dialogShow = true;
      this.disabled = false;
    },
    edit(row) {
      this.form = this.$mergeByFirst(initForm(), row);
      this.methodName = "编辑讲师";
      this.formRequestFn = putLecturer;
      this.dialogShow = true;
      this.disabled = false;
    },
    show(row) {
      this.form = this.$mergeByFirst(initForm(), row);
      this.methodName = "查看讲师";
      this.dialogShow = true;
      this.disabled = true;
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
