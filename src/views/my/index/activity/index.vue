<template>
  <div>
    <iep-crud-table
      class="crud-table"
      ref="CrudTable"
      :columnsMap="columnsMap"
      rowId="id"
      :loadFunction="userPcPage"
      :isMutipleSelection="false"
      :isExpand="true"
      expandHidden
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
      <template v-slot:info="{scope}">
        <activity-detail :data="scope.row"></activity-detail>
      </template>
      <template v-slot:startTime="{scope}">
        <span>{{scope.row.startTime|parseToTimeMinutes}}</span>
      </template>
      <template v-slot:operate="{scope}">
        <expansion :data="scope.row" @to-expand="toExpand"></expansion>
      </template>
      <template #iepCrudTableExpend="{scope}" width="1">
        <ActivityItem :data="scope" @to-check="toCheck" @show-detail="showDetail"></ActivityItem>
      </template>
    </iep-crud-table>
    <DialogForm ref="dialogForm" @close="handleClose">
      <el-radio-group
        style="margin-bottom:20px;"
        v-model="currentIndex"
        slot="tab"
        @change="handleChangeIndex"
      >
        <el-radio-button
          v-for="(m,index) of infoData"
          :label="index"
          :key="'tab'+index"
        >{{m[0].value}}</el-radio-button>
      </el-radio-group>
    </DialogForm>
    <dialog-sign-in-code :data="signInCode" ref="dialogSignInCode"></dialog-sign-in-code>
  </div>
</template>
<script>
import ActivityItem from "./enroll/item";
import ActivityDetail from "./detail";
import Expansion from "./components/Expansion";
import { userPcPage } from "@/api/meetting/publish";
import { getSignInCodeById } from "@/api/meetting/ticket";
import operationMixins from "@/mixins/operationMixins";
import DialogSignInCode from "./components/DialogSignInCode";
import DialogForm from "@/views/meetting/publish/Components/DialogForm.vue";
import AdvanceSearch from "./components/AdvanceSearch";
import { columnsMap } from "./options";
import { contactsByEnrole } from "@/api/meetting/form";

export default {
  mixins: [operationMixins],
  components: {
    ActivityItem,
    ActivityDetail,
    DialogSignInCode,
    AdvanceSearch,
    Expansion,
    DialogForm,
  },
  data() {
    return {
      columnsMap,
      signInCode: [],
      infoData: [],
      currentIndex: 0,
    };
  },
  methods: {
    userPcPage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    async toCheck(id) {
      const { data } = await getSignInCodeById(id);
      if (data) {
        this.signInCode = data;
        this.$refs.dialogSignInCode.dialogShow = true;
      }
    },
    async showDetail(row) {
      const { data } = await contactsByEnrole(row.id);
      if (data) {
        this.infoData = data.map(m => m.formItems);
        const ref = this.$refs["dialogForm"];
        this.currentIndex = 0;
        ref.form = this.infoData[this.currentIndex];
        ref.dialogTitle = "查看信息";
        ref.status = "view";
        ref.dialogShow = true;
      }
    },
    toExpand(row, flag) {
      const $table = this.$refs["CrudTable"].$children[1].$children[0];
      $table.toggleRowExpansion(row, flag);
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleChangeIndex(index) {
      this.$refs["dialogForm"].form = this.infoData[index];
    },
    handleClose() {
      this.currentIndex = 0;
      this.infoData = [];
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__expanded-cell {
  padding: 10px 10px 20px 10px !important;
}
.crud-table ::v-deep .el-icon {
  visibility: hidden;
}
.crud-table ::v-deep .expanded .el-table__expand-column {
  pointer-events: none;
}
::v-deep .el-table__body tr.hover-row,
::v-deep .el-table--enable-row-hover .el-table__body tr:hover {
  box-shadow: none;
}
::v-deep .el-table__body tr.hover-row > td:first-child,
::v-deep .el-table__body tr > td:first-child,
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:first-child,
::v-deep .el-table--enable-row-hover .el-table__body tr > td:first-child,
::v-deep.el-table__body tr > td,
::v-deep.el-table__body tr.hover-row > td,
::v-deep .el-table--enable-row-hover .el-table__body tr > td,
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  border: 0;
}
::v-deep .el-table__header-wrapper {
  margin-bottom: 10px;
}
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  overflow: hidden;
}
</style>
