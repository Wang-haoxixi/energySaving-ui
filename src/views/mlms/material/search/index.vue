<template>
  <iep-dialog
    :dialog-show="dialogVisible"
    title="生态搜索"
    width="800px"
    center
    @close="closed"
    closeOnClickModal
  >
    <iep-operation-container>
      <template slot="left">
        <iep-button plain @click="handleCollect" class="button">收藏到本组织</iep-button>
      </template>
      <template slot="right">
        <SearchForm @searchPage="searchPage"></SearchForm>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      isMutipleSelection
      @selection-change="selectionChange"
    >
      <template slot="downloadCost" slot-scope="{scope}">
        <div>{{scope.row.downloadCost > 0 ? `${scope.row.downloadCost}宝贝` : '免费'}}</div>
      </template>
      <IepOperationTableBtnGroup :options="operationOptions" label="操作" :width="80"></IepOperationTableBtnGroup>
    </iep-table>
    <payDialog ref="pay" @suceess_pay="suceessPay"></payDialog>
  </iep-dialog>
</template>

<script>
import mixins from "@/mixins/mixins";
import { getEcologicSearchPage, freePayment } from "@/api/dms/material";
import payDialog from "../payDialog";
import SearchForm from "./searchForm";
import { tableOption } from "./options";
export default {
  components: { payDialog, SearchForm },
  mixins: [mixins],
  data() {
    return {
      dialogVisible: false,
      columnsMap: tableOption,
      list: [],
      operationOptions: [
        {
          name: "预览",
          func: this.handleDetail,
          hidden: false,
        },
      ],
    };
  },
  methods: {
    suceessPay() {
      this.loadPage();
    },
    open() {
      this.dialogVisible = true;
      this.loadPage();
    },
    closed() {
      this.searchForm = {};
      this.dialogVisible = false;
    },
    loadPage(params = Object.assign({}, this.searchForm, this.queryFrom)) {
      this.loadTable(params, getEcologicSearchPage);
    },
    selectionChange(val) {
      this.list = [...val];
    },
    handleCollect() {
      if (this.list.length === 0) {
        this.$message.warning("请先选择要收藏的材料");
        return false;
      }
      let cost = 0;
      for (const item of this.list) {
        cost += item.downloadCost;
      }
      if (cost > 0) {
        let ids = this.list.map((m) => m.id);
        ids = ids.join(",");
        this.$refs.pay.open({
          id: ids,
          downloadCost: cost,
          payTitle: "购买专栏",
          isSo: true,
        });
      } else {
        const ids = this.list.map((m) => m.id);
        freePayment({ idsList: ids }).then(({ data }) => {
          if (data) {
            this.$message.success("收藏成功！");
            this.loadPage();
          }
        });
      }
    },
    handleDetail(row) {
      this.$openPage(`/channel/material/detail/${row.id}`, 2);
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
</style>
