<template>
  <div class="aside-main">
    <iep-operation-container>
      <template slot="left">
        <iep-button v-if="info_article_add" type="primary" icon="el-icon-plus" @click="handleAdd">新增</iep-button>
        <iep-button :disabled="disabled" @click="handleTransfer">文章迁移</iep-button>
      </template>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="title"></iep-operation-search>
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
      @sort-change="sortChange"
      @selection-change="selectionChange"
    >
      <template slot="before-columns">
        <el-table-column label="ID" width="90px">
          <template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="200px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">
              {{
              scope.row.title
              }}
            </iep-table-link>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="150" sortable="custom" prop="createTime">
          <template slot-scope="scope">
            {{
            scope.row.createTime | parseToDay
            }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="150">
          <template slot-scope="scope">
            {{
            scope.row.updateTime | parseToDay
            }}
          </template>
        </el-table-column>
        <el-table-column label="浏览量" sortable="custom" width="120" prop="views">
          <template slot-scope="scope">{{ scope.row.views }}</template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="info_article_edit" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button v-if="info_article_del" type="text" @click="handleFalseDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-transfer-form ref="DialogTransferForm" @load-transfer="loadTransfer"></dialog-transfer-form>
  </div>
</template>
<script>
import { getPage, logicDeleteNodeById } from "@/api/conm/article_controller.ts";
import { columnsMap, dictsMap } from "./options.ts";
import mixins from "@/mixins/mixins";
// import { mapGetters } from "vuex";
import DialogTransferForm from "./DialogTransferForm";
import { hasPermissions } from "@/util/menu";
export default {
  mixins: [mixins],
  components: {
    DialogTransferForm,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [],
      id: "",
      siteId: "",
      nodeName: "",
      defaultValue: new Date(new Date().toLocaleDateString()).getTime(),
      sortList: {
        order: "",
        fieldName: "",
      },
      multipleSelection: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.siteId = this.$route.query.siteId;
    this.loadPage();
  },
  computed: {
    disabled() {
      return this.multipleSelection.length == 0 ? true : false;
    },
    info_article_add: () => hasPermissions("info_article_add"),
    info_article_edit: () => hasPermissions("info_article_edit"),
    info_article_del: () => hasPermissions("info_article_del"),
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: "/conm/document_management_edit/0",
        query: { nodeId: this.id, siteId: this.siteId },
      });
    },
    selectionChange(val) {
      this.multipleSelection = val.map(m => m.id);
    },
    handleEdit(row) {
      this.$router.push({
        path: `/conm/document_management_edit/${row.id}`,
        query: { nodeId: this.id, siteId: this.siteId },
      });
    },
    handleTransfer() {
      this.$refs["DialogTransferForm"].dialogShow = true;
      this.$refs["DialogTransferForm"].methodName = "迁移";
      this.$refs["DialogTransferForm"].articleIds = this.multipleSelection;
      this.$refs["DialogTransferForm"].loadPage();
    },
    loadTransfer() {
      this.$refs["DialogTransferForm"].dialogShow = false;
      this.loadPage();
    },
    sortChange(val) {
      this.sortList.order = val.order;
      this.sortList.fieldName = val.prop;
      this.loadPage();
      this.sortList = {
        order: "",
        fieldName: "",
      };
    },
    handleFalseDelete(row) {
      this._handleGlobalDeleteById(row.id, logicDeleteNodeById);
    },
    handleDetail(row) {
      this.$router.push(`/conm/document_management_detail/${row.id}`);
    },
    async loadPage(param = this.searchForm) {
      await this.loadTable(
        { ...this.sortList, ...param, nodeId: this.id, siteId: this.siteId },
        getPage,
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.aside-main ::v-deep .el-table th > .cell {
  display: -webkit-box;
}
</style>
