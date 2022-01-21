<template>
  <div class="suggest-manage">
    <iep-table
      :isLoadTable="tableLoading"
      :isPagination="false"
      :pagedTable="pendingList"
      :columnsMap="columnsMap"
    >
      <template
        slot="createTime"
        slot-scope="scope"
      >{{scope.scope.row.createTime|parseToTimeMinutes}}</template>
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
import { getSuggestPage } from "@/api/admin/suggest";
import { columnsMapSuggest as columnsMap } from "../options";
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
      const params = { status: "1" };
      const { data } = await getSuggestPage(params);
      if (data) {
        this.pendingList = data.records;
      }
      this.tableLoading = false;
    },

    handleCheck({ id }) {
      this.$openPage(`/operate/suggest_detail/${id}`);
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
