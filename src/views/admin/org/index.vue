<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        rowId="orgId"
        :loadFunction="getOrgPage"
      >
        <template #name="{scope}">
          <iep-img class="iep-avatar-margin-right" :src="scope.row['avatar']" :resizeOpt="{l:40}"></iep-img>
          <iep-div-detail :value="scope.row['name']"></iep-div-detail>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage()"></dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { columnsMap } from "./options";
import { getOrgPage, delOrgById } from "@/api/admin/org";
import DialogForm from "./DialogForm";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      columnsMap,
      commonOptions: [
        {
          name: "批量导出",
          func: () => {},
          batchOperation: true,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleShow,
          hidden: false,
          disabled: false,
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: false,
          disabled: false,
        },
      ],
    };
  },
  methods: {
    getOrgPage,
    handleShow(row) {
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].form = { ...row };
    },
    handleDel(row) {
      this._handleComfirm(row.orgId, delOrgById, "删除组织");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
