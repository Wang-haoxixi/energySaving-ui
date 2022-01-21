<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="form.examName" :backOption="backOption"></iep-page-header>
      <div class="data-grid-parent">
        <div>参加人数: {{form.takeTotal}}</div>
        <div>及格数: {{form.passTotal}}</div>
        <div>及格率: {{form.passRate}}</div>
        <div>最高分: {{form.maxScore}}</div>
        <div>最低分: {{form.minScore}}</div>
        <div>平均分: {{form.avgScore}}</div>
      </div>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='ExamResult'" v-slot:ExamResult>
          <ExamResult></ExamResult>
        </template>
        <template v-if="tabName ==='AnalysisAccomplishments'" v-slot:AnalysisAccomplishments>
          <AnalysisAccomplishments></AnalysisAccomplishments>
        </template>
        <template v-if="tabName ==='CertificatedPerson'" v-slot:CertificatedPerson>
          <CertificatedPerson></CertificatedPerson>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import ExamResult from "./ExamResult";
import AnalysisAccomplishments from "./AnalysisAccomplishments";
import CertificatedPerson from "./CertificatedPerson";
import { getExamStatisticsById } from "@/api/exam/exam_statistics";
const initForm = () => {
  return {
    avgScore: 0,
    examId: 0,
    examName: "",
    maxScore: 0,
    minScore: 0,
    passRate: 0,
    passTotal: 0,
    takeTotal: 0,
  };
};
export default {
  components: {
    ExamResult,
    AnalysisAccomplishments,
    CertificatedPerson,
  },
  data() {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
      },
      tabList: [
        {
          label: "考生成绩",
          value: "ExamResult",
        },
        {
          label: "成绩分析",
          value: "AnalysisAccomplishments",
        },
        {
          label: "获证人员",
          value: "CertificatedPerson",
        },
      ],
      tabName: "ExamResult",
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getExamStatisticsById(this.$route.params.id);
      this.form = this.$mergeByFirst(initForm(), data);
    },
  },
};
</script>
<style lang="scss" scoped>
.data-grid-parent {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px 0;
}
</style>
