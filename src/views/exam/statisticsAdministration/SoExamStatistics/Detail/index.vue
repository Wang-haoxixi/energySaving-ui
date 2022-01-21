<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="form.orgName" :backOption="backOption"></iep-page-header>
      <div class="data-grid-parent">
        <div>发布考试次数: {{form.releaseExamTotal}}</div>
        <div>参加人数最多: {{form.maxTakeTotal}}</div>
        <div>参加人数最少: {{form.minTakeTotal}}</div>
        <div>合格率最高: {{form.maxPassRate}}</div>
        <div>合格率最低: {{form.minPassRate}}</div>
        <div>组织内发布证书数: {{form.releaseCertificate}}</div>
      </div>
      <iep-crud-table
        ref="CrudTable"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :loadFunction="getExamPage"
        searchName="realName"
        placeholder="请输入人员姓名进行搜索"
        :isMutipleSelection="false"
      ></iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import {
  getSoExamStatisticsById,
  getExamByOrgId,
} from "@/api/exam/exam_statistics";
const initForm = () => {
  return {
    orgName: "",
    releaseExamTotal: 0, //发布考试次数
    maxTakeTotal: 0, //参加人数最多
    minTakeTotal: 0, //参加人数最少
    maxPassRate: 0, //合格率最高
    minPassRate: 0, //合格率最低
    releaseCertificate: 0, //组织内发布证书数
  };
};
export default {
  data() {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
      },

      dictsMap: {
        isCertificate: {
          1: "是",
          2: "否",
        },
      },
      columnsMap: [
        {
          prop: "examName",
          label: "考试名称",
        },
        {
          prop: "isCertificate",
          label: "关联证书",
          type: "dict",
        },
        {
          prop: "takeTotal",
          label: "参加人数",
        },
        {
          prop: "passTotal",
          label: "及格人数",
        },
        {
          prop: "passRate",
          label: "合格率",
        },
        {
          prop: "avgScore",
          label: "分均分",
        },
      ],
    };
  },
  computed: {
    getExamPage() {
      return getExamByOrgId(this.$route.params.id);
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getSoExamStatisticsById(this.$route.params.id);
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
