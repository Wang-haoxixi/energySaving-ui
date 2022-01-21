<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getMyExamPage"
      :operationOptions="operationOptions"
      :isMutipleSelection="false"
      :operationWidth="150"
    >
      <template #iep-crud-left>
        <div>您共参与了 {{countData[0]}} 场考试，有 {{countData[1]}} 场考试还在进行中。</div>
      </template>
    </iep-crud-table>

    <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>
<script>
import {
  getMyExamPage,
  getMyExamInfo,
  checkState,
} from "@/api/qms/test_questions_library";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";
export default {
  components: {
    ExamViewDialog,
  },
  data() {
    return {
      dictsMap: {
        state: {
          1: "未提交",
          2: "批改完成",
          3: "待批改",
        },
        connectCertificate: {
          1: "是",
          0: "否",
        },
      },
      countData: [0, 0],
      operationOptions: [
        {
          name: "继续考试",
          func: this.继续考试,
          hidden: (row) => {
            // 如果待审核
            return row.state !== "1";
          },
        },
        {
          name: "查看试卷",
          func: this.查看试卷,
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
        // {
        //   name: "查看证书",
        //   func: this.查看证书,
        // },
      ],
      columnsMap: [
        {
          prop: "examName",
          label: "考试名称",
        },
        {
          prop: "orgName",
          label: "归属组织",
        },
        {
          prop: "connectCertificate",
          label: "证书关联",
          type: "dict",
        },
        {
          prop: "state",
          label: "试卷状态",
          type: "dict",
        },
        {
          prop: "score",
          label: "成绩",
        },
        {
          prop: "result",
          label: "成绩状态",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    getMyExamPage,
    async loadData() {
      const { data } = await getMyExamInfo();
      this.countData = data;
    },
    再考一次(row) {
      this.$refs["ExamViewDialog"].id = row.examinationId;
      this.$refs["ExamViewDialog"].dialogShow = true;
    },
    继续考试(row) {
      checkState({ manageId: row.id }, 2).then(({ data }) => {
        if ("4" === data.code) {
          this.$message.error(data.msg);
        } else {
          this.$openPage(`/exam_edit/${row.id}/continue`);
        }
      });
    },
    查看试卷(row) {
      checkState({ id: row.examinationId, manageId: row.id }).then(
        ({ data }) => {
          if ("20" === data.code) {
            this.$message.error(data.hint);
          } else {
            this.$openPage(`/exam_show/${row.id}?name=${row.username}`);
          }
        },
      );
    },
  },
};
</script>
