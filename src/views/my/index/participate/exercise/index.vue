<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getMyExePage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      searchName="examName"
      :operationWidth="150"
    >
      <template #iep-crud-left>
        <div>您共参与了 {{countData[0]}} 场练习，有 {{countData[1]}} 场练习还在进行中。</div>
      </template>
    </iep-crud-table>
    <ExerciseViewDialog ref="ExerciseViewDialog"></ExerciseViewDialog>
  </div>
</template>
<script>
import ExerciseViewDialog from "@/views/exam/examList/Page/Components/ExerciseViewDialog";
import { getMyExePage, getMyExeInfo } from "@/api/qms/exam_exercise_management";
export default {
  components: {
    ExerciseViewDialog,
  },
  data() {
    return {
      dictsMap: {
        state: {
          1: "未提交",
          2: "批改完成",
          3: "待批改",
        },
        repeatExam: {
          1: "只限1次",
          2: "练习多次",
        },
      },
      countData: [0, 0],
      operationOptions: [
        {
          name: "继续练习",
          func: this.继续练习,
          hidden: (row) => {
            // 如果待审核
            return row.state !== "1";
          },
        },
        {
          name: "查看练习",
          func: this.查看练习,
          hidden: (row) => {
            // 如果待审核
            return row.state !== "2";
          },
        },
        {
          name: "再考一次",
          func: this.再考一次,
          hidden: (row) => {
            return row.allowRepeat === 0;
          },
        },
      ],
      columnsMap: [
        {
          prop: "examName",
          label: "练习名称",
        },
        {
          prop: "orgName",
          label: "归属组织",
        },
        {
          prop: "repeatExam",
          label: "练习次数",
          type: "dict",
        },
        {
          prop: "state",
          label: "练习状态",
          type: "dict",
        },
        {
          prop: "score",
          label: "成绩",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    再考一次(row) {
      this.$refs["ExerciseViewDialog"].id = row.examinationId;
      this.$refs["ExerciseViewDialog"].dialogShow = true;
    },
    getMyExePage,
    async loadData() {
      const { data } = await getMyExeInfo();
      this.countData = data;
    },
    继续练习(row) {
      this.$openPage(`/exercise_edit/${row.id}/continue`);
    },
    查看练习(row) {
      this.$openPage(`/exercise_show/${row.id}/review`);
    },
  },
};
</script>
