<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      row-id="userId"
      searchName="realName"
      :isMutipleSelection="false"
      :loadFunction="getOperateUserPage"
    >
      <template #username="{scope}">
        <iep-img class="iep-avatar-margin-right" :resizeOpt="{l:40}" :src="scope.row.avatar"></iep-img>
        <iep-div-detail :value="scope.row.username"></iep-div-detail>
      </template>
      <template #createTime="{scope}">{{scope.row.createTime|parseToDay}}</template>
      <template #birthday="{scope}">{{scope.row.birthday|parseToDay}}</template>
      <template #sex="{scope}">{{scope.row.sex|showSex}}</template>
    </iep-crud-table>
    <WarningDialog ref="WarningDialog" @load-page="loadPage()"></WarningDialog>
  </div>
</template>
<script>
import WarningDialog from "./WarningDialog";
import operationMixins from "@/mixins/operationMixins";
import { dictsMap, columnsMap, lockText } from "./options";
import { getOperateUserLockOrUnlock } from "@/api/admin/user";
import {
  downOperateExcelData,
  getOperateUserPage,
} from "@/api/admin/statistics";
export default {
  components: {
    WarningDialog,
  },
  mixins: [operationMixins],
  data() {
    return {
      checkList: [],
      columnsMap,
      dictsMap,
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
          name: "警告",
          func: this.handleWarning,
        },
        {
          name: row => {
            if (row.lockFlag === "0") {
              return "锁定";
            }
            if (row.lockFlag === "9") {
              return "解锁";
            } else {
              return "待定";
            }
          },
          func: this.changeUserLockOrUnlock,
        },
      ],
    };
  },
  methods: {
    getOperateUserPage,
    handleExport() {
      downOperateExcelData();
    },
    async changeUserLockOrUnlock(row) {
      console.log(row);
      this._handleComfirm(
        row.userId,
        getOperateUserLockOrUnlock,
        lockText(row),
      );
    },
    handleWarning(row) {
      this.$refs["WarningDialog"].form.type = 1;
      this.$refs["WarningDialog"].form.dataId = row.userId;
      this.$refs["WarningDialog"].dialogShow = true;
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleDetail({ userId }) {
      this.$openPage(`/operate/user/detail/${userId}`);
    },
  },
};
</script>
