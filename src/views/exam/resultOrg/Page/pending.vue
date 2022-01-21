<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getExamResultPage"
      :isMutipleSelection="false"
      searchName="createByName"
    ></iep-crud-table>
  </div>
</template>
<script>
import {
  getExamResultPageByEId,
  commitCorrect,
} from "@/api/qms/test_questions_library";
export default {
  data() {
    return {
      commonOptions: [
        {
          name: "全部批改完成",
          func: this.finishCorrecting,
        },
      ],
      operationOptions: [
        {
          name: "判分",
          func: this.判分,
        },
        // {
        //   name: "查看试卷",
        //   func: this.查看试卷,
        // },
        // {
        //   name: "纠正分数",
        //   func: this.纠正分数,
        // },
      ],
      dictsMap: {
        correctState: {
          1: "未批改",
          2: "批改中",
          3: "批改完毕",
        },
      },
      columnsMap: [
        {
          label: "姓名",
          prop: "username",
        },
        {
          label: "系统判分题得分",
          prop: "sysScore",
        },
        {
          label: "阅卷状态",
          prop: "correctState",
          type: "dict",
        },
        {
          label: "阅卷人",
          prop: "correctByName",
        },
      ],
    };
  },
  computed: {
    getExamResultPage() {
      return getExamResultPageByEId(this.$route.params.id, "2");
    },
  },
  methods: {
    finishCorrecting() {
      commitCorrect({ examinationId: this.$route.params.id }).then(
        ({ data }) => {
          if (data) {
            this.$message.success("操作成功");
            this.$refs.CrudTable.loadPage();
          }
        },
      );
    },
    判分(row) {
      this.$openPage(`/exam/judge_score/${row.id}`);
    },
    // 查看试卷(row) {
    //   this.$router.push({
    //     path: `/exam_show/${row.id}`,
    //     query: {
    //       name: row.realName,
    //     },
    //   });
    // },
    纠正分数() {},
  },
};
</script>
