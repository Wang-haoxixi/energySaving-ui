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
        :size="tableSize"
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
    <dialog-form :parentId="parentId" ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import { columnsMap } from "./options";
import { getCategoryTree, delCategoryById } from "@/api/admin/category";
import { customTree } from "@/util/util";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      columnsMap,
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "添加子字典",
          func: this.handleAdd,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      pagedTable: [],
      myTree: [],
      /**
       * 父ID确认
       */
      parentId: -1,
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
    handleAdd(row) {
      this.$refs["DialogForm"].add(row, this.myTree);
    },
    handleEdit(row) {
      this.$refs["DialogForm"].edit(row, this.myTree);
    },
    handleDel(row) {
      this._handleComfirm(row.id, delCategoryById, "删除分类");
    },
    async loadPage(param = this.searchForm) {
      this.isLoadTable = true;
      const { data } = await getCategoryTree(param);
      this.pagedTable = data;
      this.isLoadTable = false;
      this.parentId = this.pagedTable[0].parentId ?? -1;
      this.myTree = customTree(this.pagedTable, { label: "name", value: "id" });
    },
  },
};
</script>
