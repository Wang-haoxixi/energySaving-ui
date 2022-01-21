<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="权责登记"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <template slot="left">
            <iep-button type="primary" icon="el-icon-plus" plain @click="handleCreate">新增</iep-button>
          </template>
        </iep-operation-container>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <template #authLevel="{scope}">{{dictsMap.authLevel[scope.row.authLevel] || "暂无"}}</template>
          <template #dutyTypeArras="{scope}">{{getAuditStateName(scope.row.dutyTypeArras)}}</template>
          <template #auditState="{scope}">{{dictsMap.auditState[scope.row.auditState] || "暂无"}}</template>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDeleteById(scope.row)">删除</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
export default {
  mixins: [mixins],
  components: { FormTpl },
  data() {
    return {
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "权责名称",
          prop: "dutyName",
        },
        {
          label: "权责编码",
          prop: "dutyCode",
        },
        {
          label: "实施主体",
          prop: "orgName",
        },
        {
          label: "行使层级",
          prop: "authLevel",
          type: "slot",
        },
        {
          label: "类型",
          prop: "dutyTypeArras",
          type: "slot",
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
          label: "权责名称",
          prop: "dutyName",
        },
        {
          label: "权责编码",
          prop: "dutyCode",
        },
        {
          label: "实施主体",
          prop: "deptId",
          type: "dept",
        },
        {
          label: "行使层级",
          prop: "authLevel",
          type: "select",
          dicData: [
            { label: "国家级", value: "1" },
            { label: "省级", value: "2" },
            { label: "市级", value: "3" },
            { label: "县级", value: "4" },
          ],
        },
        {
          label: "类型",
          prop: "dutyTypeArras",
          type: "cascader",
          dicData: [
            {
              label: "行政权力",
              value: "1",
              children: [
                { label: "行政许可", value: "3" },
                { label: "行政处罚", value: "4" },
                { label: "行政强制", value: "5" },
                { label: "行政征收", value: "6" },
                { label: "行政给付", value: "7" },
                { label: "行政检查", value: "8" },
                { label: "行政确认", value: "9" },
                { label: "行政奖励", value: "10" },
                { label: "行政裁决", value: "11" },
                { label: "其他行政权力", value: "12" },
              ],
            },
            { label: "公共服务", value: "2" },
          ],
        },
      ],
      dictsMap: {
        authLevel: {
          "1": "国家级",
          "2": "省级",
          "3": "市级",
          "4": "县级",
        },
        dutyTypeArras: {
          "1": "行政权力",
          "2": "公共服务",
          "3": "行政许可",
          "4": "行政处罚",
          "5": "行政强制",
          "6": "行政征收",
          "7": "行政给付",
          "8": "行政检查",
          "9": "行政确认",
          "10": "行政奖励",
          "11": "行政裁决",
          "12": "其他行政权力",
        },
        auditState: {
          "1": "待完善",
          "2": "待提交",
          "3": "待审核",
          "4": "审核通过",
          "5": "审核驳回",
          "6": "已发布",
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
    getAuditStateName(auditState) {
      if (!auditState && auditState.length === 0) {
        return "暂无";
      }
      let names = "";
      auditState.forEach(item => {
        names += this.dictsMap.dutyTypeArras[item] + " | ";
      });
      return names.slice(0, names.length - 3);
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
    handleCreate() {
      this.pageState = "form";
      this.formStatus = "create";
      this.$nextTick(() => {
        this.$refs["form"].open({});
      });
    },
    handleDeleteById() {
      this.$confirm(`是否删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type: "success",
          message: `删除成功!`,
        });
      });
    },
  },
};
</script>
