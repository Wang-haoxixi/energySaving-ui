<template>
  <div class="report">
    <iep-page-header :title="`${record.methodName}试题`" :data="[10, 5]" :backOption="backOption"></iep-page-header>
    <el-tabs v-model="tabName">
      <el-tab-pane label="单题输入" name="single"></el-tab-pane>
      <el-tab-pane label="批量导入" name="batch" v-if="record.id===''"></el-tab-pane>
    </el-tabs>
    <el-form
      :model="form"
      ref="form"
      label-width="120px"
      :rules="rules"
      style="margin-right: 16%;margin-top: 20px;"
    >
      <div class="select">
        <el-form-item label="试题分类：" prop="kind">
          <el-input @focus="handleFocus" style="width:40%" v-model="form.kind"></el-input>
        </el-form-item>
        <!-- <iep-form-item label-name="试题类型" prop="type">
          <iep-dict-select
            v-model="form.type"
            dict-name="exam_question_type"
            @input="updateValue(arguments[0])"
            placeholder
            clearable
            style="width: 40%"
            :disabled="record.id!==''"
          ></iep-dict-select>
        </iep-form-item>-->
        <!-- <iep-form-item label-name="难度" prop="level">
          <iep-dict-select
            v-model="form.level"
            dict-name="exam_difficulty"
            clearable
            placeholder
            style="width: 40%"
          ></iep-dict-select>
        </iep-form-item>-->
      </div>
    </el-form>
    <single-dialog
      class="single-dialog"
      ref="single"
      :postAnswer="postAnswer"
      v-if="tabName == 'single'"
    ></single-dialog>
    <div class="footer" v-if="tabName == 'single'">
      <el-button class="iep-btn-l" type="primary" @click="saveSingle">保存</el-button>
    </div>
    <batch-dialog
      ref="batch"
      v-model="form.type"
      @submit-batch="submitBatch"
      v-if="record.id==='' && tabName !== 'single'"
    ></batch-dialog>
    <dialogType ref="dialogType" @save="handleActive" :checkTreeMenu="propTreeMenu"></dialogType>
  </div>
</template>

