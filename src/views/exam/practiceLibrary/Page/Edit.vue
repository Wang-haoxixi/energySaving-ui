<template>
  <div class="exam-lib">
    <iep-page-header :title="`${record.methodName}练习`" :data="[10, 5]" :backOption="backOption"></iep-page-header>
    <el-form
      class="iep-form-detail"
      :model="form"
      ref="form"
      :disabled="isDisabled"
      label-width="120px"
      :rules="rules"
      :dictsMap="dictsMap"
      style="margin-right: 16%;"
    >
      <iep-form-item label-name="选择试卷" prop="testPaperId">
        <el-input :disabled="isEdit" v-model="form.testPaperId" @focus="handleFocus"></el-input>
      </iep-form-item>
      <iep-form-item label-name="练习名称" prop="examName">
        <el-input v-model="form.examName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="练习难度" prop="level">
        <iep-dict-select v-model="form.level" dict-name="exam_difficulty" clearable placeholder></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="标签" prop="tagKeyWords">
        <iep-tag-input v-model="form.tagKeyWords"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="练习说明" prop="examExplain">
        <IepJoditEditor v-model="form.examExplain" v-if="!isDisabled"></IepJoditEditor>
        <IepJoditRead :value="form.examExplain" v-if="isDisabled"></IepJoditRead>
      </iep-form-item>
      <el-divider></el-divider>
      <div style="margin-bottom:20px">其它设置</div>
      <iep-form-item label-name="关联材料">
        <RelationCreate ref="relation" :orgId="record.orgId" isCreate></RelationCreate>
      </iep-form-item>
      <iep-form-item label-name="答案显示" prop="showAnswer">
        <el-radio-group v-model="form.showAnswer">
          <el-radio :label="'1'">答题时显示正确答案</el-radio>
          <el-radio :label="'2'">交卷后给正确答案</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="练习次数" prop="repeatExam">
        <el-radio-group v-model="form.repeatExam">
          <el-radio :label="'1'">只限1次</el-radio>
          <el-radio :label="'2'">重复练习</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="练习时间" prop="timeSelect">
        <el-radio-group v-model="form.timeSelect">
          <el-radio :label="'1'">
            固定时间
            <el-date-picker
              :disabled="form.timeSelect=='2'"
              style="width:40%;margin-right:5px;margin-left:10px"
              v-model="form.beginTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              :picker-options="pickerOptions2"
              placeholder="选择日期"
            ></el-date-picker>-
            <el-date-picker
              :disabled="form.timeSelect=='2'"
              style="width:40%"
              v-model="form.endTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              :picker-options="pickerOptions"
              placeholder="选择日期"
            ></el-date-picker>
          </el-radio>
          <el-radio :label="'2'">长期有效</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="开放范围" prop="openScope">
        <el-radio-group v-model="form.openScope">
          <el-radio :label="'1'">组织内开放</el-radio>
          <el-radio :label="'2'">生态开放</el-radio>
        </el-radio-group>
        <div v-if="form.openScope==2" style="display:flex;margin-left:30px;">
          <span style="width:80px">发布目录</span>
          <iep-dict-select
            v-model="form.releaseDirectory"
            placeholder="请选择"
            :dict-name="'exam_subject'"
          ></iep-dict-select>
        </div>
      </iep-form-item>
      <iep-form-item label-name="练习费用" prop="chargeStatus">
        <el-radio-group v-model="form.chargeStatus">
          <el-radio :label="'1'">免费</el-radio>
          <el-radio :label="'2'">收费</el-radio>
        </el-radio-group>
        <div v-if="form.chargeStatus=='2'" style="margin-left:30px; display:flex">
          <span style="width:100px">报名收取</span>
          <el-input-number
            style="width:150px"
            v-model="form.consume"
            :max="999999"
            :min="1"
            :precision="0"
          ></el-input-number>
          <span style="margin-left:8px; width:100px">贝</span>
        </div>
      </iep-form-item>
      <iep-form-item label-name="练习状态" prop="state">
        <el-switch v-model="form.state" active-color="#3cd489" active-value="1" inactive-value="0"></el-switch>
      </iep-form-item>
    </el-form>
    <iepFooterBar class="footer">
      <el-button class="iep-btn-l" type="primary" @click="handleSave()" v-if="!isDisabled">保存</el-button>
    </iepFooterBar>
    <dialog-paper-select ref="dialogPaperSelect" @dialog-paper-select="dialogPaperSelect"></dialog-paper-select>
  </div>
