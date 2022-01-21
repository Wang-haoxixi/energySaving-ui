<template>
  <div class="allScrean">
    <el-row v-loading="loading">
      <el-col :span="6">
        <div class="block">
          <div class="title">答题卡</div>
          <div class="list" v-if="singleCard.examAnswerVOList.length>0">
            <div class="smallTitle">
              单选题
              <span>（共{{singleCard.number}}题，合计{{singleCard.total || 0}}分）</span>
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
              <span>（共{{multipleCard.number}}题，合计{{multipleCard.total || 0}}分）</span>
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
              <span>（共{{judgleCard.number}}题，合计{{judgleCard.total || 0}}分）</span>
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
              <span>（共{{fillCard.number}}题，合计{{fillCard.total || 0}}分）</span>
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
              <span>（共{{qaCard.number}}题，合计{{qaCard.total || 0}}分）</span>
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
      <el-col :span="18">
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
    </el-row>
  </div>
</template>
<script>
import answerArea from "@/views/exam/examList/Page/Components/answerArea";
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {
          examAnswerVOList: [],
        };
      },
    },
    state: {
      type: String,
      default: "create",
    },
    safePassword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      backUrl: {},
      selfAnswerData: { examAnswerVOList: [] },
      currentIndex: 0,
      endData: {},
      disabled: true,
      loading: false,
    };
  },
  components: { answerArea },
  methods: {
    setAnswer(val) {
      this.$set(
        this.selfAnswerData.examAnswerVOList[this.currentIndex],
        "userAnswer",
        val,
      );
    },
    changeIndex(index) {
      console.log("index: ", index);
      this.$refs["answerArea"].getAnswer();
      this.currentIndex = index - 1;
    },
    next(val) {
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
    answerData() {
      return { ...this.data };
    },
    currentData() {
      const obj =
        (this.selfAnswerData.examAnswerVOList || [])[this.currentIndex] || {};
      obj.title = this.selfAnswerData.examName; //标题赋值
      obj.total = this.selfAnswerData.examAnswerVOList.length; //总数赋值
      obj.msg = this.selfAnswerData.msg; //考试说明
      return obj;
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
      console.log("obj: ", obj);
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
                item.userAnswer && item.userAnswer != "[]" ? true : false,
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
  },
  watch: {
    answerData: {
      immediate: true,
      handler(val) {
        if (val) {
          console.log("val: ", val);
          this.selfAnswerData = { ...val };
        }
      },
    },
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
  background: white;
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
