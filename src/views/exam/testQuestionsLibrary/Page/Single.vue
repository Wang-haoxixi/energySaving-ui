<template>
  <div class="single">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="120px"
      :rules="rules"
      style="border:solid 1px #eee;padding:40px 0 20px 0;"
    >
      <iep-form-item label-name="试题类型" prop="type">
        <iep-dict-select
          v-model="ruleForm.type"
          dict-name="exam_question_type"
          placeholder
          clearable
          style="width: 40%"
          :disabled="ruleForm.id ? true : btnDisabled"
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="难度" prop="level">
        <iep-dict-select
          v-model="ruleForm.level"
          dict-name="exam_difficulty"
          clearable
          placeholder
          style="width: 40%"
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="标签" prop="tagKeyWords">
        <iep-tag-input v-model="ruleForm.tagKeyWords"></iep-tag-input>
      </iep-form-item>
      <iep-form-item label-name="题目">
        <!-- <IepJoditEditor v-model="ruleForm.title" placeholder="请填写题目" :readonly="btnDisabled"></IepJoditEditor> -->
        <div slot="label" class="label_mini" style="line-height: 172px;">题目:</div>
        <el-input
          class="textarea"
          v-model.trim="ruleForm.title"
          :disabled="btnDisabled"
          type="textarea"
          :maxlength="2000"
        ></el-input>
        <div style="margin-left: 10px;">
          <IepUploadAvatar
            v-model="ruleForm.titleUrl"
            :dialogHeight="450"
            :dialogWidth="800"
            :imgTip="true"
            :width="400"
            :height="225"
          ></IepUploadAvatar>
        </div>
      </iep-form-item>
      <template v-if="ruleForm.type == 'RADIO'">
        <el-form-item
          v-for="(option, index) in ruleForm.radioOptions"
          :key="index"
          :prop="'radioOptions.' + index + '.value'"
        >
          <div slot="label" class="label_mini">
            选项{{ chooseOption[index] }}:
            <!-- <el-input
            v-model="option.key"
            :maxlength="1"
            style="width:60px"
            @change="inputChange('radioOptions',index)"
            ></el-input>：-->
          </div>
          <el-input
            v-model="option.value"
            placeholder="请输入选项"
            style="width:86.5%;"
            :readonly="btnDisabled"
          ></el-input>
          <iep-button
            plain
            v-show="index > 0"
            @click="removeRadioOption(option)"
            icon="el-icon-close"
            style="margin-left:10px;"
            v-if="!btnDisabled"
          >移除</iep-button>
          <span v-show="false">{{ruleForm.type}}</span>
          <div style="margin-left: 10px;">
            <IepUploadAvatar
              v-model="option.optionUrl"
              :dialogHeight="800"
              :dialogWidth="800"
              :imgTip="true"
              :width="200"
              :height="200"
            ></IepUploadAvatar>
          </div>
        </el-form-item>
      </template>
      <iep-button
        v-show="clickAdd < 25 && ruleForm.type == 'RADIO'"
        icon="el-icon-plus"
        class="iep-btn-l"
        @click="addRadioOption"
        style="margin:-4px 0 20px 120px;"
        v-if="!btnDisabled"
      >添加选项</iep-button>
      <template v-if="ruleForm.type == 'CHECKBOX'">
        <el-form-item
          v-for="(option, index) in ruleForm.checkboxOptions"
          :key="index"
          :prop="'checkboxOptions.' + index + '.value'"
        >
          <div slot="label" class="label_mini">
            选项{{ chooseOption[index] }}:
            <!-- <el-input
            v-model="option.key"
            style="width:60px"
            :maxlength="1"
            @change="inputChange('checkboxOptions',index)"
            ></el-input>：-->
          </div>
          <el-input
            v-model="option.value"
            placeholder="请输入选项"
            style="width:86.5%;"
            :readonly="btnDisabled"
          ></el-input>
          <iep-button
            plain
            v-show="index > 0"
            @click="removeCheckboxOption(option)"
            icon="el-icon-close"
            style="margin-left:10px;"
            v-if="!btnDisabled"
          >移除</iep-button>
          <span v-show="false">{{ruleForm.type}}</span>
          <div style="margin-left: 10px;">
            <IepUploadAvatar v-model="option.optionUrl"></IepUploadAvatar>
          </div>
        </el-form-item>
      </template>
      <iep-button
        v-show="ruleForm.type == 'CHECKBOX'"
        icon="el-icon-plus"
        class="iep-btn-l"
        @click="addCheckboxOption"
        style="margin:-4px 0 20px 120px;"
        v-if="!btnDisabled"
      >添加选项</iep-button>

      <iep-form-item
        class="item"
        label-name="答案"
        prop="inputRadioAnswer"
        v-if="ruleForm.type == 'RADIO'"
      >
        <el-select
          v-model="ruleForm.inputRadioAnswer"
          clearable
          placeholder="请选择答案"
          :disabled="btnDisabled"
          class="selectItem"
          style="width: 28%"
        >
          <el-option
            v-for="(item, index) in ruleForm.radioOptions"
            :key="index"
            :label="item.key"
            :value="item.key"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item
        class="item"
        label-name="答案"
        prop="inputCheckboxAnswer"
        v-if="ruleForm.type == 'CHECKBOX'"
      >
        <el-select
          multiple
          v-model="ruleForm.inputCheckboxAnswer"
          clearable
          style="width: 28%"
          placeholder="请选择答案"
          :disabled="btnDisabled"
          @change="handleSelectCheckboxAnswer"
          class="selectItem"
        >
          <el-option
            v-for="(item, index) in ruleForm.checkboxOptions"
            :key="index"
            :label="item.key"
            :value="item.key"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item
        class="item"
        label-name="答案"
        prop="inputJudgeAnswer"
        v-if="ruleForm.type == 'CHECKED'"
      >
        <el-select
          v-model="ruleForm.inputJudgeAnswer"
          clearable
          placeholder="请选择答案"
          :disabled="btnDisabled"
          class="selectItem"
          style="width: 28%"
        >
          <el-option
            v-for="(item, index) in judgeStateList"
            :key="index"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </iep-form-item>
      <!-- <iep-form-item
        label-name="答案"
        prop="inputShortAnswer"
        v-if="ruleForm.type == 10 || ruleForm.type == 10000 || ruleForm.type == 10011"
      >
        <el-input
          type="textarea"
          rows="3"
          v-model="ruleForm.inputShortAnswer"
          placeholder="请填写答案"
          style="width:93.5%;"
          :readonly="btnDisabled"
          maxlength="500"
          show-word-limit
        ></el-input>
      </iep-form-item>-->
      <iep-form-item label-name="解析" prop="quesExplain">
        <el-input
          type="textarea"
          rows="3"
          v-model="ruleForm.quesExplain"
          placeholder="请填写解析"
          :readonly="btnDisabled"
          maxlength="2000"
          show-word-limit
        ></el-input>
      </iep-form-item>
      <template v-if="ruleForm.type == 'GAPFILLING'">
        <el-form-item
          v-for="(option, index) in ruleForm.gapfillingOptions"
          :key="index"
          :prop="'gapfillingOptions.' + index + '.value'"
        >
          <!-- 填空题 -->
          <div slot="label" class="label_mini">答案{{ index + 1 }}：</div>
          <el-input
            v-model="option.value"
            placeholder="请输入答案"
            style="width:86.5%;"
            :readonly="btnDisabled"
          ></el-input>
          <iep-button
            plain
            v-show="index > 0"
            @click="removeGapfillingOption(index)"
            icon="el-icon-close"
            style="margin-left:10px;"
            v-if="!btnDisabled"
          >移除</iep-button>
          <span v-show="false">{{ruleForm.type}}</span>
        </el-form-item>
      </template>
      <iep-button
        v-show="ruleForm.type == 'GAPFILLING'"
        icon="el-icon-plus"
        class="iep-btn-l"
        @click="addGapfillingOption"
        style="margin:-4px 0 20px 120px;"
        v-if="!btnDisabled"
      >添加选项</iep-button>
      <el-form-item v-show="ruleForm.type == 'ESSAYQUESTION'">
        <!-- 问答题题 -->
        <iep-form-item slot="label" label-name="答案"></iep-form-item>
        <el-input
          type="textarea"
          v-model="ruleForm.answer"
          placeholder="请输入答案"
          maxlength="1000"
          rows="6"
          show-word-limit
          :readonly="btnDisabled"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- <div align="center" style="margin-top:30px;">
      <iep-button type="primary" @click="submitForm('ruleForm')" style="margin:0 10px;">提交</iep-button>
      <iep-button @click="saveForm('ruleForm')" style="margin:0 10px;">保存</iep-button>
    </div>-->
  </div>
