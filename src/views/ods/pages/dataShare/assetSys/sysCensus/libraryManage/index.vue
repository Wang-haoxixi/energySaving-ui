<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="库表管理"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
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
          label: "所属单位",
          prop: "commonDataMetaName",
        },
        {
          label: "数据库英文名称",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "数据库中文名称",
          prop: "commonDataMetaNumber",
        },
        {
          label: "所属信息系统",
          prop: "commonDataMetaValue",
        },
        {
          label: "数据库类型",
          prop: "govStandardDocumentsId",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        { label: "数据库中文名称", prop: "matterName", type: "input" },
        { label: "所属单位", prop: "matterName", type: "input" },
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
