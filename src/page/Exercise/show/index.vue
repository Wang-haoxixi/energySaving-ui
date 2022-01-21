<template>
  <div class="box" v-if="show">
    <el-card class="box-card left-box" :body-style="{ padding: '0px' }" shadow="never">
      <div class="item">
        <div class="title">答题卡</div>
        <div v-if="singleItems.length !== 0">
          <div
            class="opt-title"
          >单选题（共{{ radio[isShow('RADIO')].end - radio[isShow('RADIO')].start + 1 }}题，合计{{ radio[isShow('RADIO')].total }}分）</div>
          <div class="opt-answer">
            <a
              class="choices"
              v-for="(item,index) in singleItems"
              :key="index"
              :href="'#radio_'+(item.questionNum)"
              :class="!item.userAnswerJson ? 'kb' : item.score != 0 ? '' : 'error'"
            >{{item.questionNum}}</a>
          </div>
        </div>
        <div v-if="mutipleItems.length !== 0">
          <div
            class="opt-title"
          >多选题（共{{radio[isShow('CHECKBOX')].end - radio[isShow('CHECKBOX')].start + 1}}题，合计{{radio[isShow('CHECKBOX')].total}}分）</div>
          <div class="opt-answer">
            <a
              class="choices"
              v-for="(item,index) in mutipleItems"
              :key="index"
              :href="'#radio_'+(item.questionNum)"
              :class="!item.userAnswerJson ? 'kb' :  item.score != 0 ? '' : 'error'"
            >{{item.questionNum}}</a>
          </div>
        </div>
        <div v-if="judgeItems.length !== 0">
          <div
            class="opt-title"
          >判断题（共{{radio[isShow('CHECKED')].end - radio[isShow('CHECKED')].start + 1}}题，合计{{radio[isShow('CHECKED')].total}}分）</div>
          <div class="opt-answer">
            <a
              class="choices"
              v-for="(item,index) in judgeItems"
              :key="index"
              :href="'#radio_'+(item.questionNum)"
              :class="!item.userAnswerJson ? 'kb' :  item.score != 0 ? '' : 'error'"
            >{{item.questionNum}}</a>
          </div>
        </div>
        <div v-if="fillBlankItems.length !== 0">
          <div
            class="opt-title"
          >填空题（共{{radio[isShow('GAPFILLING')].end - radio[isShow('GAPFILLING')].start + 1}}题，合计{{radio[isShow('GAPFILLING')].total}}分）</div>
          <div class="opt-answer">
            <a
              class="choices"
              v-for="(item,index) in fillBlankItems"
              :key="index"
              :href="'#radio_'+(item.questionNum)"
              :class="!item.userAnswerJson ? 'kb' : item.score != 0 ? '' : 'error'"
            >{{item.questionNum}}</a>
          </div>
        </div>
        <div v-if="qaItems.length !== 0">
          <div
            class="opt-title"
          >问答题（共{{radio[isShow('ESSAYQUESTION')].end - radio[isShow('ESSAYQUESTION')].start + 1}}题，合计{{radio[isShow('ESSAYQUESTION')].total}}分）</div>
          <div class="opt-answer">
            <a
              class="choices"
              v-for="(item,index) in qaItems"
              :key="index"
              :href="'#radio_'+(item.questionNum)"
              :class="!item.userAnswerJson ? 'kb' : item.score != 0 ? '' : 'error'"
            >{{item.questionNum}}</a>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card right-box" :body-style="{ padding: '0px' }" shadow="never">
      <div class="paper-head">
        <el-button class="returnBtn" @click="handleGoBack()">返回</el-button>
        <div class="paper-title" style="margin-bottom:15px;">{{title}}</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="getRowClass"
          header-align="center"
        >
          <el-table-column prop="rate" label="得分项" width="180"></el-table-column>
          <el-table-column prop="radio" label="单选题"></el-table-column>
          <el-table-column prop="checkbox" label="多选题"></el-table-column>
          <el-table-column prop="checked" label="判断题"></el-table-column>
          <el-table-column prop="fillBlank" label="填空题"></el-table-column>
          <el-table-column prop="qa" label="问答题"></el-table-column>
        </el-table>
        <div class="questionType" v-if="isShow('RADIO') !== false">
          <div class="question-title">
            <span class="q_type">
              <span class="q_title">一、单选题</span>
              <span
                class="q_score"
              >({{radio[isShow('RADIO')].end - radio[isShow('RADIO')].start + 1}}题，共{{radio[isShow('RADIO')].total}}分)</span>
            </span>
          </div>
          <div class="questionList">
            <div
              class="qItem"
              v-for="(item,index) of singleItems"
              :key="index"
              :id="'radio_'+(item.questionNum)"
            >
              <single :itemData="item"></single>
            </div>
          </div>
        </div>
        <div class="questionType" v-if="isShow('CHECKBOX') !== false">
          <div class="question-title">
            <span class="q_type">
              <span class="q_title">二、多选题</span>
              <span
                class="q_score"
              >({{radio[isShow('CHECKBOX')].end - radio[isShow('CHECKBOX')].start + 1}}题，共{{radio[isShow('CHECKBOX')].total}}分)</span>
            </span>
          </div>
          <div class="questionList">
            <div class="questionList">
              <div
                class="qItem"
                v-for="(item,index) of mutipleItems"
                :key="index"
                :id="'radio_'+(item.questionNum)"
              >
                <mutiple :itemData="item"></mutiple>
              </div>
            </div>
          </div>
        </div>
        <div class="questionType" v-if="isShow('CHECKED') !== false">
          <div class="question-title">
            <span class="q_type">
              <span class="q_title">三、判断题</span>
              <span
                class="q_score"
              >({{radio[isShow('CHECKED')].end - radio[isShow('CHECKED')].start + 1}}题，共{{radio[isShow('CHECKED')].total}}分)</span>
            </span>
          </div>
          <div class="questionList">
            <div class="questionList">
              <div
                class="qItem"
                v-for="(item,index) of judgeItems"
                :key="index"
                :id="'radio_'+(item.questionNum)"
              >
                <judge :itemData="item"></judge>
              </div>
            </div>
          </div>
        </div>
        <div class="questionType" v-if="isShow('GAPFILLING') !== false">
          <div class="question-title">
            <span class="q_type">
              <span class="q_title">四、填空题</span>
              <span
                class="q_score"
              >({{radio[isShow('GAPFILLING')].end - radio[isShow('GAPFILLING')].start + 1}}题，共{{radio[isShow('GAPFILLING')].total}}分)</span>
            </span>
          </div>
          <div class="questionList">
            <div class="questionList">
              <div
                class="qItem"
                v-for="(item,index) of fillBlankItems"
                :key="index"
                :id="'radio_'+(item.questionNum)"
              >
                <fillBlank :itemData="item"></fillBlank>
              </div>
            </div>
          </div>
        </div>
        <div class="questionType" v-if="isShow('ESSAYQUESTION') !== false">
          <div class="question-title">
            <span class="q_type">
              <span class="q_title">五、问答题</span>
              <span
                class="q_score"
              >({{radio[isShow('ESSAYQUESTION')].end - radio[isShow('ESSAYQUESTION')].start + 1}}题，共{{radio[isShow('ESSAYQUESTION')].total}}分)</span>
            </span>
          </div>
          <div class="questionList">
            <div class="questionList">
              <div
                class="qItem"
                v-for="(item,index) of qaItems"
                :key="index"
                :id="'radio_'+(item.questionNum)"
              >
                <qa :itemData="item"></qa>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import single from "./items/single";