<script>
import { chooseOption } from "./option";
import mixins from "@/mixins/mixins";
import BatchDialog from "./Batch.vue";
import SingleDialog from "./Single.vue";
import store from "@/store";
import {
  postExamquestionPage,
  getExamquestionPageById,
  updateExamquestionPage,
  updateExamquestionPageAgain,
  getTestDictPage,
} from "@/api/qms/test_questions_library";
import dialogType from "./dialogType";
export default {
  name: "report",
  mixins: [mixins],
  components: {
    BatchDialog,
    SingleDialog,
    dialogType,
  },
  props: ["record"],
  data() {
    return {
      chooseOption,
      dialogExamine: false,
      tagsShow: [],
      questionTypeDisabled: false,
      postAnswer: "",
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      propTreeMenu: {},
      kindEn: "",
      form: {
        kind: "",
        kindName: "",
        type: "",
        level: "",
        associatedState: "",
        tagKeyWords: [],
        tag: "", // 标签
      },
      tabName: "batch",
      rules: {
        kind: [
          { required: true, message: "请选择试题分类", trigger: "change" },
        ],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        level: [{ required: true, message: "请选择难度", trigger: "change" }],
        tagKeyWords: [
          {
            type: "array",
            required: true,
            message: "请选择关联标签",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    if (this.record.propTreeMenu) {
      this.propTreeMenu = this.record.propTreeMenu;
      this.form.kind = this.record.propTreeMenu.selectCn;
    }
    if (this.isEdit) {
      this.showEdit();
    }
  },
  watch: {
    res: function () {
      // this.getTestPaper ()
    },
  },
  computed: {
    isEdit() {
      return this.record.id ? true : false;
    },
  },
  methods: {
    /**
     * 编辑试卷
     */

    showEdit() {
      const id = this.record.id;
      this.questionTypeDisabled = true;
      this.tabName = "single";
      getExamquestionPageById(id).then((res) => {
        const data = res.data;
        this.form = data;
        this.form.tagKeyWords = data.tagKeyWords ? data.tagKeyWords : [];
        this.kindEn = this.form.kind;
        this.form.kind = this.form.kindName;
        this.$refs.single.ruleForm.title = data.title;
        // 新增字段 标题图片
        this.$refs.single.ruleForm.titleUrl = data.titleUrl || "";
        this.$refs.single.ruleForm.type = data.type;
        this.$refs.single.ruleForm.quesExplain = data.quesExplain;
        this.$refs.single.ruleForm.level = data.level;
        this.$refs.single.ruleForm.id = data.id;
        this.postAnswer = data.type;
        this.tagsShow = data.tagKeyWords;
        this.$refs.single.ruleForm.tagKeyWords = data.tagKeyWords;
        if (data.type == "RADIO") {
          const arrRadio = JSON.parse(data.options);
          this.$refs.single.ruleForm.radioOptions = arrRadio;
          this.$refs.single.inputUndisabled();
          this.$refs.single.ruleForm.radioOption = arrRadio.map((i) => i.key);
          this.$refs.single.ruleForm.inputRadioAnswer = data.answer;
        }
        if (data.type == "CHECKBOX") {
          const arrCheckbox = JSON.parse(data.options);
          this.$refs.single.inputUndisabled();
          this.$refs.single.ruleForm.checkboxOptions = arrCheckbox;
          this.$refs.single.ruleForm.checkboxOption = arrCheckbox.map(
            (i) => i.key,
          );
          const answer = JSON.parse(data.answer);
          this.$refs.single.ruleForm.inputCheckboxAnswer = answer;
        }
        if (data.type == "CHECKED") {
          this.$refs.single.ruleForm.inputJudgeAnswer = data.answer;
          this.$refs.single.inputUndisabled();
        }
        if (data.type == "GAPFILLING") {
          // 填空题转化为数组
          const arr = data.answer.split("|");
          this.$refs.single.ruleForm.gapfillingOptions = [];
          arr.forEach((element) => {
            this.$refs.single.ruleForm.gapfillingOptions.push({
              value: element,
            });
          });
          this.$refs.single.inputUndisabled();
        }
        if (data.type == "ESSAYQUESTION") {
          this.$refs.single.ruleForm.answer = data.answer;
          this.$refs.single.inputUndisabled();
        }
        // if (
        //   data.questionType == 10 ||
        //   data.questionType == 10000 ||
        //   data.questionType == 10011
        // ) {
        //   this.$refs.single.ruleForm.inputShortAnswer = data.answer;
        // }
      });
    },
    /**
     * 选择题型
     */
    updateValue(value) {
      if (
        this.form.type &&
        this.tabName === "batch" &&
        this.$refs.batch.testQuestions
      ) {
        this.$confirm("输入区试题内容会清空，请确认", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.form.type = value;
          this.postAnswer = value;
          this.$refs.batch.testQuestions = "";
          this.$refs.batch.type = value;
          this.$refs.batch.itemBankList = [];
        });
      } else {
        // this.$refs.single.clearValidate();
        this.form.type = value;
        this.postAnswer = value;
        this.$refs.batch.type = value;
      }
    },
    handleFocus() {
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].btnDisabled = false;
      const type = 1;
      const params = {};
      params.category = type;
      getTestDictPage(params).then((res) => {
        const data = res.data.children;
        data.children ? data.children : [];
        this.$refs["dialogType"].data = data;
        this.$refs["dialogType"].dictId = res.data.id;
        this.$refs["dialogType"].category = type;
        if (this.propTreeMenu.selectCn) {
          this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
        }
      });
    },
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.form.kind = val.selectCn;
      });
    },
    /**
     * 返回
     */
    handleGoBack() {
      this.$emit("onGoBack", {
        current: this.record.current,
        size: this.record.size,
        search: this.record.search,
      });
    },
    /**
     * 修改保存试题
     */
    saveSingle() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.single.submitForm() == true) {
            // this.$refs.single.submitForm ()
            // this.form.forEach(element => {
            //   element.level =
            // });
            const form = JSON.parse(JSON.stringify(this.form));
            form.tag = form.tagKeyWords.toString();
            form.kind = this.propTreeMenu.selectString || this.kindEn;
            form.kindName = this.propTreeMenu.selectCn;
            const ruleForm = this.$refs.single.ruleForm;
            const singleBothForm = Object.assign(form, ruleForm);
            // 各种一点一点新家的判断
            let data = "";
            let agin = true;
            // 一下是各种判断 单选选项不能为空 选项不能相同(产品需求是不能相同 比如 如图然后上传图片这种也不行) 选项不能为空 选项需要和答案对应
            // 多选和单选一样
            // 填空答案不能相同 (产品需求 也就是一个填空题的 空不可能出去答案一样的情况) 填空判断答案不能为空
            if (form.type === "RADIO") {
              // 分类型进行判断 单选的时候 题目选项至少2个 并且选项不为空 并且答案需要和选项相互对应
              if (JSON.parse(singleBothForm.options).length === 1) {
                this.$message.error("题目选项至少2个！");
                return false;
              }
              singleBothForm.radioOptions.forEach((value, index) => {
                singleBothForm.radioOptions.forEach((chil, indexs) => {
                  if (
                    index !== indexs &&
                    value.value == chil.value &&
                    value.value !== ""
                  ) {
                    data = `${chooseOption[index]}和${chooseOption[indexs]}选项重复!`;
                  }
                });
                if (value.value === "" && value.optionUrl === "") {
                  data = `${chooseOption[index]}选项不能为空!`;
                }
              });
              if (data) {
                this.$message.error(data);
                return false;
              }
              agin = JSON.parse(singleBothForm.options).some((res) => {
                if (res.key === singleBothForm.answer) {
                  return true;
                }
              });
            } else if (form.type === "CHECKBOX") {
              if (JSON.parse(singleBothForm.options).length === 1) {
                this.$message.error("题目选项至少2个！");
                return false;
              }
              if (JSON.parse(singleBothForm.answer).length < 2) {
                this.$message.error("多选题答案至少2个！");
                return false;
              }
              singleBothForm.checkboxOptions.forEach((value, index) => {
                singleBothForm.checkboxOptions.forEach((chil, indexs) => {
                  if (
                    index !== indexs &&
                    value.value == chil.value &&
                    value.value !== ""
                  ) {
                    data = `${chooseOption[index]}和${chooseOption[indexs]}选项重复!`;
                  }
                });
                if (value.value === "" && value.optionUrl === "") {
                  data = `${chooseOption[index]}选项不能为空!`;
                }
              });
              if (data) {
                this.$message.error(data);
                return false;
              }
              // 判断答案是否和他匹配
              JSON.parse(singleBothForm.answer).forEach((res) => {
                let k = false;
                JSON.parse(singleBothForm.options).forEach((opt) => {
                  if (opt.key === res) {
                    k = true;
                  }
                });
                if (!k) {
                  agin = false;
                }
              });
            } else if (form.type === "GAPFILLING") {
              // let num = 0;
              // data = singleBothForm.gapfillingOptions.some((element, index) => {
              //   if (element.value === "") {
              //     num = index;
              //     return true;
              //   }
              // });
              singleBothForm.gapfillingOptions.forEach((value, index) => {
                singleBothForm.gapfillingOptions.forEach((chil, indexs) => {
                  if (
                    index !== indexs &&
                    value.value == chil.value &&
                    value.value !== ""
                  ) {
                    data = `第${index + 1}和第${indexs + 1}答案重复!`;
                  }
                });
                if (value.value === "") {
                  data = `第${index + 1}答案不能为空!`;
                }
              });
              if (data) {
                this.$message.error(data);
                return false;
              }
            }
            if (!agin) {
              this.$message.error("题目和选项不符合！");
              return false;
            }
            if (!singleBothForm.id) {
              if (singleBothForm.type === "CHECKED") {
                singleBothForm.options = JSON.stringify([
                  { key: "A", value: "正确" },
                  { key: "B", value: "错误" },
                ]);
              }
              if (!singleBothForm.options) {
                singleBothForm.options = JSON.stringify([]);
              }
              singleBothForm.tag = singleBothForm.tagKeyWords.join(",");
              postExamquestionPage({ examQuestionList: [singleBothForm] }).then(
                (res) => {
                  if (res.data) {
                    this.$message({
                      type: "success",
                      message: "提交成功!",
                    });
                    this.$emit("onGoBack");
                  }
                },
              );
            } else {
              if (singleBothForm.type === "CHECKED") {
                singleBothForm.options = JSON.stringify([
                  { key: "A", value: "正确" },
                  { key: "B", value: "错误" },
                ]);
              }
              updateExamquestionPage(singleBothForm).then((res) => {
                if (res.data === false) {
                  this.$confirm(
                    "试题已被考试使用，且有人作答，确定修改答案并更新考试得分么?",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    },
                  ).then(() => {
                    updateExamquestionPageAgain(singleBothForm).then(() => {
                      this.$message({
                        type: "success",
                        message: "修改成功!",
                      });
                      this.$emit("onGoBack", {
                        current: this.record.current,
                        size: this.record.size,
                        search: this.record.search,
                      });
                    });
                  });
                } else if (res.code === 0 && res.data !== false) {
                  this.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  this.$emit("onGoBack", {
                    current: this.record.current,
                    size: this.record.size,
                    search: this.record.search,
                  });
                }
              });
            }
          }
        }
      });
    },
    /**
     * 提交批量试题
     */
    submitBatch(value) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const postBatchBothForm = {
            examQuestionList: [],
          };
          const form = JSON.parse(JSON.stringify(this.form));
          form.tag = form.tagKeyWords.toString();
          form.kind = this.propTreeMenu.selectString || form.kind;
          value.forEach((element) => {
            const itemBank = Object.assign({}, form, element);
            if (itemBank.type == "CHECKED") {
              const PDOptions = [
                { key: "A", value: "正确" },
                { key: "B", value: "错误" },
              ];
              if (itemBank.answer == "正确" || itemBank.answer == "对") {
                itemBank.answer = "A";
              } else if (
                (itemBank.answer == "错误") |
                (itemBank.answer == "错")
              ) {
                itemBank.answer = "B";
              }
              itemBank.options = JSON.stringify(PDOptions);
              // PDOptions.map(m => {
              //   if (m.value == itemBank.answer) {
              //     itemBank.answer = m.key;
              //   }
              // });
            } else {
              itemBank.options = JSON.stringify(itemBank.options);
              itemBank.answer =
                itemBank.answer instanceof Array
                  ? JSON.stringify(itemBank.answer)
                  : itemBank.answer;
            }
            const dictGroup = store.state.common.dictGroup;
            const mapName = dictGroup.has("exam_difficulty")
              ? dictGroup.get("exam_difficulty")
              : [];
            const allOptions = [...mapName];
            allOptions.forEach((element) => {
              if (element.label === itemBank.level) {
                itemBank.level = element.value;
              }
            });
            postBatchBothForm.examQuestionList.push(itemBank);
          });
          // this.$emit("onGoBack");
          postExamquestionPage(postBatchBothForm).then((res) => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "提交成功!",
              });
              this.$emit("onGoBack");
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.single-dialog {
  margin-top: -40px;
  ::v-deep {
    .el-form {
      margin-right: 16%;
      padding-top: 30px;
      border: 0 !important;
    }
  }
}
.footer {
  margin-top: 2%;
  margin-left: 120px;
  padding-bottom: 45px;
}
::v-deep .el-tabs__content {
  padding-bottom: 20px;
  border-bottom: 1px solid $--border-color;
}
.report ::v-deep .el-tabs__header {
  margin-bottom: 0;
}
</style>
