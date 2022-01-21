<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      :loadFunction="getExamResultPage"
      :isMutipleSelection="false"
      searchName="createByName"
      :operationWidth="150"
    >
      <template #isOrg="{scope}">{{dictsMap.isOrg[scope.row.isOrg]}}</template>
    </iep-crud-table>
  </div>
</template>

<script>
import { exerciseScoreManage } from "@/api/qms/exam_exercise";
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
      sendCertLoading: false,
      columnsMap: [
        { label: "姓名", prop: "createName" },
        {
          label: "是否组织成员",
          prop: "isOrg",
          type: "slot",
        },
        {
          label: "答卷时间",
          prop: "createTime",
        },
        {
          label: "交卷时间",
          prop: "commitTime",
        },
        {
          label: "分数",
          prop: "score",
        },
      ],
    };
  },
  computed: {
    operationOptions() {
      return [
        {
          name: "查看练习",
          func: this.handleDetail,
          disabled: false,
        },
      ];
    },
    getExamResultPage() {
      return exerciseScoreManage(this.examId, 2);
    },
  },
  methods: {
    handleDetail(row) {
      this.$router.push({
        path: `/exercise_show/${row.id}/review`,
        query: {
          name: row.createName,
          type: "admin",
        },
      });
    },
  },
};
</script>
