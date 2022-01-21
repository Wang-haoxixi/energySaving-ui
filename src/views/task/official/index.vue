<template>
  <iep-basic-container class="basic-container">
    <div class="page" v-show="pageState === 'list'">
      <iep-page-header title="任务管理"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate" class="button">新增</el-button>
          <el-checkbox v-model="queryForm.isWorkshop" false-label :true-label="1">已同步至工场</el-checkbox>
        </template>
        <template slot="right">
          <SearchTpl @searchPage="searchPage"></SearchTpl>
        </template>
      </iep-operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        :dictsMap="dictsMaps"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <template slot="title" slot-scope="scope">
          <div
            class="row-title"
            :title="scope.scope.row.title"
            @click="handleDetail(scope.scope.row)"
          >{{scope.scope.row.title}}</div>
        </template>
        <template slot="finishTime" slot-scope="{scope}">
          <div
            class="row-finishTime"
            v-if="scope.row.type === '0'"
          >{{scope.row.finishTime|parseToTimeMinutes}}</div>
          <div class="row-finishTime" v-else>{{`已重复${scope.row.repeatTime}次`}}</div>
        </template>
        <template slot="orgName" slot-scope="{scope}">
          <div
            class="nowrap"
            :title="scope.row.orgName"
          >{{scope.row.orgId === 0 ? "官方" : scope.row.orgName}}</div>
        </template>
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </div>
    <!-- 新建表单 -->
    <CreateDialog ref="create" @load_page="loadData"></CreateDialog>
    <!-- 详情 -->
    <DetailTpl
      isOfficial
      class="detail"
      ref="detail"
      v-if="pageState === 'detail'"
      @backPage="backPage"
      isBack
    ></DetailTpl>
    <!-- 删除 -->
    <DeleteDialog ref="deleteDialog" @load-page="loadPage"></DeleteDialog>
    <!-- 下架 -->
    <ShelfDialog ref="shelfDialog" @load-page="loadPage"></ShelfDialog>
  </iep-basic-container>
</template>
<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, dictsMaps } from "./options";
import { getOperationTaskPage } from "@/api/qms/cooperation_list";
import {
  operationDelete,
  offTheShelfByOfficial,
} from "@/api/qms/cooperation_task";
import { mapGetters } from "vuex";
import SearchTpl from "./searchForm";
import DetailTpl from "../detail/index.vue";
import CreateDialog from "./form/create";
import DeleteDialog from "./deleteDialog";
import ShelfDialog from "./shelfDialog";

export default {
  mixins: [mixins, operationMixins],
  components: { SearchTpl, DetailTpl, CreateDialog, DeleteDialog, ShelfDialog },
  data() {
    return {
      columnsMap,
      dictsMaps,
      selectList: [],
      pageState: "list",
      queryForm: {
        isWorkshop: "",
      },
      operationOptions: [
        {
          name: "上架",
          func: this.handleShelf,
          hidden: row => {
            return row.isOfficial === "1" || row.isWorkshop !== "2";
          },
        },
        {
          name: "下架",
          func: this.handleShelf,
          hidden: row => {
            return (
              row.isOfficial === "1" ||
              (row.isOfficial === "0" && row.isWorkshop !== "1")
            );
          },
        },
        {
          name: "编辑",
          func: this.handleUpdate,
          hidden: row => {
            return row.isOfficial === "0" || row.state !== "0";
          },
        },
        {
          name: "删除",
          func: this.handleDeteleById,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  methods: {
    loadPage(params = Object.assign({}, this.searchForm, this.queryForm)) {
      this.loadTable(params, getOperationTaskPage);
    },
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    loadData() {
      const params = Object.assign({}, this.queryForm, this.searchForm);
      let obj = { current: 1, size: 10 };
      obj = Object.assign({}, obj, params);
      this.loadPage(obj);
    },
    // 新增
    handleCreate() {
      this.$refs.create.loadData();
    },
    // 编辑
    handleUpdate(row) {
      this.$refs.create.loadData(row);
    },
    // 详情
    handleDetail(row) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs["detail"].loadData(row.id);
      });
    },
    // 上下架
    handleShelf(row) {
      if (row.isWorkshop === "1") {
        // 同步至工场的任务进行下架
        this.$refs.shelfDialog.open(row.id);
      } else {
        // 反之进行上架
        offTheShelfByOfficial({
          id: row.id,
          offTheShelf: 1,
        }).then(({ data }) => {
          if (data) {
            this.$message.success("上架成功！");
            this.loadPage();
          }
        });
      }
    },
    handleDeteleById(row) {
      if (row.isOfficial === "0") {
        this.$refs.deleteDialog.open(row.id);
      } else {
        this._handleComfirm(
          { taskId: row.id },
          operationDelete,
          "删除任务",
          "是否确认删除此条任务",
        );
      }
    },
  },
  created() {
    this.loadPage();
  },
  watch: {
    "queryForm.isWorkshop"() {
      this.searchPage();
    },
  },
};
</script>
<style scoped lang="scss">
.basic-container {
  .button {
    height: 36px;
    border-radius: 10px;
  }
  &::v-deep .left {
    width: auto;
  }
  .row-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    cursor: pointer;
  }
  .nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>
