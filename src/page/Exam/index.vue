<template>
  <div class="allScrean">
    <el-row v-if="!endFlag" v-loading="loading">
      <el-col :span="5">
        <div class="block">
          <div class="title">答题卡</div>
          <div class="list" v-if="singleCard.examAnswerVOList.length>0">
            <div class="smallTitle">
              单选题
              <span>（共{{singleCard.number}}题，合计{{singleCard.total}}分）</span>
            </div>
            <div class="draw">
              <div
                class="drawItem"
                v-for="item in singleCard.examAnswerVOList"
                :key="item.key"
                @click="changeIndex(item.questionNum)"
              >
                <el-button
                  class="circle"
                  :type="item.isChecked ? 'success' : 'default'"
                  circle
                >{{item.questionNum}}</el-button>
              </div>
            </div>
          </div>
          <div class="list" v-if="multipleCard.examAnswerVOList.length>0">
            <div class="smallTitle">
              多选题
              <span>（共{{multipleCard.number}}题，合计{{multipleCard.total}}分）</span>
            </div>
            <div class="draw">
              <div
                class="drawItem"
                v-for="item in multipleCard.examAnswerVOList"
                :key="item.key"
                @click="changeIndex(item.questionNum)"
              >
                <el-button
                  class="circle"
                  :type="item.isChecked ? 'success' : 'default'"
                  circle
                >{{item.questionNum}}</el-button>
              </div>
            </div>
          </div>
          <div class="list" v-if="judgleCard.examAnswerVOList.length>0">
            <div class="smallTitle">
              判断题
              <span>（共{{judgleCard.number}}题，合计{{judgleCard.total}}分）</span>
            </div>
            <div class="draw">
              <div
                class="drawItem"
                v-for="item in judgleCard.examAnswerVOList"
                :key="item.key"
                @click="changeIndex(item.questionNum)"
              >
                <el-button
                  class="circle"
                  :type="item.isChecked ? 'success' : 'default'"
                  circle
                >{{item.questionNum}}</el-button>
              </div>
            </div>
          </div>
          <div class="list" v-if="fillCard.examAnswerVOList.length>0">
            <div class="smallTitle">
              填空题
              <span>（共{{fillCard.number}}题，合计{{fillCard.total}}分）</span>
            </div>
            <div class="draw">
              <div
                class="drawItem"
                v-for="item in fillCard.examAnswerVOList"
                :key="item.index"
                @click="changeIndex(item.questionNum)"
              >
                <el-button
                  class="circle"
                  :type="item.isChecked ? 'success' : 'default'"
                  circle
                >{{item.questionNum}}</el-button>
              </div>
            </div>
          </div>
          <div class="list" v-if="qaCard.examAnswerVOList.length>0">
            <div class="smallTitle">
              问答题
              <span>（共{{qaCard.number}}题，合计{{qaCard.total}}分）</span>
            </div>
            <div class="draw">
              <div
                class="drawItem"
                v-for="item in qaCard.examAnswerVOList"
                :key="item.index"
                @click="changeIndex(item.questionNum)"
              >
                <el-button
                  class="circle"
                  :type="item.isChecked ? 'success' : 'default'"
                  circle
                >{{item.questionNum}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="block">
          <answer-area
            ref="answerArea"
            :subject="currentData"
            :disabled="disabled"
            @onNext="next"
            @onPrev="prev"
            @onSet="setAnswer"
          ></answer-area>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="block">
          <answer-time
            ref="answerTime"
            :examInfo="examInfo"
            :disabled="disabled"
            @saveAndOut="emitOut"
            @submit="submit"
            @out="emitOut"
            @result="emitResult"
            @endTime="endTime"
          ></answer-time>
        </div>
      </el-col>
    </el-row>
    <end-page :data="endData" :backUrl="backUrl" v-show="endFlag" @review="handleReview"></end-page>
    <DialogReport></DialogReport>
  </div>
</template>
<script>
import { answerExam, editExam } from "@/api/qms/exam_answer";
import answerArea from "@/views/exam/examList/Page/Components/answerArea";
import answerTime from "@/views/exam/examList/Page/Components/answerTime";
import { answerHandle, paperHand } from "@/api/qms/exam_answer";
import {
  getTestResultById,
  checkState,
} from "@/api/qms/test_questions_library";
import EndPage from "./Components/end";
import DialogReport from "@/layouts/Components/Dialog/Report.vue";
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => (vm.backUrl = from));
  },
  props: {
    // disabled: {
    //   type: Boolean,
    //   default: false,
    // },
    id: {
      type: [String, Number],
      required: true,
    },
    state: {
      type: String,
      default: "create",
    },
    safePassword: {
      type: String,
      default: "",
    },
    situationId: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      backUrl: {},
      selfAnswerData: { examAnswerVOList: [] },
      currentIndex: 0,
      answerData: {
        examAnswerVOList: [],
      },
      endFlag: false,
      endData: {},
      disabled: false,
      loading: false,
    };
  },
  watch: {
    // "$route.params": function (n, o) {
    //   console.log(n.state, o.state);
    //   if (n.state === "create" && o.state === "review") {
    //     this.load();
    //   }
    // },
    answerData: {
      immediate: true,
      handler(val) {
        if (val) {
          this.selfAnswerData = { ...val };
          // console.log(this.selfAnswerData);
        }
      },
    },
  },
  components: {
    answerArea,
    answerTime,
    EndPage,
    DialogReport,
  },
  created() {
    this.load();
    // this.selfAnswerData = { ...this.answerData };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    out() {
      this.endFlag = true;
      this.$router.replace({
        params: {
          state: "review",
        },
      });
    },
    emitResult() {
      this.handleCheckState();
    },
    handleReview() {
      this.endFlag = false;
      this.load();
    },
    async handleCheckState() {
      const { data } = await checkState({ manageId: this.id }, 2);
      console.log(data);
      if ([1, 2].includes(data.code)) {
        this.handleEndExam(data);
      }
    },
    async load() {
      if (this.state === "continue") {
        const { data } = await editExam(this.id);
        this.answerData = data;
        if (data.code) {
          this.handleEndExam(data);
        }
      } else if (this.state === "review") {
        this.disabled = true;
        const { data } = await getTestResultById(this.id);
        this.answerData = data;
      } else {
        const { data } = await answerExam({
          examinationId: this.id,
          pwd: this.safePassword,
          situationId: this.situationId,
        });
        if (data) {
          this.$router.replace({
            params: {
              id: data.id + "",
            },
          });
          this.answerData = data;
        } else {
          // 请求失败包括密码错误返回
          this.$router.go(-1);
        }
      }
    },
    changeIndex(index) {
      this.$refs["answerArea"].getAnswer();
      this.currentIndex = index - 1;
    },
    emitOut() {
      if (!this.disabled) {
        this.$confirm("你将退出考试，请在48小时内完成答卷。", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$refs["answerArea"].getAnswer();
          this.back();
        });
      } else {
        this.back();
      }
    },
    endTime() {
      this.$message({
        type: "warning",
        message: "考试时间已到，将自动交卷",
      });
      this.$refs["answerArea"].getAnswer();
      paperHand({
        examId: this.selfAnswerData.id,
        remainingTime: this.$refs["answerTime"].getSurplusTime(),
      }).then(({ data }) => {
        this.handleEndExam(data);
      });
    },
    handleEndExam(data) {
      this.endData = data;
      this.out();
    },
    submit() {
      this.$confirm("是否确认交卷?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.loading = true;
        this.$refs["answerArea"].getAnswer(() => {
          paperHand({
            examId: this.selfAnswerData.id,
            remainingTime: this.$refs["answerTime"].getSurplusTime(),
          }).then(({ data }) => {
            this.loading = false;
            this.handleEndExam(data);
          });
        });
      });
    },
    setAnswer(val, isSub = false) {
      this.$set(
        this.selfAnswerData.examAnswerVOList[this.currentIndex],
        "userAnswer",
        val,
      );
      if (!this.disabled) {
        const postData = {
          questionNum: this.currentData.questionNum,
          examId: this.selfAnswerData.id,
          remainingTime: this.$refs["answerTime"].getSurplusTime(),
          userAnswer: val,
        };
        if (!isSub) {
          postData.questionNum = this.currentData.questionNum;
        }
        answerHandle(postData).then(() => {
          if (isSub) {
            isSub();
          }
        });
      }
    },
    next(val) {
      // console.log(this.$refs["answerTime"].getSurplusTime());
      // this.$refs['answerTime'].getTime();
      this.setAnswer(val);
      if (this.currentIndex + 1 < this.selfAnswerData.examAnswerVOList.length) {
        this.currentIndex++;
      }
    },
    prev(val) {
      this.setAnswer(val);
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },

  computed: {
    currentData() {
      const obj =
        (this.selfAnswerData.examAnswerVOList || [])[this.currentIndex] || {};
      obj.title = this.selfAnswerData.examName; //标题赋值
      obj.total = this.selfAnswerData.examAnswerVOList.length; //总数赋值
      obj.msg = this.selfAnswerData.msg; //考试说明
      return obj;
    },
    examInfo() {
      let answered = 0;
      for (const item of this.selfAnswerData.examAnswerVOList || []) {
        if (item.userAnswer) {
          answered++;
        }
      }
      return {
        total: (this.selfAnswerData.examAnswerVOList || {}).length,
        time: this.selfAnswerData.remainingTime,
        answered: answered,
        allowSave: this.answerData.allowSave,
      };
    },
    singleCard() {
      let num = 0;
      let total = 0;
      if (this.selfAnswerData.quesType) {
        for (const item of this.selfAnswerData.quesType) {
          if (item.value === "RADIO") {
            num = item.end - item.start;
            total = item.total;
          }
        }
      }

      const obj = {
        number: num + 1,
        total: total,
        examAnswerVOList: [],
      };
      if (this.selfAnswerData.examAnswerVOList) {
        for (const item of this.selfAnswerData.examAnswerVOList) {
          if (item.examQuestionVO.type === "RADIO") {
            obj.examAnswerVOList.push({
              ...item,
              isChecked: item.userAnswer ? true : false,
            });
          }
        }
      }
      return obj;
    },
    multipleCard() {
      let num = 0;
      let total = 0;
      if (this.selfAnswerData.quesType) {
        for (const item of this.selfAnswerData.quesType) {
          if (item.value === "CHECKBOX") {
            num = item.end - item.start;
            total = item.total;
          }
        }
      }

      const obj = {
        number: num + 1,
        total: total,
        examAnswerVOList: [],
      };
      if (this.selfAnswerData.examAnswerVOList) {
        for (const item of this.selfAnswerData.examAnswerVOList) {
          if (item.examQuestionVO.type === "CHECKBOX") {
            obj.examAnswerVOList.push({
              ...item,
              isChecked:
                item.userAnswer && item.userAnswer != "[]" ? true : false,
            });
          }
        }
      }
      return obj;
    },
    judgleCard() {
      let num = 0;
      let total = 0;
      if (this.selfAnswerData.quesType) {
        for (const item of this.selfAnswerData.quesType) {
          if (item.value === "CHECKED") {
            num = item.end - item.start;
            total = item.total;
          }
        }
      }

      const obj = {
        number: num + 1,
        total: total,
        examAnswerVOList: [],
      };
      if (this.selfAnswerData.examAnswerVOList) {
        for (const item of this.selfAnswerData.examAnswerVOList) {
          if (item.examQuestionVO.type === "CHECKED") {
            obj.examAnswerVOList.push({
              ...item,
              isChecked: item.userAnswer ? true : false,
            });
          }
        }
      }
      return obj;
    },
    fillCard() {
      let num = 0;
      let total = 0;
      if (this.selfAnswerData.quesType) {
        for (const item of this.selfAnswerData.quesType) {
          if (item.value === "GAPFILLING") {
            num = item.end - item.start;
            total = item.total;
          }
        }
      }

      const obj = {
        number: num + 1,
        total: total,
        examAnswerVOList: [],
      };
      if (this.selfAnswerData.examAnswerVOList) {
        for (const item of this.selfAnswerData.examAnswerVOList) {
          if (item.examQuestionVO.type === "GAPFILLING") {
            obj.examAnswerVOList.push({
              ...item,
              isChecked:
                item.userAnswer && item.userAnswer != '[""]' ? true : false,
            });
          }
        }
      }
      return obj;
    },
    qaCard() {
      let num = 0;
      let total = 0;
      if (this.selfAnswerData.quesType) {
        for (const item of this.selfAnswerData.quesType) {
          if (item.value === "ESSAYQUESTION") {
            num = item.end - item.start;
            total = item.total;
          }
        }
      }

      const obj = {
        number: num + 1,
        total: total,
        examAnswerVOList: [],
      };
      if (this.selfAnswerData.examAnswerVOList) {
        for (const item of this.selfAnswerData.examAnswerVOList) {
          if (item.examQuestionVO.type === "ESSAYQUESTION") {
            obj.examAnswerVOList.push({
              ...item,
              isChecked: item.userAnswer ? true : false,
            });
          }
        }
      }
      return obj;
    },
    // 根据路由params的state区分请求方法
  },
};
</script>
<style lang="scss" scoped>
.clearfix {
  *zoom: 1;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
}
.allScrean {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
  z-index: 999;
  .block {
    border: 1px solid #eff0f1;
    border-radius: 10px;
    margin: 10px;
    padding: 20px;
    height: 90vh;
    overflow: auto;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      padding: 10px 0;
    }
    .list {
      margin-top: 10px;
      .smallTitle {
        font-size: 14px;
        color: $--color-text-regular;
        span {
          font-size: 14px;
          color: $--color-text-secondary;
        }
      }
      .draw {
        display: grid;
        grid-template-columns: 26fr 26fr 26fr 26fr 26fr;
        gap: 10px 16px;
        margin-top: 20px;
        .drawItem {
          text-align: center;
          .circle {
            border-radius: 50%;
            width: 26px;
            height: 26px;
            line-height: 8px;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
