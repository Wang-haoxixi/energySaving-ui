<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="负面清单审核"></iep-page-header>
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
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleAgree(scope.row)">同意</el-button>
                <el-button type="text" @click="handleRefuse(scope.row)">拒绝</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
          <template
            #materialKind="{scope}"
          >{{dictsMap.materialKind[scope.row.materialKind] || "暂无"}}</template>
          <template
            #cmaterialKind="{scope}"
          >{{dictsMap.materialKind[scope.row.cmaterialKind] || "暂无"}}</template>
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
          prop: "sourceOrgName",
          label: "数源部门",
        },
        {
          prop: "cmaterialName",
          label: "材料名称",
        },
        {
          prop: "cmaterialKind",
          label: "材料类别",
          type: "slot",
        },
        {
          prop: "citemName",
          label: "信息项",
        },
        {
          prop: "refuseReason",
          label: "不共享理由",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          prop: "matterOrg",
          label: "数源部门",
        },
        {
          prop: "materialName",
          label: "材料名称",
        },
      ],
      dictsMap: {
        materialKind: {
          "1": "表格类",
          "2": "证明类",
          "3": "批文类",
          "4": "证照类",
          "5": "其他类",
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
    handleAgree() {},
    handleRefuse() {},
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
