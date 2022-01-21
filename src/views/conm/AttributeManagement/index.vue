<template>
  <div>
    <iep-page-header class="sub-title" title="推荐位管理"></iep-page-header>
    <iep-operation-container>
      <template slot="left">
        <iep-button
          v-if="info_attribute_add"
          type="primary"
          plain
          @click="handleAdd"
          icon="el-icon-plus"
        >新增</iep-button>
      </template>
      <!-- <template slot="right">
          <operation-search>
          </operation-search>
      </template>-->
    </iep-operation-container>
    <iep-table
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
          <el-button type="text" v-if="info_attribute_edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" v-if="info_attribute_del" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import {
  getPageById,
  postPage,
  updatePage,
  deleteAttributeById,
} from "@/api/conm/attribute_controller.ts";
import mixins from "@/mixins/mixins";
import { columnsMap, initSearchForm, dictsMap } from "./options.ts";
import DialogForm from "./DialogForm";
// import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
export default {
  mixins: [mixins],
  components: { DialogForm },
  data() {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      pagedTable: [],
      isLoadTable: false,
      siteId: "",
    };
  },
  created() {
    this.siteId = this.$route.params.id;
    this.loadPage();
  },
  computed: {
    info_attribute_add: () => hasPermissions("info_attribute_add"),
    info_attribute_edit: () => hasPermissions("info_attribute_edit"),
    info_attribute_del: () => hasPermissions("info_attribute_del"),
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
      this.$refs["DialogForm"].id = row.value;
      this.$refs["DialogForm"].formRequestFn = updatePage;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].methodName = "编辑";
    },
    handleDelete(row) {
      this._handleGlobalDeleteById(row.value, deleteAttributeById);
    },
    async loadPage() {
      getPageById(this.siteId).then(data => {
        const newData = data.data;
        this.pagedTable = newData;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
</style>
