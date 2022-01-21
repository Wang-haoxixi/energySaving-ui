<template>
  <iep-dialog
    :dialog-show="dialogShow"
    :title="`排序管理（排序操作为动态保存）`"
    width="700px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <iep-tabs v-model="type" :tab-list="tabList" @tab-click="changeType"></iep-tabs>
    <iep-table
      :isLoadTable="isLoadTable"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      :isPagination="false"
    >
      <iep-operation-table-btn-group :options="operationOptions" :count="3" :width="150"></iep-operation-table-btn-group>
    </iep-table>
  </iep-dialog>
</template>
<script>
import {
  getAdvancePage,
  setAdvanceProduct,
  advanceChangeOrder,
} from "@/api/dms/product";
import operationMixins from "@/mixins/operationMixins";
import { tabListAll as tabList } from "@/views/channel/MoFang/options.ts";
export function debounce(func, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
export default {
  mixins: [operationMixins],
  data() {
    return {
      type: 0,
      dialogShow: false,
      isLoadTable: false,
      moveLoading: false,
      pagedTable: [],
      operationOptions: [
        {
          name: "上移",
          func: this.handleUp,
        },
        {
          name: "下移",
          func: this.handleDown,
        },
        {
          name: "移除",
          func: this.handleRemove,
        },
      ],
      tabList,
    };
  },
  computed: {
    columnsMap() {
      return [
        {
          prop: "id",
          label: "ID",
          width: 55,
        },
        {
          prop: "name",
          label: "名称",
        },
      ];
    },
    ids() {
      return this.pagedTable.map(m => m.id);
    },
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    async loadPage() {
      this.isLoadTable = true;
      const { data } = await getAdvancePage(this.type);
      this.pagedTable = data;
      this.isLoadTable = false;
    },
    handleUp(scope) {
      const i = this.pagedTable.findIndex(m => scope.id === m.id);
      const f = this.pagedTable.splice(i, 1)[0];
      const idx = i - 1 > 0 ? i - 1 : 0;
      this.pagedTable.splice(idx, 0, f);
      this.moveLoading = true;
    },
    handleDown(scope) {
      const i = this.pagedTable.findIndex(m => scope.id === m.id);
      const n = this.pagedTable.length - 1;
      const f = this.pagedTable.splice(i, 1)[0];
      const idx = i + 1 < n ? i + 1 : n;
      this.pagedTable.splice(idx, 0, f);
      this.moveLoading = true;
    },
    handleRemove(row) {
      this._handleComfirm(row.id, setAdvanceProduct, "移除");
    },
    changeType() {
      this.loadPage();
    },
  },
  mounted() {
    this.$watch(
      "ids",
      debounce(async ids => {
        if (this.moveLoading) {
          const { data } = await advanceChangeOrder(ids);
          if (data) {
            this.$message("正在保存当前排序...");
            this.loadPage();
          }
          this.moveLoading = false;
        }
      }, 1500),
    );
  },
};
</script>
