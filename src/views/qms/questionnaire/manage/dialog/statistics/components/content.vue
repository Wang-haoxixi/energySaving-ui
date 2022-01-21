<template>
  <div class="content-wrapper">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="userName"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="{}"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleView(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-view ref="dialogView"></dialog-view>
  </div>
</template>
<script>
import { getPage } from "@/api/qms/answer";
import mixins from "@/mixins/mixins";
import { pageOption } from "@/const/pageConfig";
import DialogView from "../../view/dialog";
export default {
  mixins: [mixins],
  props: {
    questionnaireId: {
      type: [Number, String],
      default: "",
    },
  },
  components: {
    DialogView,
  },
  data() {
    return {
      id: 0,
      pagedTable: [],
      isLoadTable: false,
      columnsMap: [
        {
          prop: "userName",
          label: "姓名",
        },
        {
          prop: "mobile",
          label: "手机号",
        },
        {
          prop: "create_time",
          label: "填写时间",
        },
      ],
    };
  },
  methods: {
    getList(id) {
      this.id = id;
      this.loadPage();
    },
    async loadPage(params = this.searchForm) {
      await this.loadTable({ ...params }, getPage(this.id));
    },
    // 详情
    handleView(row) {
      this.$nextTick(() => {
        this.$refs.dialogView.open({
          id: row.questionnaireId,
          type: "answer",
          batch_no: row.batch_no,
        });
      });
    },
    resetData() {
      this.pagedTable = [];
    },
    // 分页初始化
    _pageOption() {
      return pageOption(this.iepPageSize);
    },
  },
};
</script>
<style lang="scss" scoped>
.content-wrapper ::v-deep .input-wrapper {
  margin-bottom: 20px;
}
</style>
