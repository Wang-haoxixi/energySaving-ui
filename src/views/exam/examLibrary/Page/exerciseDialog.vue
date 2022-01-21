<template>
  <iep-dialog :dialog-show="dialogShow" title="选择练习" width="900px" @close="_close()">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="examName"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMapExercise"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      <template #beginTime="{scope}">{{scope.row.beginTime|parseToDay}}</template>
      <template #endTime="{scope}">{{scope.row.endTime|parseToDay}}</template>
      <template #state="{scope}">{{dictsMap.state[scope.row.state]}}</template>
    </iep-table>
  </iep-dialog>
</template>
<script>
import { getExeStatePage } from "@/api/qms/exam_exercise";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
import { columnsMapExercise, dictsMap } from "../../const/pageOptions";
import selfMixins from "../../const/selfMixin";
export default {
  mixins: [mixins, operationMixins, selfMixins],
  data() {
    return {
      columnsMapExercise,
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
      openScope: 1,
    };
  },
  props: ["selectOption"],
  created() {
    // this.loadTestDict();
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    // async loadTestDict() {
    //   const type = 2;
    //   const params = {};
    //   params.category = type;
    //   const { data } = await getPage(params);
    //   this.res = data;
    //   this.type = type;
    //   if (!this.cn.length) {
    //     this.cn = this.saveFlatten(this.cn, this.res.children);
    //   }
    // },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    load(params = this.searchForm) {
      if (this.selectOption.length > 0) {
        params.ids = this.selectOption;
      }
      params.openScope = this.openScope;
      this.loadTable(params, getExeStatePage);
    },
    // 这里他组建搜索用的是loadpage 但是列表用的又是load 没有统一导致我写2遍
    loadPage(params = this.searchForm) {
      if (this.selectOption.length > 0) {
        params.ids = this.selectOption;
      }
      params.openScope = this.openScope;
      this.loadTable(params, getExeStatePage);
    },
    handleSelect(row) {
      this.$confirm(`是否选择${row.examName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("dialog-select", row);
          this._close();
        })
        .catch(() => {});
    },
    // dealKindDict(row) {
    //   const selectArray = row.split(",").map(i => Number(i));
    //   const selectCn = this.dealCn(this.cn, selectArray);
    //   return selectCn;
    // },
  },
};
</script>
