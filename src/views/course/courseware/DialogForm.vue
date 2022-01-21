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
      <iep-form-item label-name="课件名称" prop="wareName">
        <el-input v-model="form.wareName" placeholder="请输入课件名称" maxlength="100"></el-input>
      </iep-form-item>
      <iep-form-item label-name="课件分类" prop="kind">
        <CategorySelect v-model="form.kind" :category="CourseCategory.COURSEWARE"></CategorySelect>
      </iep-form-item>
      <iep-form-item label-name="上传课件" prop="wareUrl">
        <IepUploadSelect v-model="form.wareUrl" accept="*" @get-file="handleSetFile"></IepUploadSelect>
      </iep-form-item>
      <iep-form-item label-name="课件类型" prop="type">
        <!-- 1 视频 .mp4, 2 音频 .mp3, 3 文档 .pdf 4 其他 * -->
        <IepDictSelect
          v-model="form.type"
          dictName="course_ware_type"
          @change="handleChange"
          @visible-change="handleVisible"
          disabled
        ></IepDictSelect>
      </iep-form-item>
    </el-form>
    <template v-if="!disabled" slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { postCourseware, putCourseware } from "@/api/qms/course_courseware";
import formMixins from "@/mixins/formMixins";
import { formToDto, formToVo, CourseWare, courseWareRules } from "./options";
import { CourseCategory } from "../options";
import CategorySelect from "../Components/Category/Select";
function checkPictureName(str) {
  const MP4Regex = "(.mp4)$"; // 用于验证 mp4 扩展名的正则表达式
  const MP3Regex = "(.mp3)$"; // 用于验证 mp3 扩展名的正则表达式
  const PDFRegex = "(.pdf)$"; // 用于验证 pdf 扩展名的正则表达式
  if (new RegExp(MP4Regex).test(str.toLowerCase())) {
    return "1";
  } else if (new RegExp(MP3Regex).test(str.toLowerCase())) {
    return "2";
  } else if (new RegExp(PDFRegex).test(str.toLowerCase())) {
    return "3";
  } else {
    return "4";
  }
}
export default {
  mixins: [formMixins],
  components: {
    CategorySelect,
  },
  data() {
    return {
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "",
      form: new CourseWare(),
      CourseCategory,
      rules: courseWareRules,
    };
  },
  methods: {
    handleVisible(v) {
      if (v === true) {
        this.$message.warning("改变课件类型会移除已上传的课件");
      }
    },
    handleChange() {
      // 课件类型 1 视频 .mp4, 2 音频 .mp3, 3 文档 .pdf 4 其他 *
      this.form.wareUrl = "";
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new CourseWare();
      this._close();
      this.$emit("load-page");
    },
    add() {
      this.form = new CourseWare();
      this.methodName = "新增课件";
      this.formRequestFn = postCourseware;
      this.dialogShow = true;
      this.disabled = false;
    },
    _fillForm(row) {
      const form = this.$mergeByFirst(new CourseWare(), row);
      this.form = formToVo(form);
    },
    edit(row) {
      this._fillForm(row);
      this.methodName = "编辑课件";
      this.formRequestFn = putCourseware;
      this.dialogShow = true;
      this.disabled = false;
    },
    show(row) {
      this._fillForm(row);
      this.methodName = "查看课件";
      this.dialogShow = true;
      this.disabled = true;
    },
    async submitForm() {
      const { data } = await this.formRequestFn(formToDto(this.form));
      if (data) {
        this.$message.success("操作成功");
        this.close();
      }
    },
    handleSetFile(file) {
      this.form.type = checkPictureName(file.url);
      this.form.wareSize = file.fileSize;
      this.form.wareUrl = file.wareFullUrl;
    },
  },
};
</script>
