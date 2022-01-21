<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="审核退回"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <!-- <template slot="left">
            <iep-button type="primary" icon="el-icon-plus" plain @click="handleCreate">新增</iep-button>
          </template>-->
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
        ></iep-table>
      </iep-basic-container>
    </div>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  mixins: [mixins],
  data() {
    return {
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "项目编号",
          prop: "num",
        },
        {
          label: "项目类型",
          prop: "projectType",
        },
        {
          label: "起始年度",
          prop: "startYear",
        },
        {
          label: "项目名称",
          prop: "projectName",
        },
        {
          label: "建设单位",
          prop: "declareDept",
        },
        {
          label: "申报项目总投资(万元)",
          prop: "money1",
        },
        {
          label: "其中:市财政资金(万元)",
          prop: "money2",
        },
        {
          label: "申请资金类型",
          prop: "status",
        },
        {
          label: "退回理由",
          prop: "review",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          prop: "projectName",
          label: "项目名称",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleAgree(row) {
      console.log(row);
    },
    handleDisagree(row) {
      console.log(row);
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
