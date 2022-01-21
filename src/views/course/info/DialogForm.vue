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
      <iep-form-item label-name="大章节名称" prop="sectionName">
        <el-input
          v-model="form.sectionName"
          placeholder="请输入大章节名称"
          :disabled="type"
          maxlength="100"
        ></el-input>
      </iep-form-item>
      <iep-form-item label-name="小章节名称" prop="smallSectionName">
        <el-input v-model="form.smallSectionName" placeholder="请输入小章节名称" maxlength="100"></el-input>
      </iep-form-item>
      <iep-form-item label-name="学习时长" prop="learnTime">
        <IepInputNumber v-model="form.learnTime" placeholder="请输入学习时长"></IepInputNumber>
      </iep-form-item>
      <iep-form-item label-name="关联课件" prop="coursewareId">
        <CoursewareLinkInput v-model="form"></CoursewareLinkInput>
      </iep-form-item>
      <iep-form-item label-name="关联练习" prop="exerciseId">
        <ExeLinkInput v-model="form" :infoId="form.infoId"></ExeLinkInput>
      </iep-form-item>
    </el-form>
    <template v-if="!disabled" slot="footer">
      <el-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import CoursewareLinkInput from "../Components/CoursewareLinkInput/index";
import ExeLinkInput from "../Components/ExeLinkInput/index";
import { InfoSectionDTO, sectionRules } from "./options";
import { postInfoSection, putInfoSection } from "@/api/qms/course_info_section";
import formMixins from "@/mixins/formMixins";
export default {
  components: {
    CoursewareLinkInput,
    ExeLinkInput,
  },
  mixins: [formMixins],
  data() {
    return {
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      methodName: "",
      form: new InfoSectionDTO(),
      roleOptions: [],
      type: true,
      rules: sectionRules,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this.form = new InfoSectionDTO();
      this._close();
      this.$emit("load-page");
    },
    addSection(row, infoId) {
      console.log(infoId);
      this.type = false;
      this.form = new InfoSectionDTO(true);
      if (row.length > 0) {
        this.form.sectionNumber = row[row.length - 1].sectionNumber + 1;
      } else {
        this.form.sectionNumber = 1;
      }
      this.form.smallSectionNumber = 1;
      this.form.infoId = infoId;
      this.add();
    },
    addSmallSection(row) {
      this.type = true;
      this.form = this.$mergeByFirst(new InfoSectionDTO(), row);
      this.form.smallSectionNumber =
        row.children[row.children.length - 1].smallSectionNumber + 1;
      this.add();
    },
    add() {
      this.methodName = "新增章节";
      this.formRequestFn = postInfoSection;
      this.dialogShow = true;
      this.disabled = false;
    },
    edit(row) {
      this.form = this.$mergeByFirst(new InfoSectionDTO(), row);
      this.methodName = "编辑章节";
      this.formRequestFn = putInfoSection;
      this.dialogShow = true;
      this.disabled = false;
    },
    show(row) {
      this.form = this.$mergeByFirst(new InfoSectionDTO(), row);
      this.methodName = "查看章节";
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
