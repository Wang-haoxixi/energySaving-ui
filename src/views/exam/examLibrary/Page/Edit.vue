<template>
  <div class="exam-lib">
    <iep-page-header :title="`${record.methodName}考试`" :data="[10, 5]" :backOption="backOption"></iep-page-header>
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
      <iep-form-item label-name="考试名称" prop="examName">
        <el-input v-model="form.examName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="考试难度" prop="level">
        <iep-dict-select v-model="form.level" dict-name="exam_difficulty" clearable placeholder></iep-dict-select>
      </iep-form-item>
      <div style="display:flex">
        <iep-form-item label-name="答卷时长" prop="answerTime">
          <iep-input-number
            v-model="form.answerTime"
            type="number"
            onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          >
            <template slot="append">分钟</template>
          </iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="及格分数" prop="passScore">
          <iep-input-number
            v-model="form.passScore"
            onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          >
            <template slot="append">分</template>
          </iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="总分" label-width="60px">
          <div style="width:40px;">{{form.score}}分</div>
        </iep-form-item>
        <iep-form-item label-name="优秀分数" prop="goodScore">
          <iep-input-number
            v-model="form.goodScore"
            onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          >
            <template slot="append">分</template>
          </iep-input-number>
        </iep-form-item>
      </div>
      <iep-form-item label-name="标签" prop="tagKeyWords">
        <iep-tag-input v-model="form.tagKeyWords"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="考试封面">
        <IepUploadAvatar
          v-model="form.cover"
          :dialogHeight="480"
          :dialogWidth="800"
          :imgTip="true"
          :width="400"
          :height="240"
        ></IepUploadAvatar>
      </iep-form-item>
      <iep-form-item label-name="考试说明" prop="examExplain">
        <IepJoditEditor v-model="form.examExplain" v-if="!isDisabled"></IepJoditEditor>
        <IepJoditRead :value="form.examExplain" v-if="isDisabled"></IepJoditRead>
      </iep-form-item>
      <el-divider></el-divider>
      <div style="margin-bottom:20px">其它设置</div>
      <iep-form-item label-name="关联证书">
        <div style="width:100%">
          <el-button @click="checkCertificate">请选择</el-button>
        </div>
        <div>
          <el-tag
            v-for="(tag,index) in form.certificateList"
            :key="index"
            :closable="!isDisabled"
            @close="handleClose(index)"
          >{{tag.title}}</el-tag>
        </div>
      </iep-form-item>
      <iep-form-item label-name="关联材料">
        <RelationCreate ref="relation" :orgId="record.orgId" :isCreater="!isDisabled"></RelationCreate>
      </iep-form-item>
      <iep-form-item label-name="查看答卷时间" prop="checkExamTime">
        <el-date-picker
          style="width:40%"
          v-model="form.checkExamTime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期"
        ></el-date-picker>
      </iep-form-item>
      <iep-form-item label-name="考试保存" prop="allowSave">
        <el-radio-group v-model="form.allowSave">
          <el-radio :label="'1'">开启</el-radio>
          <el-radio :label="'2'">不开启</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="成绩显示" prop="showScore">
        <el-radio-group v-model="form.showScore" :disabled="true">
          <el-radio :label="'1'">考后显示成绩</el-radio>
          <el-radio :label="'2'">批改后显示成绩</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="答题次数" prop="repeatExam">
        <el-radio-group v-model="form.repeatExam">
          <el-radio :label="'1'">只限1次</el-radio>
          <el-radio :label="'2'">可重复考</el-radio>
          <el-radio :label="'3'">选择次数</el-radio>
        </el-radio-group>
        <div v-if="form.repeatExam === '3'" style="display:flex;margin-left:30px;width: 174px;">
          <el-input-number v-model="form.repeatNum" :min="1" :max="99"></el-input-number>
          <span style="padding-left: 10px;">次</span>
        </div>
      </iep-form-item>
      <iep-form-item label-name="考试时间" prop="timeSelect">
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
          <el-radio :label="'1'">So内开放</el-radio>
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
      <iep-form-item label-name="关联练习">
        <div style="width:100%">
          <el-button @click="checkExercise">请选择</el-button>
        </div>
        <div>
          <el-tag
            v-for="(tag,index) in form.examinationExerciseList"
            :key="index"
            :closable="!isDisabled"
            @close="handleRemoveExercise(index)"
          >{{tag.examName}}</el-tag>
        </div>
      </iep-form-item>
      <iep-form-item label-name="考试费用" prop="chargeStatus">
        <el-radio-group v-model="form.chargeStatus">
          <el-radio :label="'1'">免费</el-radio>
          <el-radio :label="'2'">只收一次</el-radio>
          <el-radio :label="'3'" v-if="form.repeatExam!='1'">重复收费</el-radio>
        </el-radio-group>
        <div
          v-if="form.chargeStatus==='2' || form.chargeStatus==='3'"
          style="margin-left:30px; display:flex"
        >
          <span style="width:100px">报名收取</span>
          <el-input-number
            style="width:150px"
            v-model="form.consume"
            :max="999999"
            :min="1"
            :precision="0"
          ></el-input-number>
          <span style="padding-left: 10px;">贝</span>
        </div>
      </iep-form-item>
      <iep-form-item class="item" label-name="宝贝奖励" prop="rewardStatus">
        <el-radio-group
          style="display:block"
          v-model="form.rewardStatus"
          :disabled="form.deductionsState === '1'"
        >
          <el-radio :label="'1'">无奖励</el-radio>
          <el-radio :label="'2'">有奖励</el-radio>
        </el-radio-group>
        <div v-if="form.rewardStatus=='2'" style="display:flex;">
          <div style="display:flex;margin-right:15px">
            <span style="width:80px">合格奖励</span>
            <el-input-number
              style="width:150px"
              placeholder="请输入内容"
              v-model="form.reward"
              :min="1"
              :precision="0"
              :disabled="form.deductionsState === '1'"
            >
              <template slot="append">贝</template>
            </el-input-number>
            <span style="margin-left:8px; width:50px">贝</span>
          </div>
          <div style="display:flex;margin-right:15px">
            <span style="width:80px">奖励范围</span>
            <el-input
              style="width:220px"
              :min="1"
              :disabled="form.deductionsState === '1'"
              placeholder="请输入内容"
              v-model="form.rewardScope"
              type="number"
              onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            >
              <template slot="prepend">前</template>
              <template slot="append">名有效</template>
            </el-input>
          </div>
          <div style="display:flex;margin-right:15px">
            <span style="width:120px">宝贝消耗</span>
            <el-input placeholder="请输入内容" disabled v-model="form.rewardConsume">
              <template slot="append">贝</template>
            </el-input>
          </div>
        </div>
      </iep-form-item>
      <iep-form-item label-name="课程考试" prop="courseExam">
        <el-switch
          v-model="form.courseExam"
          active-color="#3cd489"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </iep-form-item>
      <iep-form-item label-name="考试状态" prop="state">
        <el-switch v-model="form.state" active-color="#3cd489" active-value="1" inactive-value="0"></el-switch>
      </iep-form-item>
    </el-form>
    <iepFooterBar class="footer">
      <el-button class="iep-btn-l" type="primary" @click="handleSave()" v-if="!isDisabled">保存</el-button>
    </iepFooterBar>
    <dialog-paper-select ref="dialogPaperSelect" @dialog-paper-select="dialogPaperSelect"></dialog-paper-select>
    <certificate ref="certificate" @dialog-select="getCertificate"></certificate>
    <exerciseDialog ref="exerciseDialog" @dialog-select="getExercise"></exerciseDialog>
  </div>
