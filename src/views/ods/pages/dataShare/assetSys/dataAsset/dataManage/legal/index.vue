<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="法人单位基础库"></iep-page-header>
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
          label: "信息资源名称",
          prop: "commonDataMetaName",
        },
        {
          label: "资源提供方",
          prop: "commonDataMetaNameEn",
        },
        {
          label: "所属系统",
          prop: "commonDataMetaNumber",
        },
        {
          label: "归集状态",
          prop: "commonDataMetaValue",
        },
        {
          label: "状态",
          prop: "govStandardDocumentsId",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        { label: "信息资源名称", prop: "matterName", type: "input" },
        {
          label: "状态",
          prop: "sszt",
          type: "select",
          dicData: [
            { label: "是", value: 0 },
            { label: "否", value: 1 },
          ],
        },
        { label: "信息资源提供方", prop: "matterName", type: "input" },
        { label: "所属系统", prop: "matterName", type: "input" },
        { label: "归集状态", prop: "matterName", type: "input" },
        { label: "开放属性", prop: "matterName", type: "input" },
        { label: "共享属性", prop: "matterName", type: "input" },
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
