<template>
  <div>
    <iep-basic-container>
      <div class="judge-score-wrap">
        <div class="score-side">
          <ScoreSide
            :quesType="quesType"
            :scoreList="scoreList"
            :zeroData="zeroData"
            @select="handleSelect"
          ></ScoreSide>
        </div>
        <div class="score-question">
          <iep-page-header :title="examName" :backOption="backOption"></iep-page-header>
          <ScoreQuestion :curentQues="curentQues" :quesList="quesList" @updateQnum="handleSelect"></ScoreQuestion>
        </div>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import _ from "lodash";
import { getJudgeScoreDetail } from "@/api/qms/exam_answer";
import ScoreSide from "./ScoreSide";
import ScoreQuestion from "./ScoreQuestion";
import { initQuesForm } from "./options";
export default {
  components: {
    ScoreSide,
    ScoreQuestion,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      quesList: [],
      currentQuesNum: null,
      examAnswer: {},
      examName: "",
      examinationId: 0,
      quesType: [],
      remainingTime: "",
      scoreList: [],
      zeroData: {},
    };
  },
  created() {
    this.load();
  },
  computed: {
    curentQues() {
      if (this.currentQuesNum) {
        return this.examAnswer[this.currentQuesNum];
      } else {
        return initQuesForm();
      }
    },
  },
  methods: {
    async handleSelect(i) {
      await this.refresh();
      this.currentQuesNum = i;
    },
    async refresh() {
      const { data } = await getJudgeScoreDetail(this.$route.params.id);
      this.examAnswer = _.keyBy(data.examAnswerVOList, "questionNum");
      this.scoreList = data.examAnswerVOList.map(m => ({
        score: m.score,
        questionNum: m.questionNum,
      }));
    },
    async load() {
      // examAnswerVOList: [{id: 4097, examId: 270, quesId: 853, grade: 2, userAnswer: "["1","2","3","4"]",…},…]
      // examName: "测试pc考试1"
      // examinationId: 153
      // id: 270
      // quesType: [{total: 4, start: 7, end: 8, label: "填空题", value: "GAPFILLING"},…]
      // remainingTime: "3-28"
      const { data } = await getJudgeScoreDetail(this.$route.params.id);
      this.quesList = data.examAnswerVOList.map(m => m.questionNum);
      this.examAnswer = _.keyBy(data.examAnswerVOList, "questionNum");
      this.examName = data.examName;
      this.examinationId = data.examinationId;
      this.quesType = data.quesType;
      this.remainingTime = data.remainingTime;
      this.currentQuesNum = data.examAnswerVOList[0].questionNum;
      this.scoreList = data.examAnswerVOList.map(m => ({
        score: m.score,
        questionNum: m.questionNum,
      }));
      this.zeroData.examId = data.id;
      this.zeroData.answerIdList = data.examAnswerVOList.map(m => m.id);
      this.zeroData.quesIdList = data.examAnswerVOList.map(m => m.quesId);
    },
  },
};
</script>
<style lang="scss" scoped>
.judge-score-wrap {
  display: flex;
  .score-side {
    flex: 0 0 240px;
    border-right: 1px solid $--border-color;
    padding-right: 20px;
  }
  .score-question {
    padding-left: 20px;
    flex: 1;
    width: 100%;
  }
}
</style>
