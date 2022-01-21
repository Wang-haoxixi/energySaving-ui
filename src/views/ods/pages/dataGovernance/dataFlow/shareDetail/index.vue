<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="共享明细"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <template slot="left">
            <!-- <iep-button type="primary" icon="el-icon-plus" plain @click="handleCreate">新增</iep-button> -->
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
          <template
            #cmaterialKind="{scope}"
          >{{dictsMap.materialKind[scope.row.cmaterialKind] || "暂无"}}</template>
          <template #directoryList="{scope}">
            <el-button
              size="small"
              @click="handleMenuCompilation(scope.row)"
              type="text"
              v-if="scope.row.dirCount== 0"
            >目录编制</el-button>
            <el-button
              size="small"
              @click="handleMenuCompilation(scope.row)"
              type="text"
              style="color: gray;"
              v-else
            >已编目{{scope.row.dirCount}}条</el-button>
          </template>
          <template #interfaceList="{scope}">
            <el-button
              size="small"
              @click="handleInterface(scope.row)"
              type="text"
              v-if="!scope.row.interfacesIds || scope.row.interfacesIds.length === 0"
            >关联接口</el-button>
            <el-button
              size="small"
              @click="handleInterface(scope.row)"
              type="text"
              style="color: gray;"
              v-else
            >已关联{{(scope.row.interfacesIds && scope.row.interfacesIds.length) ? scope.row.interfacesIds.length : 0}}条</el-button>
          </template>
          <template #updateCycle="{scope}">
            <el-button
              size="small"
              @click="handleUpdateCycle(scope.row)"
              type="text"
              v-if="!scope.row.updatePeriod"
            >填写</el-button>
            <el-button
              size="small"
              @click="handleUpdateCycle(scope.row)"
              type="text"
              style="color: gray;"
              v-else
            >{{dictsMap.updatePeriod[scope.row.updatePeriod]}}</el-button>
          </template>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <directoryDialog ref="directoryDialog"></directoryDialog>
    <interfaceDialog ref="interfaceDialog"></interfaceDialog>
    <writeDialog ref="writeDialog"></writeDialog>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import directoryDialog from "./directoryDialog";
import interfaceDialog from "./interfaceDialog";
import writeDialog from "./writeDialog";
export default {
  mixins: [mixins],
  components: { FormTpl, directoryDialog, interfaceDialog, writeDialog },
  data() {
    return {
      columnsMap: [
        {
          label: "数源部门",
          prop: "sourceOrgName",
        },
        {
          label: "材料类别",
          prop: "cmaterialKind",
          type: "slot",
        },
        {
          label: "材料名称",
          prop: "cmaterialName",
        },
        {
          label: "需求部门",
          prop: "deptIdName",
        },
        {
          label: "关联目录",
          prop: "directoryList",
          type: "slot",
        },
        {
          label: "关联接口",
          prop: "interfaceList",
          type: "slot",
        },
        {
          label: "数据更新周期",
          prop: "updateCycle",
          type: "slot",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [{ label: "材料名称", prop: "cmaterialName" }],
      dictsMap: {
        materialKind: {
          "1": "表格类",
          "2": "证明类",
          "3": "批文类",
          "4": "证照类",
          "5": "其他类",
        },
        updatePeriod: {
          "1": "每日",
          "2": "每周",
          "3": "每月",
          "4": "每季度",
          "5": "每半年",
          "6": "每年",
          "7": "不更新",
          "8": "不定期",
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
    handleUpdateCycle(row) {
      this.$refs.writeDialog.dialogShow = true;
      this.$refs.writeDialog.open(row);
    },
    handleInterface(row) {
      this.$refs.interfaceDialog.dialogShow = true;
      this.$refs.interfaceDialog.open(row);
    },
    handleMenuCompilation(row) {
      this.$refs.directoryDialog.dialogShow = true;
      this.$refs.directoryDialog.open(row);
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
    // handleEdit(row) {
    //   this.pageState = "form";
    //   this.formStatus = "edit";
    //   this.$nextTick(() => {
    //     this.$refs["form"].open(row);
    //   });
    // },
    // handleCreate() {
    //   this.pageState = "form";
    //   this.formStatus = "create";
    //   this.$nextTick(() => {
    //     this.$refs["form"].open({});
    //   });
    // },
    // handleDeleteById() {
    //   this.$confirm(`是否删除`, "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(async () => {
    //     this.$message({
    //       type: "success",
    //       message: `删除成功!`,
    //     });
    //   });
    // },
  },
};
</script>
