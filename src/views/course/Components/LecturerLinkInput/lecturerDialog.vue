<template>
  <iep-dialog :dialog-show="dialogShow" title="选择讲师" width="900px" @close="_close()">
    <iep-operation-container>
      <template slot="left">
        <el-button icon="el-icon-plus" @click="handleAdd()">添加讲师</el-button>
      </template>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" prop="lecturerName"></iep-operation-search>
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
    <DialogForm ref="DialogForm" @load-page="loadPage()"></DialogForm>
  </iep-dialog>
</template>
<script>
import DialogForm from "../../lecturer/DialogForm.vue";
import { getCourseLecturerPage } from "@/api/qms/course_lecturer";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  components: {
    DialogForm,
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
          label: "讲师名称",
          prop: "lecturerName",
        },
        {
          label: "关联课程数",
          prop: "courseNumber",
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 180,
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
      this.loadTable(params, getCourseLecturerPage);
    },
    // 这里他组建搜索用的是loadpage 但是列表用的又是load 没有统一导致我写2遍
    loadPage(params = this.searchForm) {
      params.openScope = this.openScope;
      this.loadTable(params, getCourseLecturerPage);
    },
    handleSelect(row) {
      this.$confirm(`是否选择${row.lecturerName}`, "提示", {
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
    handleAdd() {
      this.$refs["DialogForm"].add();
    },
  },
};
</script>
