<template>
  <div class="activity-manage">
    <iep-table
      :isLoadTable="tableLoading"
      :isPagination="false"
      :pagedTable="pendingList"
      :columnsMap="columnsMap"
    >
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click="handleCheck(scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getReviewPage } from "@/api/meetting/publish";
import { columnsMapActivity as columnsMap } from "../options";
export default {
  mixins: [operationMixins],
  data() {
    return {
      pendingList: [],
      dialogShow: false,
      loading: false,
      dialogObj: {},
      columnsMap,
      tableLoading: false,
    };
  },
  methods: {
    async getPage() {
      this.tableLoading = true;
      const { data } = await getReviewPage();
      if (data) {
        this.pendingList = data.records;
      }
      this.tableLoading = false;
    },

    handleCheck() {
      this.$openPage(`/conm/review`);
    },
    backPage() {
      this.dialogShow = false;
    },
    _close() {
      this.getPage();
      this.dialogShow = false;
    },
  },
  created() {
    this.getPage();
  },
};
</script>
<style lang="scss" scoped>
</style>
