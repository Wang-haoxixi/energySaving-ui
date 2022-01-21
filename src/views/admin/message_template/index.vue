<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
        </template>
        <template slot="right">
          <iep-table-density></iep-table-density>
          <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
        </template>
      </iep-operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        border
        :is-pagination="false"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        row-key="id"
        is-mutiple-selection
      >
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-show ref="DialogShow" @load-page="loadPage"></dialog-show>
  </div>
</template>
<script>
import DialogForm from "./DialogForm.vue";
import DialogShow from "./DialogShow.vue";
import { columnsMap, initForm } from "./options";
import { getCategoryTreeByNumber } from "@/api/admin/category";
import { getTemplateById, putTemplate } from "@/api/ims/template";
export default {
  components: {
    DialogForm,
    DialogShow,
  },
  data() {
    return {
      columnsMap,
      commonOptions: [
        {
          name: "批量导出",
          func: () => {},
          disabled: true,
        },
      ],
      operationOptions: [
        {
          name: "查看",
          func: this.handleShow,
          hidden: false,
          disabled: false,
        },
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: false,
          disabled: false,
        },
      ],
      pagedTable: [],
      isLoadTable: false,
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async handleShow(row) {
      const { data } = await getTemplateById(row.id, row.parentId);
      const form = this.$mergeByFirst(initForm(), data);
      this.$refs["DialogShow"].template = form.template;
      this.$refs["DialogShow"].dialogShow = true;
    },
    async handleEdit(row) {
      const { data } = await getTemplateById(row.id, row.parentId);
      this.$refs["DialogForm"].form = this.$mergeByFirst(initForm(), data);
      this.$refs[
        "DialogForm"
      ].methodName = `编辑<${row.name}-${row.number}>的模板`;
      this.$refs["DialogForm"].formRequestFn = putTemplate;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async loadPage(param = this.searchForm) {
      this.isLoadTable = true;
      const { data } = await getCategoryTreeByNumber("MESSAGE_CATEGORY", param);
      this.pagedTable = data;
      this.isLoadTable = false;
    },
  },
};
</script>
