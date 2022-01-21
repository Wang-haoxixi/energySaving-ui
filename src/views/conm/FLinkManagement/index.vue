<template>
  <div>
    <iep-page-header class="sub-title" title="友情链接管理"></iep-page-header>
    <iep-operation-container>
      <template slot="left">
        <iep-button type="primary" v-if="this.type == 0" @click="handleAdd" icon="el-icon-plus">新增</iep-button>
        <iep-button v-if="this.type == 1" @click="handleTypeAdd" icon="el-icon-plus">新增分类</iep-button>
        <iep-button @click="handleListManagement">列表管理</iep-button>
        <iep-button @click="handleTypeManagement">分类管理</iep-button>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      v-if="this.type == 0"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      is-mutiple-selection
    >
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <iep-table
      :size="tableSize"
      v-if="this.type == 1"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnTypeMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      is-mutiple-selection
    >
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <iep-button type="text" @click="handleTypeEdit(scope.row)">编辑</iep-button>
          <el-divider direction="vertical"></el-divider>
          <iep-button type="text" @click="handleTypeDelete(scope.row)">删除</iep-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-type-form ref="DialogTypeForm" @load-page="loadPage"></dialog-type-form>
  </div>
</template>
<script>
import {
  getPage,
  postPage,
  updatePage,
  deleteFLinkById,
} from "@/api/conm/f_link_controller.ts";
import {
  getTypePage,
  postTypePage,
  updateTypePage,
  deleteFLinkTypeById,
} from "@/api/conm/f_link_type_controller.ts";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, dictsMap, columnTypeMap } from "./options.ts";
import DialogForm from "./DialogForm";
import DialogTypeForm from "./DialogTypeForm";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins, operationMixins],
  components: { DialogForm, DialogTypeForm },
  data() {
    return {
      dictsMap,
      columnsMap,
      columnTypeMap,
      type: 0,
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
    handleTypeAdd() {
      this.$refs["DialogTypeForm"].siteId = this.siteId;
      this.$refs["DialogTypeForm"].formRequestFn = postTypePage;
      this.$refs["DialogTypeForm"].dialogShow = true;
      this.$refs["DialogTypeForm"].methodName = "新增";
    },
    handleEdit(row) {
      this.$refs["DialogForm"].siteId = this.siteId;
      this.$refs["DialogForm"].id = row.friendlinkId;
      this.$refs["DialogForm"].formRequestFn = updatePage;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].methodName = "编辑";
    },
    handleTypeEdit(row) {
      this.$refs["DialogTypeForm"].siteId = this.siteId;
      this.$refs["DialogTypeForm"].id = row.friendlinktypeId;
      this.$refs["DialogTypeForm"].formRequestFn = updateTypePage;
      this.$refs["DialogTypeForm"].dialogShow = true;
      this.$refs["DialogTypeForm"].loadTypeList();
      this.$refs["DialogTypeForm"].methodName = "编辑";
    },
    handleListManagement() {
      this.type = 0;
      this.loadPage();
    },
    handleTypeManagement() {
      this.type = 1;
      this.loadPage();
    },
    handleDelete(row) {
      this._handleComfirm(row.friendlinkId, deleteFLinkById, "删除友情链接");
    },
    handleTypeDelete(row) {
      this._handleComfirm(
        row.friendlinktypeId,
        deleteFLinkTypeById,
        "删除列表分类",
      );
    },
    async loadPage(param = this.searchForm) {
      this.type == 0
        ? await this.loadTable({ ...param, siteId: this.siteId }, getPage)
        : await this.loadTable({ ...param, siteId: this.siteId }, getTypePage);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
</style>
