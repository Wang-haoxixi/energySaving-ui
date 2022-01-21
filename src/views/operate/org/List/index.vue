<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :columnsMap="columnsMap"
      rowId="orgId"
      :loadFunction="getOperateOrgPage"
      :isMutipleSelection="false"
      searchName="orgName"
    >
      <template #orgName="{scope}">
        <iep-img class="iep-avatar-margin-right" :resizeOpt="{l:40}" :src="scope.row['avatar']"></iep-img>
        <iep-div-detail class="detail" :value="scope.row['orgName']"></iep-div-detail>
      </template>
      <template #createTime="{scope}">{{scope.row.createTime|parseToDay}}</template>
      <template #updateTime="{scope}">{{scope.row.updateTime|parseToDay}}</template>
      <template #establishedTime="{scope}">{{scope.row.establishedTime|parseToDay}}</template>
    </iep-crud-table>
    <WarningDialog ref="WarningDialog" @load-page="loadPage()"></WarningDialog>
  </div>
</template>
<script>
import WarningDialog from "@/views/operate/user/List/WarningDialog";
import {
  downOperateExcelData,
  getOperateOrgPage,
} from "@/api/admin/statistics";
import { columnsMap } from "./options";
export default {
  components: {
    WarningDialog,
  },
  data() {
    return {
      columnsMap,
      commonOptions: [
        {
          name: "导出",
          func: this.handleExport,
        },
      ],
      operationOptions: [
        {
          name: "详情",
          func: this.handleDetail,
        },
        {
          name: "审核",
        },
        {
          name: "警告",
          func: this.handleWarning,
        },
        {
          name: "解散",
        },
      ],
    };
  },
  methods: {
    getOperateOrgPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleExport() {
      downOperateExcelData(2);
    },
    handleDetail({ orgId }) {
      this.$openPage(`/operate/org/detail/${orgId}`);
    },
    handleWarning(row) {
      this.$refs["WarningDialog"].form.type = 2;
      this.$refs["WarningDialog"].form.dataId = row.orgId;
      this.$refs["WarningDialog"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .detail {
  max-width: 150px;
}
</style>
