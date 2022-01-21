<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="通用事项数据请求"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <template slot="left">
            <iep-button plain @click="batchComfirme">批量确认</iep-button>
          </template>
        </iep-operation-container>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isMutipleSelection="true"
          @selection-change="handleSelectionChange"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <template #auditState="{scope}">{{dictsMap.auditState[scope.row.auditState] || "暂无"}}</template>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  @click="handleCommit(scope.row)"
                  v-if="scope.row.auditState === '2'"
                >提交</el-button>
                <el-button type="text" @click="handleHistory(scope.row)">历史版本</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <history ref="history" v-if="pageState === 'history'" @load-page="backPage"></history>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import history from "./history";
export default {
  mixins: [mixins],
  components: { FormTpl, history },
  data() {
    return {
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "需求部门",
          prop: "deptIdName",
        },
        {
          label: "事项名称",
          prop: "matterName",
        },
        {
          label: "基本编码",
          prop: "matterCode",
        },
        {
          label: "状态",
          prop: "auditState",
          type: "slot",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          label: "事项名称",
          prop: "matterName",
        },
        {
          label: "状态",
          prop: "auditState",
          type: "select",
          dicData: [
            {
              type: "ready",
              value: "2",
              label: "需求未提交",
            },
            {
              type: "success",
              value: "3",
              label: "已提交/数源部门未确认",
            },
            {
              type: "danger",
              value: "4",
              label: "数源部门已确认",
            },
          ],
        },
      ],
      dictsMap: {
        auditState: {
          "2": "需求未提交",
          "3": "已提交/数源部门未确认",
          "4": "数源部门已确认",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleHistory() {
      this.pageState = "history";
    },
    batchComfirme() {
      this.$confirm(`已勾选的无法再次勾选,是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `操作成功!`,
        });
      });
    },
    handleSelectionChange() {
      // console.log(val);
    },
    loadPage(fn = m => m) {
      this.isLoadTable = true;
      const { records, size, total, current } = this.mockData.data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    handleDetail(row) {
      this.pageState = "form";
      this.formStatus = "detail";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    handleEdit(row) {
      this.pageState = "form";
      this.formStatus = "edit";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    handleCommit() {
      this.$confirm(`是否确认提交该数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `操作成功!`,
        });
      });
    },
  },
};
</script>
