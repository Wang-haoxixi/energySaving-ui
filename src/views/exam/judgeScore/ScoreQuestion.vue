<template>
  <div>
    <h2>
      {{curentQues.questionNum}}.{{curentQues.examQuestionVO.title}}
      <span
        class="desc"
      >({{curentQues.grade}}分)</span>
    </h2>
    <div class="answer-background">
      <p>用户答案：{{curentQues.userAnswerJson && curentQues.userAnswerJson.join('｜')}}</p>
    </div>
    <div class="answer-background">
      <p>答案：{{curentQues.examQuestionVO.answer}}</p>
    </div>
    <el-form :inline="true" :model="form" class="form-score">
      <iep-form-item label-name="得分">
        <IepInputNumber
          v-model="form.score"
          :max="curentQues.grade"
          placeholder="得分"
          :precision="0"
        ></IepInputNumber>
      </iep-form-item>
      <el-form-item>
        <el-button @click="onPrev()" :disabled="canPrev">上一题</el-button>
        <el-button type="primary" @click="onNext()" :disabled="canNext">下一题</el-button>
        <el-button type="primary" @click="onSaveAndExit()">保存并退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { uploadScore } from "@/api/qms/exam_answer";
const initScoreForm = (id = 0, score = 0) => {
  return {
    score, //批改的分
    id, //这个答题的id
    examId: 0, //答卷id如果是交卷给我
    // ifCommit: "1",
  };
};
export default {
  props: ["curentQues", "quesList"],
  data() {
    return {
      form: initScoreForm(),
    };
  },
  computed: {
    canNext() {
      const lastNum = this.quesList[this.quesList.length - 1];
      return this.curentQues.questionNum === lastNum;
    },
    canPrev() {
      const firstNum = this.quesList[0];
      return this.curentQues.questionNum === firstNum;
    },
  },
  methods: {
    async onSaveAndExit() {
      const res = await this.onSubmit(true);
      if (res) {
        this.$router.go(-1);
      }
    },
    async onSubmit(isFinish = false) {
      if (isFinish) {
        this.form.ifCommit = "1";
      } else {
        this.form.ifCommit = null;
      }
      const { code } = await uploadScore(this.form);
      if (code) {
        return false;
      }
      return true;
    },
    async onNext() {
      const num = this.curentQues.questionNum + 1;
      const res = await this.onSubmit();
      if (res) {
        this.$emit("updateQnum", num);
      }
    },
    async onPrev() {
      const num = this.curentQues.questionNum - 1;
      const res = await this.onSubmit();
      if (res) {
        this.$emit("updateQnum", num);
      }
    },
  },
  watch: {
    "curentQues.id": function(n) {
      this.form = initScoreForm(n, this.curentQues.score);
    },
  },
};
</script>
<style lang="scss" scoped>
span.desc {
  color: $--color-text-secondary;
}
.form-score {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.answer-background {
  margin-top: 20px;
  background-color: $--background-color;
  border-radius: $--border-radius-base;
  padding: 20px;
}
</style>
