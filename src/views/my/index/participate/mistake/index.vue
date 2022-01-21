<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      searchName="title"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getExamMyMistakesPage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      :operationWidth="150"
    >
      <template #iep-crud-left>
        <div>您参加了{{countData[0]}}场考试，错了{{countData[1]}}题。</div>
      </template>
    </iep-crud-table>
    <MistakeDialog ref="MistakeDialog"></MistakeDialog>
  </div>
</template>
<script>
import MistakeDialog from "./MistakeDialog";
import {
  getExamMyMistakesPage,
  getExamMistakesById,
  myMistakesCount,
} from "@/api/qms/exam_mistakes";
export default {
  components: {
    MistakeDialog,
  },
  data() {
    return {
      countData: [0, 0],
      dictsMap: {
        level: {
          SIMPLE: "初级",
          GENERAL: "中级",
          DIFFICULT: "高级",
        },
      },
      operationOptions: [
        {
          name: "查看",
          func: this.查看,
        },
      ],
      columnsMap: [
        {
          prop: "title",
          label: "试题标题",
        },
        {
          prop: "errorCount",
          label: "错误次数",
        },
        {
          prop: "level",
          label: "试题难度",
          type: "dictGroup",
          dictName: "exam_difficulty",
        },
        {
          prop: "type",
          label: "试题题型",
          type: "dictGroup",
          dictName: "exam_question_type",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    getExamMyMistakesPage,
    async 查看(row) {
      const { data } = await getExamMistakesById(row.id);
      this.$refs["MistakeDialog"].data = data;
      this.$refs["MistakeDialog"].dialogShow = true;
    },
    async loadData() {
      const { data } = await myMistakesCount();
      this.countData = data;
    },
  },
};
</script>
