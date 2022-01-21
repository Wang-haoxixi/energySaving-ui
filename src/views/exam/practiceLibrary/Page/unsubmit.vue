<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :columnsMap="columnsMap"
      :loadFunction="getExamResultPage"
      :isMutipleSelection="false"
      searchName="createByName"
    >
      <template #isOrg="{scope}">{{dictsMap.isOrg[scope.row.isOrg]}}</template>
      <template #state>未提交</template>
    </iep-crud-table>
  </div>
</template>
<script>
import { exerciseScoreManage } from "@/api/qms/exam_exercise";
import { paperHand } from "@/api/qms/exam_answer";
export default {
  props: {
    examId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dictsMap: {
        isOrg: { 1: "是", 2: "否" },
      },
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
          prop: "createName",
        },
        {
          label: "是否组织内",
          prop: "isOrg",
          type: "slot",
        },
        {
          label: "答卷时间",
          prop: "createTime",
        },
        {
          label: "试卷状态",
          prop: "state",
          type: "slot",
        },
      ],
    };
  },
  computed: {
    getExamResultPage() {
      return exerciseScoreManage(this.examId, "1");
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
