<template>
  <iep-dialog :dialog-show="dialogShow" title="选择试卷" width="900px" @close="_close()">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="title"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <template #kind="{scope}">
        <div>{{dealKindDict(scope.row.kind)}}</div>
      </template>
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
import {
  getExamtestpaperPage,
  getTestDictPage,
} from "@/api/qms/test_questions_library";
import { columnsMap, dictsMap } from "../../const/pageOptions";
import selfMixins from "../../const/selfMixin";
export default {
  mixins: [mixins, operationMixins, selfMixins],
  data() {
    return {
      columnsMap,
      dictsMap,
      disabled: false,
      dialogShow: false,
      formRequestFn: () => {},
      options: [],
      isLoadTable: false,
      id: 0,
      operationOptions: [
        {
          name: "选择",
          func: this.handleSelect,
          hidden: false,
          disabled: false,
        },
      ],
      cn: [],
      type: 1,
    };
  },
  created() {
    this.loadTestDict();
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    async loadTestDict() {
      const type = 2;
      const params = {};
      params.category = type;
      const { data } = await getTestDictPage(params);
      this.res = data;
      this.type = type;
      if (!this.cn.length) {
        this.cn = this.saveFlatten(this.cn, this.res.children);
      }
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    load(type) {
      if (type === 2) {
        this.type = 2;
      } else {
        this.type = 1;
      }
      if (this.type === 2) {
        const params = { showScore: "1" };
        this.loadTable(params, getExamtestpaperPage);
      } else {
        this.loadTable(null, getExamtestpaperPage);
      }
    },
    // 这里他组建搜索用的是loadpage 但是列表用的又是load 没有统一导致我写2遍
    loadPage(params = this.searchForm) {
      if (this.type === 2) {
        params.showScore = "1";
      }
      this.loadTable(params, getExamtestpaperPage);
    },
    handleSelect(row) {
      this.$confirm(`是否选择${row.title}试卷`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("dialog-paper-select", row);
          this._close();
        })
        .catch(() => {});
    },
    dealKindDict(row) {
      const selectArray = row.split(",").map(i => Number(i));
      const selectCn = this.dealCn(this.cn, selectArray);
      return selectCn;
    },
  },
};
</script>
