<template>
  <iep-dialog :dialog-show="dialogShow" title="字典配置" width="700" @close="close">
    <iep-operation-container>
      <template slot="left">
        <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :is-pagination="false"
    >
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <child-dialog-form ref="ChildDialogForm" @load-page="loadPage"></child-dialog-form>
  </iep-dialog>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { _initRow } from "./options";
import { getChild, deleteChildById } from "@/api/admin/dict";
import ChildDialogForm from "./ChildDialogForm";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  components: { ChildDialogForm },
  data() {
    return {
      id: 1,
      methodName: "添加",
      dialogShow: false,
      pagedTable: [],
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleEdit,
          hidden: this.sys_dict_add,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      columnsMap: [
        {
          label: "ID",
          prop: "id",
          width: 100,
        },
        {
          label: "字典值",
          prop: "value",
        },
        {
          label: "字典名",
          prop: "label",
        },
        {
          label: "排序",
          prop: "sort",
          width: 100,
        },
      ],
      isLoadTable: false,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    close() {
      this.pagedTable = [];
      this.dialogShow = false;
    },
    async loadPage() {
      this.isLoadTable = true;
      const { data } = await getChild(this.id);
      this.pagedTable = data;
      this.isLoadTable = false;
    },
    handleEdit(row, index, isChild) {
      const { ChildDialogForm } = this.$refs;
      if (row) {
        ChildDialogForm.form = this.$mergeByFirst(_initRow(this.id), row);
        ChildDialogForm.methodName = "修改";
      } else {
        ChildDialogForm.form = _initRow(this.id);
        ChildDialogForm.methodName = "添加";
      }
      if (isChild) {
        ChildDialogForm.form = _initRow(this.id);
        ChildDialogForm.methodName = `添加至<${row.label}>`;
        ChildDialogForm.form.parentId = row.id;
      }
      ChildDialogForm.dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, deleteChildById, "删除该数据项");
    },
  },
};
</script>