import judge from "./items/judge";
import mutiple from "./items/mutiple";
import fillBlank from "./items/fillBlank";
import qa from "./items/qa";
import { getExeCheckPaperById } from "@/api/qms/exam_exercise_answer";
let backUrl = "";
export default {
  beforeRouteEnter(to, from, next) {
    next();
    backUrl = from.fullPath;
  },
  components: {
    single,
    judge,
    mutiple,
    fillBlank,
    qa,
  },
  data() {
    return {
      title: "",
      type: "",
      formRequestFn: () => {},
      radio: {},
      singleItems: [],
      mutipleItems: [],
      judgeItems: [],
      fillBlankItems: [],
      qaItems: [],
      tableData: [
        {
          rate: "试题分数",
          radio: 0,
          checkbox: 0,
          checked: 0,
          fillBlank: 0,
          qa: 0,
        },
        {
          rate: "得分",
          radio: 0,
          checkbox: 0,
          checked: 0,
          fillBlank: 0,
          qa: 0,
        },
      ],
      // radioMap: [],
      // checkboxMap: [],
      // checkedMap: [],
      result: 0,
      show: false,
    };
  },
  created() {
    this.loadTestResult();
  },
  methods: {
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background:#F2F4F5;color:#333;";
      } else {
        return "";
      }
    },
    handleGoBack() {
      if (backUrl) {
        this.$router.replace({
          path: backUrl,
        });
      } else {
        this.$router.go(-1);
      }
    },
    loadTestResult() {
      const id = this.$route.params.id;
      this.type = this.$route.query.type;
      // if (this.type && "admin" === this.type) {
      // this.formRequestFn = getTestResultByAdmin;
      // } else {
      this.formRequestFn = getExeCheckPaperById;
      // }
      this.formRequestFn(id).then((res) => {
        this.title = res.data.examName;
        this.result = res.data.score;
        // 表格列表 然后有可能存在单选多选判断的其中一种 需要分开判断
        res.data.quesType.forEach((element) => {
          if (element.value === "RADIO") {
            this.tableData[0].radio = element.total;
            this.tableData[1].radio = element.score;
          } else if (element.value === "CHECKBOX") {
            this.tableData[0].checkbox = element.total;
            this.tableData[1].checkbox = element.score;
          } else if (element.value === "CHECKED") {
            this.tableData[0].checked = element.total;
            this.tableData[1].checked = element.score;
          } else if (element.value === "GAPFILLING") {
            this.tableData[0].fillBlank = element.total;
            this.tableData[1].fillBlank = element.score;
          } else if (element.value === "ESSAYQUESTION") {
            this.tableData[0].qa = element.total;
            this.tableData[1].qa = element.score;
          }
        });
        this.radio = res.data.quesType;
        // 循环分类 吧3类分开 分别进行展示
        res.data.examAnswerVOList.forEach((chil) => {
          if (chil.examQuestionVO.type === "RADIO") {
            this.singleItems.push(chil);
          } else if (chil.examQuestionVO.type === "CHECKBOX") {
            this.mutipleItems.push(chil);
          } else if (chil.examQuestionVO.type === "CHECKED") {
            this.judgeItems.push(chil);
          } else if (chil.examQuestionVO.type === "GAPFILLING") {
            this.fillBlankItems.push(chil);
          } else if (chil.examQuestionVO.type === "ESSAYQUESTION") {
            this.qaItems.push(chil);
          }
        });
        this.show = true;
      });
    },
    // 用来控制显影  循环没有单选则隐藏单选
    isShow(val) {
      let data = false;
      this.radio.forEach((element, index) => {
        if (element.value === val) {
          data = index;
        }
      });
      return data;
    },
  },
};
</script>
<style scoped lang="scss">
.box {
  display: flex;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  .left-box {
    width: 200px;
    margin-right: 25px;
    padding: 20px;
    font-size: 14px;
    color: #333;
    line-height: 28px;
    height: 90vh;
    overflow: auto;
    .item {
      display: inline-block;
      &:nth-child(1) {
        padding-top: 0;
      }
      .title {
        margin-bottom: 15px;
        font-size: 18px;
        color: #000;
      }
      .opt-title {
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #eee;
        color: #666;
      }
      .opt-answer {
        display: flex;
        margin-bottom: 15px;
        flex-wrap: wrap;
        justify-content: flex-start;
        .choices {
          margin: 2px 3px 0px 0px;
          cursor: pointer;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          line-height: 32px;
          font-size: 12px;
          text-align: center;
          box-sizing: border-box;
          transition: 0.1s;
          font-weight: 500;
          border: 1px solid;
          color: #fff;
          background: $--color-third;
          border-color: $--color-third;
          text-decoration: none;
          transition: 0.3s;
          &:hover {
            opacity: 0.8;
          }
          &.error {
            // color: $--color-primary;
            background: $--color-primary;
            border-color: $--color-primary;
          }
          &.kb {
            // color: $--color-primary;
            background: white;
            border-color: $--color-input-regular;
            color: black;
          }
        }
        .text {
          color: #999;
          background: #fff;
          border-color: #999;
        }
      }
    }
  }
  .right-box {
    overflow: auto;
    flex: 1;
    border: none;
    padding: 30px 20px;
    &:hover {
      box-shadow: none;
    }
    .paper-head {
      text-align: center;
      .returnBtn {
        float: right;
      }
      .paper-title {
        font-size: 22px;
        padding-top: 42px;
      }
    }
    .questionType {
      text-align: left;
      .q_type {
        display: block;
        margin-bottom: 15px;
      }
      .q_title {
        font-size: 18px;
        color: #333;
        font-weight: 700;
        margin-right: 15px;
      }
      .q_score {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
}
.qItem {
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
.question-title {
  margin-top: 20px;
  border-bottom: 1px solid $--border-color;
}
</style>