</template>
<script>
import dialogPaperSelect from "../../examLibrary/Page/dialogPaperSelect";
import mixins from "@/mixins/mixins";
import {
  updateExamexaminationPage,
  addExamexaminationPage,
  getExamexaminationPageById,
} from "@/api/qms/exam_exercise";
import { dictsMap } from "../../const/testOptions.ts";
import RelationCreate from "../../examLibrary/Page/relation/relationCreate";
import { getTestPaperById } from "@/api/qms/test_questions_library";
export default {
  props: ["record"],
  mixins: [mixins],
  components: {
    dialogPaperSelect,
    RelationCreate,
  },
  data() {
    return {
      dictsMap,
      form: {
        repeatExam: "1",
        showAnswer: "1",
        testPaperId: "",
        choiceNum: "",
        score: "",
        kind: "",
        examName: "",
        level: "",
        examExplain: "",
        timeSelect: "1",
        beginTime: "",
        endTime: "",
        openScope: "1",
        releaseDirectory: "",
        chargeStatus: "1",
        consume: 1,
        state: "1",
        tagKeyWords: [],
      },
      formRequestFn: () => {},
      paperInfo: {},
      testPaperId: 0,
      testPaperName: "",
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      pickerOptions: {
        // 限制时间
        // selectableRange: ['22:00:00 - 23:59:59','00:00:00 - 02:00:00'],
        // 限制日期
        disabledDate: this.disabledDate,
      },
      pickerOptions2: {
        // 限制时间
        // selectableRange: ['22:00:00 - 23:59:59','00:00:00 - 02:00:00'],
        // 限制日期
        disabledDate: this.disabledDate2,
      },
    };
  },
  created() {
    if (this.isEdit) {
      this.showEdit();
    }
  },
  computed: {
    rules() {
      return {
        type: [{ required: true, message: "请选择" }],
        testPaperId: [{ required: true, message: "请选择" }],
        examName: [
          { required: true, message: "请输入", trigger: "blur" },
          { max: 100, message: "练习名称不允许超过100个字" },
        ],
        level: [{ required: true, message: "请选择", trigger: "blur" }],
        timeSelect: [{ required: true, message: "请选择", trigger: "blur" }],
        openScope: [{ required: true, message: "请选择", trigger: "blur" }],
        showAnswer: [{ required: true, message: "请选择", trigger: "blur" }],
        repeatExam: [{ required: true, message: "请选择", trigger: "blur" }],
        tagKeyWords: [
          { required: true, message: "请填写标签", trigger: ["change"] },
        ],
      };
    },
    isEdit() {
      return this.record.id ? true : false;
    },
    isDisabled() {
      return this.record.edit;
    },
  },
  methods: {
    handleFocus() {
      this.$refs["dialogPaperSelect"].dialogShow = true;
      this.$refs["dialogPaperSelect"].load(2);
    },
    dialogPaperSelect(val) {
      this.paperInfo = val;
      this.form.testPaperId = val.title;
    },
    disabledDate(time) {
      if (this.form.beginTime) {
        const nowTime = this.form.beginTime;
        let thisTime = nowTime;
        thisTime = thisTime.replace(/-/g, "/");
        const times = new Date(thisTime);
        return time.getTime() < times - 8.64e7 + 2 * 24 * 60 * 60;
      } else {
        return time.getTime() < Date.now() - 3600 * 1000 * 24;
      }
    },
    disabledDate2(time) {
      if (this.form.endTime) {
        const nowTime = this.form.endTime;
        let thisTime = nowTime;
        thisTime = thisTime.replace(/-/g, "/");
        const times = new Date(thisTime);
        return time.getTime() > times - 8.64e7;
      }
    },
    showEdit() {
      getExamexaminationPageById(this.record.id).then((res) => {
        const { data } = res;
        const relationList = {
          material: [],
        };
        const relationForm = {
          material: [],
        };
        for (const item of data.materialList) {
          relationList.material.push(item);
          relationForm.material.push(item.id);
        }
        this.$refs.relation.list = relationList;
        this.$refs.relation.formData = relationForm;
        this.form = Object.assign(this.form, data);
        if (data.beginTime || data.endTime) {
          this.form.timeSelect = "1";
        } else {
          this.form.timeSelect = "2";
        }
        if (this.form.testPaperId) {
          getTestPaperById(this.form.testPaperId).then((res) => {
            this.testPaperId = this.form.testPaperId;
            this.testPaperName = res.data.title;
            this.form.testPaperId = res.data.title;
          });
        }
      });
    },
    handleSave() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.form.releaseDirectory && this.form.openScope === "2") {
            this.$message({
              showClose: true,
              message: "请选择生态目录!",
              type: "warning",
            });
            return false;
          }
          if (
            this.form.timeSelect == "1" &&
            (!this.form.beginTime || !this.form.endTime)
          ) {
            this.$message({
              showClose: true,
              message: "请正确填写固定时间!",
              type: "warning",
            });
            return false;
          }
          if (
            new Date(this.form.beginTime).getTime() >
            new Date(this.form.endTime).getTime()
          ) {
            this.$message({
              showClose: true,
              message: "结束时间不得小于开始时间!",
              type: "warning",
            });
            return false;
          }
          this.saveData();
        } else {
          this.saveLoading = false;
        }
      });
    },
    saveData() {
      if (this.isEdit) {
        this.formRequestFn = updateExamexaminationPage;
        this.form.testPaperId = this.testPaperId;
      } else {
        this.formRequestFn = addExamexaminationPage;
        this.form.testPaperId = this.paperInfo.id;
      }
      this.form.releaseDirectory = this.form.releaseDirectory.toString();
      this.form.choiceNum = this.paperInfo.choiceNum;
      this.form.score = this.paperInfo.score;
      this.form.kind = this.paperInfo.kind;
      let relationList = {};
      if (this.$refs.relation) {
        relationList = this.$refs.relation.list;
      }
      const materialList = [];
      for (const key in relationList) {
        for (const item of relationList[key]) {
          materialList.push({
            materialId: item.id,
          });
        }
      }
      this.form.materialList = materialList;
      this.formRequestFn(this.form).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: "练习保存成功",
            type: "success",
          });
          this.$emit("onGoBack");
        } else {
          if (this.isEdit) {
            this.form.testPaperId = this.testPaperName;
          } else {
            this.form.testPaperId = this.paperInfo.title;
          }
        }
      });
    },
    handleGoBack() {
      this.$emit("onGoBack");
    },
  },
  watch: {
    "form.timeSelect": {
      deep: true,
      handler(val) {
        if (val == 2) {
          this.form.beginTime = "";
          this.form.endTime = "";
        }
      },
    },
    "form.openScope": {
      deep: true,
      handler(val) {
        if (val == "1") {
          this.form.releaseDirectory = "";
        }
      },
    },
    "form.chargeStatus": {
      deep: true,
      handler(val) {
        if (val == "1") {
          this.form.consume = "";
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.item ::v-deep .el-form-item__content {
  display: inherit;
}
.footer {
  margin-top: 2%;
  padding-bottom: 45px;
}
.exam-lib {
  border-bottom: 1px solid $--border-color;
}
.exam-lib ::v-deep .el-form-item__content {
  flex-wrap: wrap;
}
</style>
