<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="添加关联产品(已发布的产品)"
    width="800px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <search-filter @search-page="handleSearch"></search-filter>
    <iep-table
      :isLoadTable="false"
      :isPagination="false"
      :is-mutiple-selection="true"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @selection-change="handleSelectionChange"
      nodataText="请按条件搜索"
      v-loading="loading"
      ref="IepTable"
    >
      <template #name="{scope}">
        <iep-table-link-img-desc
          :img="scope.row.imageUrl"
          :desc="scope.row.synopsis"
          :name="scope.row.name"
        ></iep-table-link-img-desc>
      </template>
    </iep-table>
    <template slot="footer">
      <el-button type="primary" @click="handleSubmit()">提交</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getRelateProductList } from "@/api/dms/product";
import SearchFilter from "./SearchFilter";

export default {
  components: {
    SearchFilter,
  },
  props: {
    relateProducts: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      dialogShow: false,
      pagedTable: [],
      loading: false,
      columnsMap: [
        {
          label: "名称",
          prop: "name",
          type: "slot",
          minWidth: 300,
        },
        {
          label: "组织",
          prop: "orgName",
          width: "200px",
        },
      ],
    };
  },
  watch: {
    pagedTable() {
      this.toggleSelection();
    },
    dialogShow(val) {
      if (val) {
        this.toggleSelection();
      }
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    handleSubmit() {
      const selected = this.pagedTable.filter((m) =>
        this.multipleSelection.includes(m.id),
      );
      this.$emit("input", selected);
      this._close();
    },
    async loadPage(searchForm) {
      this.loading = true;
      const { data } = await getRelateProductList(searchForm);
      this.pagedTable = data;
      this.loading = false;
    },
    handleSearch(searchForm) {
      this.loadPage(searchForm);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map((m) => m.id);
    },
    toggleSelection() {
      this.$nextTick(() => {
        const list = this.pagedTable.filter((m) => {
          return this.relateProducts.find((i) => i.id === m.id);
        });
        this.$refs.IepTable.toggleSelection(list);
      });
    },
  },
};
</script>
