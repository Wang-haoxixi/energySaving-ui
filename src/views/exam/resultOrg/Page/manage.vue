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
      :operationWidth="150"
    ></iep-crud-table>
  </div>
</template>

<script>
import { getExamResultPageByEId } from "@/api/qms/test_questions_library";
import { checkForCertificate } from "@/api/qms/exam_examination";
import { sendAward, sendBatchAward } from "@/api/qms/cerificate";
import { columnsManageMap } from "../../const/testOptions";
export default {
  data() {
    return {
      sendCertLoading: false,
      columnsMap: columnsManageMap,
      certificateId: null,
    };
  },
  computed: {
    commonOptions() {
      return [
        {
          name: "全部证书发放",
          func: this.allCertificate,
          disabled: this.sendCertLoading || this.certificateId === null,
        },
      ];
    },
    operationOptions() {
      return [
        {
          name: "查看试卷",
          func: this.handleDetail,
          disabled: false,
        },
        {
          name: "发放证书",
          func: this.sendCertificate,
          disabled: () => {
            return this.sendCertLoading || this.certificateId === null;
          },
        },
      ];
    },
    getExamResultPage() {
      return getExamResultPageByEId(this.$route.params.id);
    },
  },
  created() {
    this.checkCertificate();
  },
  methods: {
    checkCertificate() {
      checkForCertificate(this.$route.params.id).then(({ data }) => {
        if (data.certificateId) {
          this.certificateId = data.certificateId;
        }
      });
    },
    handleDetail(row) {
      this.$router.push({
        path: `/exam_show/${row.id}`,
        query: {
          name: row.username,
          type: "admin",
        },
      });
    },
    async sendCertificate(row) {
      const loading = this._startLoading();
      this.sendCertLoading = true;
      try {
        const { data } = await sendAward(row.id);
        if (data) {
          this.$message.success("操作成功");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.sendCertLoading = false;
        loading.close();
      }
    },
    async allCertificate() {
      const loading = this._startLoading();
      this.sendCertLoading = true;
      try {
        const { data } = await sendBatchAward(this.$route.params.id);
        if (data) {
          this.$message.success("操作成功");
          this.$refs.CrudTable.loadPage();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.sendCertLoading = false;
        loading.close();
      }
    },
    _startLoading() {
      return this.$loading({
        lock: true,
        text: "证书发放中, 请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
  },
};
</script>
