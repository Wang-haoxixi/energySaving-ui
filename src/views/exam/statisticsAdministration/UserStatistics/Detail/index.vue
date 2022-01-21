<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="`${form.realName}的考试总览`" :backOption="backOption"></iep-page-header>
      <div class="data-grid-parent">
        <div>考试次数: {{form.examTotal}}</div>
        <div>合格次数: {{form.passTotal}}</div>
        <div>合格率: {{form.passRate}}</div>
        <div>最高成绩: {{form.maxScore}}</div>
        <div>最低成绩: {{form.minScore}}</div>
        <div>证书数量: {{form.certificate}}</div>
      </div>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='ExamDetail'" v-slot:ExamDetail>
          <ExamDetail></ExamDetail>
        </template>
        <template v-if="tabName ==='CertificateDetail'" v-slot:CertificateDetail>
          <CertificateDetail></CertificateDetail>
        </template>
      </iep-tabs>
    </iep-basic-container>
  </div>
</template>
<script>
import ExamDetail from "./ExamDetail";
import CertificateDetail from "./CertificateDetail";
import { getExamUserStatisticsById } from "@/api/exam/exam_statistics";
import { mapGetters } from "vuex";
const initForm = () => {
  return {
    certificate: "0",
    examTotal: "0",
    maxScore: "0",
    minScore: "0",
    passRate: "0",
    passTotal: "0",
    userId: null,
    realName: "",
  };
};
export default {
  components: {
    ExamDetail,
    CertificateDetail,
  },
  data() {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
      },
      tabList: [
        {
          label: "考试详情",
          value: "ExamDetail",
        },
        {
          label: "证书详情",
          value: "CertificateDetail",
        },
      ],
      tabName: "ExamDetail",
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
  },
  methods: {
    async loadData() {
      const type = this.isPlatform ? "operate" : "org";
      const { data } = await getExamUserStatisticsById(
        this.$route.params.id,
        type,
      );
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
