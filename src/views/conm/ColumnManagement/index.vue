<template>
  <div class="column-management">
    <iep-page-header class="sub-title" title="栏目管理" :replaceText="replaceText" :data="statistics"></iep-page-header>
    <iep-operation-container>
      <template slot="left">
        <iep-button v-if="info_node_add" type="primary" icon="el-icon-plus" @click="handleAdd">新增</iep-button>
      </template>
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
      is-tree
    >
      <template slot="before-columns">
        <el-table-column label="ID" width="90px">
          <template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="handleAdd(scope.row)">添加子栏目</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown size="medium">
            <el-button type="text">
              更多
              <i class="el-icon-woneng-arrow-down" style="margin-left:5px;font-size:12px;"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item type="text" @click.native="handleDoc(scope.row)">文档管理</el-dropdown-item>
              <el-dropdown-item
                v-if="info_node_edit"
                type="text"
                @click.native="handleEdit(scope.row)"
              >编辑</el-dropdown-item>
              <el-dropdown-item
                v-if="info_node_del"
                type="text"
                @click.native="handleDelete(scope.row)"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-merge ref="DialogMerge" @load-page="loadPage"></dialog-merge>
  </div>
</template>
<script>
import {
  addObj,
  getPage,
  deleteNodeById,
  updateObj,
} from "@/api/conm/node_controller.ts";
import {
  columnsMap,
  initSearchForm,
  dictsMap,
  toNewParentForm,
} from "./options.ts";
import mixins from "@/mixins/mixins";
import DialogForm from "./DialogForm";
import DialogMerge from "./DialogMerge";
import { hasPermissions } from "@/util/menu";
export default {
  components: { DialogForm, DialogMerge },
  mixins: [mixins],
  data() {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [0],
      replaceText: data => `（共${data[0]}条）`,
      pagedTable: [],
      siteId: "",
    };
  },
  created() {
    this.siteId = this.$route.params.id;
    this.loadPage();
  },
  computed: {
    info_node_add: () => hasPermissions("info_node_add"),
    info_node_edit: () => hasPermissions("info_node_edit"),
    info_node_del: () => hasPermissions("info_node_del"),
  },
  methods: {
    handleAdd(row) {
      this.$refs["DialogForm"].form = toNewParentForm(row);
      this.$refs["DialogForm"].form.parentId = row.id;
      this.$refs["DialogForm"].form.parentName = row.nodeName;
      this.$refs["DialogForm"].siteId = this.siteId;
      this.$refs["DialogForm"].formRequestFn = addObj;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
    },
    handleEdit(row) {
      this.$refs["DialogForm"].id = row.id;
      this.$refs["DialogForm"].siteId = row.siteId;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].formRequestFn = updateObj;
      this.$refs["DialogForm"].methodName = "编辑";
    },
    handleMerge() {
      this.$refs["DialogMerge"].dialogShow = true;
      this.$refs["DialogMerge"].methodName = "合并";
    },
    handleDoc(row) {
      this.$router.push({
        path: `/conm/document_management/${row.id}`,
        query: { siteId: this.siteId, nodeName: row.nodeName },
      });
    },
    async handleDelete(row) {
      try {
        await this.$confirm("此操作会将其子栏目一起删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          const { data } = await deleteNodeById(row.id);
          if (data.data) {
            this.$message({
              message: "操作成功",
              type: "success",
            });
          } else {
            this.$message(data.msg);
          }
        } catch (error) {
          this.$message("似乎出现了一些问题");
        }
      } catch (error) {
        this.$message("操作取消");
      }
    },
    async loadPage(param = this.searchForm) {
      const data = await this.loadTable(
        { ...param, siteId: this.siteId },
        getPage,
      );
      this.$set(this.statistics, 0, data.total);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.aside-main >>> .ant-menu-inline {
  border-right: none;
}
.column-management >>> .table .cell {
  flex-wrap: inherit;
}
</style>
