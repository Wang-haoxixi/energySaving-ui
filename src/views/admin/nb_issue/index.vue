<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        row-id="id"
        searchName="name"
        :commonOptions="commonOptions"
        :columnsMap="columnsMap"
        :loadFunction="getCoinIssuePage"
        :isMutipleSelection="false"
      >
        <template #realName="{scope}">
          <iep-div-detail v-if="scope.row.realName" :value="scope.row.realName"></iep-div-detail>
          <div v-else>系统</div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
    <DialogPhone ref="DialogPhone"></DialogPhone>
    <IepDialogTransferNb ref="IepDialogTransferNb"></IepDialogTransferNb>
  </div>
</template>
<script>
import { IssueDTO } from "./options";
import DialogForm from "./DialogForm.vue";
import DialogPhone from "./DialogPhone";
import { getCoinIssuePage } from "@/api/fms/flow";
import { transferAmount } from "@/api/fms/account";
export default {
  components: { DialogForm, DialogPhone },
  data() {
    return {
      commonOptions: [
        {
          icon: "el-icon-sort",
          name: "转账",
          func: this.handleTransfer,
        },
        {
          icon: "",
          name: "发币",
          func: this.handleAdd,
        },
        {
          icon: "",
          name: "手机号配置",
          func: this.handlePhone,
        },
      ],
      columnsMap: [
        {
          prop: "id",
          label: "ID",
        },
        {
          prop: "amount",
          label: "发币数量",
        },
        {
          prop: "realName",
          label: "操作人",
          type: "slot",
        },
        {
          prop: "createTime",
          label: "发币日期",
        },
        {
          prop: "remarks",
          label: "发行明细",
        },
      ],
    };
  },
  methods: {
    getCoinIssuePage,
    handlePhone() {
      this.$refs["DialogPhone"].dialogShow = true;
    },
    handleAdd() {
      this.$refs["DialogForm"].form = new IssueDTO();
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleTransfer() {
      this.$refs["IepDialogTransferNb"].formRequestFn = transferAmount;
      this.$refs["IepDialogTransferNb"].dialogShow = true;
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
