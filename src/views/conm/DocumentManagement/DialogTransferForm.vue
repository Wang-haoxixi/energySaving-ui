<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`文章${methodName}`"
    width="900px"
    @close="dialogShow = false"
  >
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
      is-tree
    >
      <template slot="before-columns">
        <el-table-column label="ID" width="90px">
          <template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <iep-operation-wrapper>
            <el-button type="text" @click.stop="handleSelect(scope.row)">选择迁移</el-button>
          </iep-operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <template slot="footer">
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPage } from "@/api/conm/node_controller.ts";
import { postTransferNode } from "@/api/conm/article_controller.ts";
import { columnsMap, dictsMap } from "../ColumnManagement/options";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      dictsMap,
      columnsMap,
      methodName: "创建",
      pagedTable: [],
      siteId: "",
      articleIds: [],
    };
  },
  created() {
    this.siteId = this.$route.query.siteId;
  },
  computed: {
    ...mapGetters(["permissions", "tableSize"]),
  },
  methods: {
    handleSelect(row) {
      this.$confirm("此操作将选择迁移到该栏目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        postTransferNode({ nodeId: row.id, articleIds: this.articleIds }).then(
          res => {
            if (res.data.data) {
              this.$message({
                type: "success",
                message: "迁移成功!",
              });
            } else {
              this.$message({
                type: "info",
                message: `迁移失败，${res.data.msg}`,
              });
            }
            this.$emit("load-transfer");
          },
        );
      });
    },
    async loadPage(param = this.searchForm) {
      await this.loadTable({ ...param, siteId: this.siteId }, getPage);
    },
  },
};
</script>
