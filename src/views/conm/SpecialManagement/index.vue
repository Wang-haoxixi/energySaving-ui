<template>
  <div>
    <iep-page-header class="sub-title" title="专题管理"></iep-page-header>
    <iep-operation-container>
      <template slot="left">
        <iep-button type="primary" plain @click="handleAdd" icon="el-icon-plus">新增</iep-button>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      is-mutiple-selection
    >
      <template>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime | parseToDay }}</template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import {
  getPage,
  postPage,
  updatePage,
  deleteSpecialById,
} from "@/api/conm/special_controller.ts";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, dictsMap } from "./options.ts";
import DialogForm from "./DialogForm";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins, operationMixins],
  components: { DialogForm },
  data() {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [],
      isLoadTable: false,
      siteId: "",
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.siteId = this.$route.params.id;
    this.loadPage();
  },
  methods: {
    handleAdd() {
      this.$refs["DialogForm"].siteId = this.siteId;
      this.$refs["DialogForm"].formRequestFn = postPage;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
    },
    handleEdit(row) {
      this.$refs["DialogForm"].siteId = this.siteId;
      this.$refs["DialogForm"].id = row.specialId;
      this.$refs["DialogForm"].formRequestFn = updatePage;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].methodName = "编辑";
    },
    handleDelete(row) {
      this._handleComfirm(row.specialId, deleteSpecialById, "删除专题");
    },
    async loadPage(param = this.searchForm) {
      await this.loadTable({ ...param, siteId: this.siteId }, getPage);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
</style>
