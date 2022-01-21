<template>
  <div class="iep-page-form">
    <iep-basic-container>
      <iep-page-header :title="`${methodName}课程`" :backOption="backOption"></iep-page-header>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="iep-form-detail"
        :disabled="show"
      >
        <iep-form-item label-name="课程名称" prop="courseName">
          <el-input :maxlength="30" v-model="form.courseName" placeholder="请输入课程名称"></el-input>
        </iep-form-item>
        <iep-form-item label-name="课程分类" prop="kind">
          <CategorySelect v-model="form.kind" :category="CourseCategory.INFO"></CategorySelect>
        </iep-form-item>
        <iep-form-item label-name="课程标签" :verifValue="form.tagKeyWords" prop="tagKeyWords">
          <IepTagInput v-model="form.tagKeyWords"></IepTagInput>
        </iep-form-item>
        <iep-form-item label-name="课程难度" prop="level">
          <iep-dict-select
            v-model="form.level"
            dict-name="course_level"
            clearable
            placeholder="请选择课程难度"
          ></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="课程封面" :verifValue="form.cover" prop="cover">
          <IepUploadAvatar
            v-model="form.cover"
            :dialogHeight="480"
            :dialogWidth="800"
            :imgTip="true"
            :width="400"
            :height="240"
          ></IepUploadAvatar>
        </iep-form-item>
        <iep-form-item label-name="课程讲师" :verifValue="form.lecturerId" prop="lecturerId">
          <LecturerLinkInput v-model="form"></LecturerLinkInput>
        </iep-form-item>
        <iep-form-item label-name="课程价格" prop="chargeStatus">
          <IepRadioGroup v-model="form.chargeStatus" :dictList="chargeStatusDictList"></IepRadioGroup>
        </iep-form-item>
        <template v-if="form.chargeStatus==='2'">
          <iep-form-item label-name="宝贝原价" prop="priceAmount" class="iep-form-half">
            <IepInputAmount v-model="form.priceAmount" :min="0.01"></IepInputAmount>
          </iep-form-item>
          <iep-form-item label-name="宝贝折扣价" prop="discountPrice" class="iep-form-half">
            <IepInputAmount v-model="form.discountPrice"></IepInputAmount>
          </iep-form-item>
          <iep-form-item label-name="现金原价" prop="cashAmount" class="iep-form-half">
            <IepInputAmount v-model="form.cashAmount" unit="元" :min="0.01"></IepInputAmount>
          </iep-form-item>
          <iep-form-item label-name="现金折扣价" prop="discountCash" class="iep-form-half">
            <IepInputAmount v-model="form.discountCash" unit="元"></IepInputAmount>
          </iep-form-item>
        </template>
        <iep-form-item label-name="课程介绍" prop="courseExplain">
          <IepJoditEditor v-model="form.courseExplain"></IepJoditEditor>
        </iep-form-item>
        <iep-form-item label-name="课程学分" prop="credit">
          <IepInputNumber v-model="form.credit"></IepInputNumber>
        </iep-form-item>
        <iep-form-item label-name="开放范围" prop="openScope">
          <IepRadioGroup v-model="form.openScope" :dictList="openScopeDictList" @change="clearExam"></IepRadioGroup>
        </iep-form-item>
        <iep-form-item label-name="发布目录" prop="releaseDirectoryList" v-if="form.openScope==='2'">
          <SubjectCascader v-model="form.releaseDirectoryList" placeholder="请输入发布目录"></SubjectCascader>
        </iep-form-item>
        <iep-form-item label-name="课程关联考试" prop="examId">
          <ExamLinkInput
            v-model="form"
            @update-data="handleUpdateData"
            @clear-data="handleClearData"
            ref="exam"
            :id="examId"
          ></ExamLinkInput>
        </iep-form-item>
        <iep-form-item label-name="完成状态" prop="completeType">
          <IepRadioGroup
            v-model="form.completeType"
            :dictList="completeTypeDictList"
            :disabled="!selectExam"
          ></IepRadioGroup>
        </iep-form-item>
        <iep-form-item
          label-name="学习顺序"
          prop="learnOrder"
          tip="学员学习每个章节，需按顺序完成小节课程学习，不可跳节学习，学习每个章节课程后，才能参加课后练习"
        >
          <el-switch v-model="form.learnOrder" active-value="1" inactive-value="0"></el-switch>
        </iep-form-item>
        <iep-form-item label-name="课程状态" prop="state">
          <el-switch v-model="form.state" active-value="1" inactive-value="0"></el-switch>
        </iep-form-item>
        <el-form-item v-if="!show">
          <el-button
            class="iep-btn-l"
            type="primary"
            :loading="submitFormLoading"
            @click="mixinsSubmitFormGen()"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </iep-basic-container>
  </div>
