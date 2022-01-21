<template>
  <iep-dialog :dialog-show="dialogShow" title="选择课件" width="900px" @close="_close()">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="wareName">
          <AdvanceSearch @search-page="searchPage"></AdvanceSearch>
        </iep-operation-search>
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
import AdvanceSearch from "../../courseware/AdvanceSearch";
import { getCourseCoursewarePage } from "@/api/qms/course_courseware";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data() {
    return {
      columnsMap: [
        {
          prop: "wareName",
          label: "文件名",
        },
        {
          prop: "type",
          label: "类型",
          type: "dictGroup",
          dictName: "course_ware_type",
        },
        {
          prop: "wareSize",
          label: "大小",
        },
        {
          prop: "createTime",
          label: "上传时间",
        },
        {
          prop: "createByName",
          label: "创建者",
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
      // this.openScope = params.openScope;
      this.loadTable(params, getCourseCoursewarePage);
    },
    // 这里他组建搜索用的是loadpage 但是列表用的又是load 没有统一导致我写2遍
    loadPage(params = this.searchForm) {
      // params.openScope = this.openScope;
      this.loadTable(params, getCourseCoursewarePage);
    },
    handleSelect(row) {
      this.$confirm(`是否选择${row.wareName}`, "提示", {
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
