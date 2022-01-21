<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      :loadFunction="getExamResultPage"
      :isMutipleSelection="false"
      searchName="createByName"
    ></iep-crud-table>
  </div>
</template>
<script>
import { getExamResultPageByEId } from "@/api/qms/test_questions_library";
import { paperHand } from "@/api/qms/exam_answer";
export default {
  data() {
    return {
      commonOptions: [],
      operationOptions: [
        {
          name: "收卷",
          func: this.commitPaper,
        },
      ],
      columnsMap: [
        {
          label: "姓名",
          prop: "username",
        },
        {
          label: "答题时间",
          prop: "createTime",
        },
        {
          label: "答题时长",
          prop: "answerTime",
        },
        {
          label: "剩余时间",
          prop: "remainingTime",
        },
      ],
    };
  },
  computed: {
    getExamResultPage() {
      return getExamResultPageByEId(this.$route.params.id, "1");
    },
  },
  methods: {
    commitPaper(row) {
      this.$confirm("请确认是否收卷！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          paperHand({
            examId: row.id,
          }).then(({ data }) => {
            if (data.code === 0) {
              this.$message({
                type: "success",
                message: "收卷成功",
              });
              this.$refs.CrudTable.loadPage();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
