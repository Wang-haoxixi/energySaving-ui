<template>
  <div class="exam-box">
    <div class="left-box">
      <div class="title">{{exam.examName}}</div>
      <div class="info">
        <span class="time">{{exam.appShowTime}}</span>
        <span class="num">{{exam.testNumber}} 人已考</span>
      </div>
    </div>
    <div class="right-box">
      <template v-if="exam.chargeStatus==='1'">
        <div class="free">免费</div>
      </template>
      <template v-else>
        <div class="money">{{exam.consume}}贝</div>
      </template>
      <div class="opt">
        <el-button
          @click="handleStart()"
          v-if="formData.situationId"
        >{{exam.beginStatus === 1 ? '立即参加' : '已参与'}}</el-button>
        <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
      </div>
    </div>
  </div>
</template>
<script>
import { getRelationExamListById } from "@/api/qms/exam_examination";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";
const initExam = () => {
  return {
    id: 0,
    appShowTime: "",
    beginStatus: 1,
    testNumber: 0, //参加人数
    chargeStatus: "1", //1免费2收费
    consume: 0, //费用
    examName: "",
    formData: 0,
  };
};
export default {
  props: ["formData"],
  components: {
    ExamViewDialog,
  },
  data() {
    return {
      exam: initExam(),
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleStart() {
      if (
        this.formData.situationId &&
        this.formData.studyClassCount / this.formData.allClassCount < 0.7
      ) {
        this.$message.warning(
          "您学习本课程进度不足70%，无法完成认证考试，请先完成课程学习！",
        );
      } else {
        this.$refs["ExamViewDialog"].id = this.exam.id;
        this.$refs["ExamViewDialog"].beginStatus = this.exam.beginStatus;
        this.$refs["ExamViewDialog"].situationId = this.formData.situationId;
        this.$refs["ExamViewDialog"].dialogShow = true;
      }
    },
    async loadPage() {
      const { data } = await getRelationExamListById(this.formData.examId);
      console.log(data);
      this.exam = this.$mergeByFirst(initExam(), data);
    },
  },
};
</script>
<style lang="scss" scoped>
.exam-box {
  display: flex;
  justify-content: space-between;
  background-color: $--background-color;
  padding: 20px;
  border-radius: $--border-radius-base;
  .left-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .title {
      margin: 5px 20px 20px 0;
      font-size: 16px;
      text-align: justify;
      color: $--color-text-primary;
    }
    .info {
      margin-bottom: 10px;
      font-size: 14px;
      color: $--color-text-secondary;
      .time {
        margin-right: 20px;
      }
    }
  }
  .right-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .free,
    .money,
    .opt {
      margin-right: 10px;
      padding: 5px 0;
      font-size: 16px;
      text-align: center;
    }
    .free {
      margin-bottom: 10px;
      color: $--color-third;
    }
    .money {
      color: $--color-primary;
    }
  }
}
</style>