</template>

<script>
import { radioList, checkboxList, chooseOption } from "./option";
export default {
  props: ["postAnswer"],
  data() {
    return {
      btnDisabled: false,
      radioList,
      checkboxList,
      chooseOption,
      clickAdd: 0,
      ruleForm: {
        level: "",
        titleUrl: "",
        tagKeyWords: [],
        type: "",
        answer: "",
        gapfillingOptions: [
          {
            value: "",
          },
        ],
        radioOptions: [
          {
            value: "",
            optionUrl: "",
            key: "A",
          },
        ],
        checkboxOptions: [
          {
            value: "",
            optionUrl: "",
            key: "A",
          },
        ],
        radioOption: [
          {
            id: "",
            value: "",
          },
        ],
        checkboxOption: [
          {
            id: "",
            value: "",
          },
        ],
        judgeOption: [
          {
            id: "",
            value: "",
          },
        ],
        title: "",
        inputRadioAnswer: "",
        inputCheckboxAnswer: [],
        inputJudgeAnswer: "",
        inputShortAnswer: "",
        quesExplain: "",
      },
      rules: {
        level: [{ required: true, message: "请填写难度", trigger: ["blur"] }],
        tagKeyWords: [
          {
            required: true,
            message: "请填写标签",
            trigger: ["change"],
          },
        ],
        title: [{ required: true, message: "请填写题目", trigger: ["blur"] }],
        inputRadioAnswer: [
          { required: true, message: "请填写答案", trigger: ["blur"] },
        ],
        inputCheckboxAnswer: [
          { required: true, message: "请填写答案", trigger: ["blur"] },
        ],
        inputJudgeAnswer: [
          { required: true, message: "请填写答案", trigger: ["blur"] },
        ],
        inputShortAnswer: [
          { required: false, message: "请填写答案", trigger: ["blur"] },
        ],
        type: [{ required: true, message: "请填写类型", trigger: ["blur"] }],
      },
      judgeStateList: [
        { id: "A", label: "正确" },
        { id: "B", label: "错误" },
      ],
    };
  },
  created() {},
  methods: {
    // 判断是否重复的函数
    arrTest(arr, key) {
      const obj = {};
      for (let i = 0; i < arr.length; i++) {
        if (obj[arr[i][key]]) {
          return false;
        } else {
          obj[arr[i][key]] = arr[i];
        }
      }
      return obj;
    },
    // 选项改变
    inputChange(arr, val) {
      if (/^[A-Za-z]+$/.test(this.ruleForm[arr][val].key)) {
        if (/^[a-z]+$/.test(this.ruleForm[arr][val].key)) {
          this.ruleForm[arr][val].key = this.ruleForm[arr][
            val
          ].key.toUpperCase();
        }
        // 选项改变判断他是否重复 提示用户
        if (!this.arrTest(this.ruleForm[arr], "key")) {
          this.$message.error("选项值重复!");
        }
      } else if (this.ruleForm[arr][val].key) {
        //选项让用户只输入A-Z的字母
        this.$message.error("请输入A-Z的大写字母!");
      }
      if (arr === "radioOptions") {
        // 单选的话如果修改了选中的那个选项 则清空
        const status = this.ruleForm[arr].some((element) => {
          return element.key === this.ruleForm.inputRadioAnswer;
        });
        if (!status) {
          this.ruleForm.inputRadioAnswer = "";
        }
      } else {
        // 多选的时候修改了选项如果有选中 则吧选中的去掉
        let status = false;
        let indexs = "";
        this.ruleForm.inputCheckboxAnswer.forEach((element, index) => {
          status = this.ruleForm[arr].some((ans) => {
            return element === ans.key;
          });
          if (!status) {
            indexs = index;
          }
        });
        if (indexs || indexs === 0) {
          this.ruleForm.inputCheckboxAnswer.splice(indexs, 1);
        }
      }
    },
    /**
     * 保存
     */
    // saveForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       return false
    //     }
    //   })
    // },
    /**
     * 复选答案正排序
     */
    handleSelectCheckboxAnswer() {
      this.ruleForm.inputCheckboxAnswer = this.ruleForm.inputCheckboxAnswer.sort();
    },
    /**
     * 禁用输入及选择
     */
    inputDisabled() {
      this.btnDisabled = true;
    },
    /**
     * 不禁用输入及选择
     */
    inputUndisabled() {
      this.btnDisabled = false;
    },
    /**
     * 移除验证
     */
    clearValidate() {
      this.$refs.ruleForm.clearValidate();
      // this.$refs.ruleForm.clearValidate(['inputRadioAnswer', 'inputCheckboxAnswer', 'inputJudgeAnswer'])
    },
    /**
     * 提交
     */
    submitForm() {
      let flag = false;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.ruleForm.title && !this.ruleForm.titleUrl) {
            this.$message.error("请输入或上传题目!");
            return false;
          }
          if (this.ruleForm.type == "RADIO") {
            // const radioOptions = this.ruleForm.radioOptions;
            if (!this.arrTest(this.ruleForm.radioOptions, "key")) {
              this.$message.error("选项值重复!");
              return false;
            }
            this.ruleForm.options = JSON.stringify(
              this.ruleForm.radioOptions,
            ).toString();
            this.ruleForm.answer = this.ruleForm.inputRadioAnswer;
            if (this.ruleForm.inputRadioAnswer.length == 0) {
              this.$message.error("请输入答案！");
              flag = false;
            } else flag = true;
          }
          if (this.ruleForm.type == "CHECKBOX") {
            this.ruleForm.options = JSON.stringify(
              this.ruleForm.checkboxOptions,
            ).toString();
            this.ruleForm.answer = JSON.stringify(
              this.ruleForm.inputCheckboxAnswer,
            ).toString();
            if (this.ruleForm.inputCheckboxAnswer.length == 0) {
              this.$message.error("请输入答案！");
              flag = false;
            } else flag = true;
          }
          if (this.ruleForm.type == "CHECKED") {
            this.ruleForm.answer = this.ruleForm.inputJudgeAnswer;
            if (this.ruleForm.inputJudgeAnswer.length == 0) {
              this.$message.error("请输入答案！");
              flag = false;
            } else flag = true;
          }
          if (this.ruleForm.type == "GAPFILLING") {
            const arr = [];
            this.ruleForm.options = [];
            this.ruleForm.gapfillingOptions.forEach((element, index) => {
              arr.push(element.value);
              this.ruleForm.options.push({
                key: chooseOption[index],
                value: "",
              });
            });
            // 转化成json字符串
            this.ruleForm.options = JSON.stringify(this.ruleForm.options);
            this.ruleForm.answer = arr.join("|");
            if (this.ruleForm.answer.length === 0) {
              this.$message.error("至少有一个答案！");
              flag = false;
            } else {
              flag = true;
            }
          }
          if (this.ruleForm.type == "ESSAYQUESTION") {
            if (this.ruleForm.answer) {
              flag = true;
            } else {
              this.$message.error("请填写答案！");
              flag = false;
            }
          }
          if (
            this.ruleForm.type == 10 ||
            this.ruleForm.type == 10000 ||
            this.ruleForm.type == 10011
          ) {
            this.ruleForm.answer = this.ruleForm.inputShortAnswer;
            flag = true;
            // if (this.ruleForm.inputShortAnswer.length == 0) {
            //   this.$message.error('请输入答案！')
            //   flag = false
            // }
            // else
            //   flag = true
          }
          // flag = true
        } else {
          flag = false;
        }
      });
      return flag;
    },
    /**
     * 添加单选选项
     */
    addRadioOption() {
      if (this.ruleForm.radioOptions.length === 8) {
        this.$message.error("选项最多8个!");
        return false;
      }
      this.ruleForm.radioOptions.push({
        value: "",
        optionUrl: "",
        key: "",
        // key: Date.now(),
      });
      this.keyArrangement(this.ruleForm.radioOptions);
      this.clickAdd++;
      // if (this.ruleForm.type == "RADIO") {
      //   this.ruleForm.radioOption.push({
      //     id: "",
      //     value: "",
      //   });
      // }
    },
    /**
     * 添加复选选项
     */
    addCheckboxOption() {
      if (this.ruleForm.checkboxOptions.length === 8) {
        this.$message.error("选项最多8个!");
        return false;
      }
      this.ruleForm.checkboxOptions.push({
        value: "",
        optionUrl: "",
        key: "",
      });
      this.keyArrangement(this.ruleForm.checkboxOptions);
      this.clickAdd++;
      // if (this.ruleForm.type == "CHECKBOX") {
      //   this.ruleForm.checkboxOption.push({
      //     id: "",
      //     value: "",
      //   });
      //   // this.ruleForm.inputCheckboxAnswer = []
      // }
    },
    addGapfillingOption() {
      this.ruleForm.gapfillingOptions.push({
        value: "",
      });
    },
    // 用来整理key
    keyArrangement(val) {
      val.forEach((element, index) => {
        element.key = chooseOption[index];
      });
    },
    /**
     * 移除单选选项
     */
    removeRadioOption(item) {
      this.$confirm("确定要移除该选项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "移除成功!",
          });
          const index = this.ruleForm.radioOptions.indexOf(item);
          const radioIndex = this.ruleForm.inputRadioAnswer.indexOf(item.key);
          if (index != 0) {
            this.ruleForm.radioOptions.splice(index, 1);
          }
          this.keyArrangement(this.ruleForm.radioOptions);
          if (radioIndex != -1) {
            this.ruleForm.inputRadioAnswer = "";
          }
          this.clickAdd--;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除!",
          });
        });
    },
    /**
     * 移除复选选项
     */
    removeCheckboxOption(item) {
      this.$confirm("确定要移除该选项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "移除成功!",
          });
          const index = this.ruleForm.checkboxOptions.indexOf(item);
          const checkboxIndex = this.ruleForm.inputCheckboxAnswer.indexOf(
            item.key,
          );
          if (index != 0) {
            this.ruleForm.checkboxOptions.splice(index, 1);
          }
          this.keyArrangement(this.ruleForm.checkboxOptions);
          this.ruleForm.inputCheckboxAnswer.splice(checkboxIndex, 1);
          this.clickAdd--;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除!",
          });
        });
    },
    // 移除填空题地答案
    removeGapfillingOption(index) {
      this.$confirm("确定要移除该答案？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.ruleForm.gapfillingOptions.splice(index, 1);
          this.$message({
            type: "success",
            message: "移除成功!",
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item__error {
  padding: 4px 4px 0 25px !important;
}
// .single {
//   .el-form-item:nth-child(2),
//   .el-form-item:nth-child(3),
//   .el-form-item:nth-child(4),
//   .el-form-item:nth-child(5),
//   .el-form-item:nth-child(6),
//   .el-form-item:nth-child(7),
//   .el-form-item:nth-child(8) {
//     margin-top: -5px;
//   }
//   .iep-button {
//     margin-top: -5px;
//   }
// }
</style>
<style lang="scss" scoped>
.item >>> .el-input .el-select__caret {
  line-height: 32px;
  height: 32px;
}
.el-textarea .el-input__count {
  background: rgba($color: #000000, $alpha: 0);
  bottom: -8px;
  right: 22px;
}
.label_mini {
  input {
    width: 60px;
  }
  .el-input--mini {
    width: 60px;
  }
}
.textarea ::v-deep .el-textarea__inner {
  min-height: 290px !important;
}
</style>
