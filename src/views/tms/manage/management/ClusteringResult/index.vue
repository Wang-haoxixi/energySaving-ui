
<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增中心词</el-button>
        <iep-button @click="ExportGovernanceWords">导出治理词</iep-button>
        <iep-button @click="ExportStandardTagLibrary">导出标准标签库</iep-button>
      </template>
      <template slot="right">
        <iep-operation-search placeholder="请输入关键词" @search-page="searchPage" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      class="table"
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :pagination="pagination"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template slot="before-columns">
        <el-table-column label="ID" width="80">
          <template slot-scope="scope">{{scope.row.tagId}}</template>
        </el-table-column>
        <el-table-column label="中心词名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="标签级别">
          <template slot-scope="scope">{{scope.row.levelName}}</template>
        </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            <div>{{scope.row.typeVos.length>0?scope.row.typeVos.map(m=>m.name).join('、'):"暂无"}}</div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="更新时间" width="190">
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>

      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
    <add-dialog ref="AddDialog" @load-page="loadPage"></add-dialog>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import {
  getResultCenterPage,
  addCenterWord,
  releaseCenterById,
  getExportLabel,
  getExportStandard,
} from "@/api/tms/management";
import AdvanceSearch from "./AdvanceSearch";
import addDialog from "./addDialog";
export default {
  mixins: [mixins],
  components: { AdvanceSearch, addDialog },
  data() {
    return {
      operationOptions: [
        {
          name: "卫星词",
          func: this.handleEdit,
        },
        {
          name: "释放",
          func: this.handleFreed,
        },
      ],
      columnsMap: [
        {
          prop: "refers",
          label: "引用次数",
        },
        {
          prop: "views",
          label: "点击量",
        },
      ],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleAdd() {
      this.$refs["AddDialog"].dialogShow = true;
      this.$refs["AddDialog"].loadPage();
      this.$refs["AddDialog"].formRequestFn = addCenterWord;
      this.$refs["AddDialog"].methodName = "新增";
    },
    handleCreate() {},
    handleExport() {
      if (!this.multipleSelection.length) {
        this.$message("请先选择需要的选项");
        return;
      }
    },
    handleEdit(row) {
      this.$router.push(`/tms/manage/management/edit/${row.tagId}`);
    },
    loadPage(param = this.searchForm) {
      this.loadTable({ ...param }, getResultCenterPage);
    },
    //释放中心词
    handleFreed(row) {
      this.$confirm("此操作将永久释放该中心词, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        releaseCenterById(row.tagId).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "释放成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: `释放失败，${res.msg}`,
            });
          }
          this.loadPage();
        });
      });
    },
    ExportGovernanceWords() {
      getExportLabel().then(() => {});
    },
    ExportStandardTagLibrary() {
      getExportStandard().then(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.table ::v-deep .el-button {
  margin-right: 0;
}
</style>