</template>
<script>
import { encryption } from "@/util/util";
import dialogPaperSelect from "./dialogPaperSelect";
import certificate from "./certificate";
import exerciseDialog from "./exerciseDialog";
import mixins from "@/mixins/mixins";
import { getTestPaperById } from "@/api/qms/test_questions_library";
import {
  updateExamexaminationPage,
  addExamexaminationPage,
  getExamexaminationPageById,
} from "@/api/qms/exam_examination";
import { dictsMap } from "../../const/testOptions.ts";
import RelationCreate from "./relation/relationCreate";
export default {
  props: ["record"],
  mixins: [mixins],
  components: {
    dialogPaperSelect,
    certificate,
    RelationCreate,
    exerciseDialog,
  },
  data() {
    return {
      dictsMap,
      form: {
        cover: "",
        showScore: "",
        certificateList: [],
        examinationExerciseList: [],
        testPaperId: "",
        choiceNum: "",
        score: 0,
        kind: "",
        examName: "",
        level: "",
        answerTime: 0,
        passScore: 0,
        goodScore: 0,
        examExplain: "",
        timeSelect: "1",
        beginTime: "",
        endTime: "",
        openScope: "1",
        releaseDirectory: "",
        chargeStatus: "1",
        consume: 1,
        rewardStatus: "1",
        reward: 1,
        rewardScope: 100,
        rewardConsume: 100,
        state: "1",
        checkExamTime: "",
        repeatNum: 1,
        repeatExam: "1",
        allowSave: "1",
        tagKeyWords: [],
        courseExam: "0",
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
      const validatePass1 = (rule, value, callback) => {
        if (value > 9999) {
          callback(new Error("不得大于4位数"));
        } else if (value < 1) {
          callback(new Error("至少大于1分钟"));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value > this.paperInfo.score) {
          callback(new Error("不得大于总分"));
        }
        if (value > 9999) {
          callback(new Error("不得大于4位数"));
        } else if (value < 1) {
          callback(new Error("不得小于1"));
        } else if (
          Number(value) < Number(this.form.passScore) ||
          Number(value) === Number(this.form.passScore)
        ) {
          callback(new Error("优秀必须大于及格"));
        } else {
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value > this.paperInfo.score) {
          callback(new Error("不得大于总分"));
        }
        if (value < this.paperInfo.score / 2) {
          callback(new Error("不得小于总分的50%"));
        }
        if (value > 9999) {
          callback(new Error("不得大于4位数"));
        } else if (value < 1) {
          callback(new Error("不得小于1"));
        } else {
          callback();
        }
      };
      return {
        type: [{ required: true, message: "请选择" }],
        testPaperId: [{ required: true, message: "请选择" }],
        examName: [
          { required: true, message: "请输入", trigger: "blur" },
          { max: 100, message: "考试名称不允许超过100个字" },
        ],
        level: [{ required: true, message: "请选择", trigger: "blur" }],
        answerTime: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePass1, trigger: "blur" },
        ],
        passScore: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
        goodScore: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        tagKeyWords: [
          { required: true, message: "请填写标签", trigger: ["change"] },
        ],
        timeSelect: [{ required: true, message: "请选择", trigger: "blur" }],
        openScope: [{ required: true, message: "请选择", trigger: "blur" }],
        showScore: [{ required: true, message: "请选择", trigger: "blur" }],
        allowSave: [{ required: true, message: "请选择", trigger: "blur" }],
        repeatExam: [{ required: true, message: "请选择", trigger: "blur" }],
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
      this.$refs["dialogPaperSelect"].load(1);
    },
    dialogPaperSelect(val) {
      this.paperInfo = val;
      this.form.testPaperId = val.title;
      this.form.showScore = val.showScore;
      this.form.score = val.score;
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
        if (this.isEdit) {
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
          if (!this.form.repeatNum && this.form.repeatExam === "3") {
            this.$message({
              showClose: true,
              message: "请填写重复考试次数!",
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
          if (
            this.form.deductionsState !== "1" &&
            this.form.rewardStatus === "2"
          ) {
            this.$prompt(`请输入支付密码`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              inputType: "password",
              inputPlaceholder: `请输入支付密码`,
              inputValidator: (val) => {
                return val ? true : `请输入支付密码`;
              },
              closeOnClickModal: false,
            })
              .then(async ({ value }) => {
                // 宝贝支付加密
                const res = encryption({ data: { value }, param: ["value"] });
                this.form.pwd = res.value;
                this.saveData();
              })
              .catch(() => {});
          } else {
            this.saveData();
          }
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
            message: "考试保存成功",
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
    // 关联证书
    checkCertificate() {
      this.$refs["certificate"].dialogShow = true;
      this.$refs["certificate"].load();
    },
    // 关联练习
    checkExercise() {
      this.$refs["exerciseDialog"].dialogShow = true;
      const item = [];

      this.form.examinationExerciseList.forEach((element) => {
        item.push(element.id);
      });
      this.$refs["exerciseDialog"].selectOption = item;
      this.$refs["exerciseDialog"].openScope = this.form.openScope;
      this.$refs["exerciseDialog"].load();
    },
    // 获取证书
    getCertificate(row) {
      // 暂时先单选
      this.form.certificateList = [];
      this.form.certificateList.push(row);
    },
    // 获取练习
    getExercise(row) {
      this.form.examinationExerciseList.push(row);
    },
    // 删除证书等等
    handleClose(index) {
      this.form.certificateList.splice(index, 1);
    },
    // 删除练习等等
    handleRemoveExercise(index) {
      this.form.examinationExerciseList.splice(index, 1);
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
    "form.reward": {
      deep: true,
      handler() {
        if (this.form.reward && this.form.rewardScope) {
          this.form.rewardConsume = (
            this.form.reward * this.form.rewardScope
          ).toFixed(1);
        } else {
          this.form.rewardConsume = 0;
        }
      },
    },
    "form.rewardScope": {
      deep: true,
      handler() {
        if (this.form.reward && this.form.rewardScope) {
          this.form.rewardConsume = (
            this.form.reward * this.form.rewardScope
          ).toFixed(1);
        } else {
          this.form.rewardConsume = 0;
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
    "form.rewardStatus": {
      deep: true,
      handler(val) {
        if (val == "1") {
          this.form.reward = 0;
          this.form.rewardScope = 0;
          this.form.rewardConsume = 0;
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