</template>
<script>
import {
  CourseDTO,
  chargeStatusDictList,
  completeTypeDictList,
  openScopeDictList,
  rules,
} from "./options";
import SubjectCascader from "../Components/SubjectCascader";
import ExamLinkInput from "../Components/ExamLinkInput/index";
import LecturerLinkInput from "../Components/LecturerLinkInput/index";
import formMixins from "@/mixins/formMixins";
import { getInfoById, postInfo, putInfo } from "@/api/qms/course_info";
import { formToDto, formToVo } from "../courseware/options";
import CategorySelect from "../Components/Category/Select";
import { CourseCategory } from "../options";
export default {
  components: {
    SubjectCascader,
    ExamLinkInput,
    LecturerLinkInput,
    CategorySelect,
  },
  mixins: [formMixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      // 如果用户没选关联考试
      // 下面这个完成状态 强制选第一个且不能编辑
      // 一旦选上考试，就可以编辑且随便选
      selectExam: false,
      rules: {
        ...rules,
        discountPrice: [
          { validator: this.validDiscountPrice, trigger: "blur" },
        ],
        discountCash: [{ validator: this.validDiscountCash, trigger: "blur" }],
      },
      chargeStatusDictList,
      completeTypeDictList,
      openScopeDictList,
      form: new CourseDTO(),
      CourseCategory,
      examId: 0,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    show() {
      return !!this.$route.query.show;
    },
    isEdit() {
      return this.id ? true : false;
    },
    formRequestFn() {
      return this.isEdit ? putInfo : postInfo;
    },
    methodName() {
      return this.isEdit ? "修改" : "新增";
    },
  },
  mounted() {
    this.loadPage();
  },
  // watch: {
  //   "form.priceAmount"(val) {
  //     if (!this.isEdit) {
  //       this.form.discountPrice = val;
  //     }
  //   },
  //   "form.cashAmount"(val) {
  //     if (!this.isEdit) {
  //       this.form.discountCash = val;
  //     }
  //   },
  // },
  methods: {
    clearExam() {
      this.$refs.exam.handleClear();
    },
    handleUpdateData() {
      this.selectExam = true;
    },
    handleClearData() {
      this.form.completeType = "1";
      this.selectExam = false;
    },
    loadPage() {
      if (this.isEdit) {
        getInfoById(this.id).then((data) => {
          const form = this.$mergeByFirst(new CourseDTO(), data.data);
          this.form = formToVo(form);
          this.form.examId
            ? (this.selectExam = true)
            : (this.selectExam = false);
          this.examId = form.examId;
        });
      }
    },
    async submitForm() {
      const { data } = await this.formRequestFn(formToDto(this.form));
      if (data) {
        this.$router.history.go(-1);
      }
    },
    validDiscountPrice(rules, value, callback) {
      if (value > this.form.priceAmount)
        return callback(new Error("宝贝折扣价不能大于宝贝原价"));
      callback();
    },
    validDiscountCash(rules, value, callback) {
      if (value > this.form.cashAmount)
        return callback(new Error("现金折扣价不能大于现金原价"));
      callback();
    },
  },
};
</script>
