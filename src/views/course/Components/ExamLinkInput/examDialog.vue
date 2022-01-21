<template>
  <iep-dialog :dialog-show="dialogShow" title="选择考试" width="900px" @close="_close()">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="examName"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :size="tableSize"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
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
import { getPageForCourse } from "@/api/qms/exam_examination";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  props: {
    id: {
      type: Number,
    },
  },
  data() {
    return {
      columnsMap: [
        {
          label: "ID",
          prop: "id",
          width: 75,
        },
        {
          label: "考试名称",
          prop: "examName",
          width: 200,
        },
        {
          label: "开始时间",
          prop: "beginTime",
          width: 100,
        },
        {
          label: "结束时间",
          prop: "endTime",
          width: 100,
        },
        {
          label: "创建者",
          prop: "createByName",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
      ],
      dialogShow: false,
      isLoadTable: false,
      operationOptions: [
        {
          name: "选择",
          func: this.handleSelect,
        },
      ],
      openScope: null,
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
    },
    load(params = this.searchForm) {
      this.openScope = params.openScope;
      params.id = this.id;
      this.loadTable(params, getPageForCourse);
    },
    // 这里他组建搜索用的是loadpage 但是列表用的又是load 没有统一导致我写2遍
    loadPage(params = this.searchForm) {
      params.openScope = this.openScope;
      params.id = this.id;
      this.loadTable(params, getPageForCourse);
    },
    handleSelect(row) {
      this.$confirm(`是否选择${row.examName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("dialog-select", row);
          this.close();
        })
        .catch(() => {});
    },
  },
};
</script>
