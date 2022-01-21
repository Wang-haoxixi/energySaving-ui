<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="需求审核"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :dictsMap="dictsMap"
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleAudit(scope.row)">审核</el-button>
                <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <checkDialog ref="checkDialog" :dialogStatus="dialogStatus"></checkDialog>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import { dictsMap } from "./option";
import checkDialog from "./checkDialog";
export default {
  mixins: [mixins],
  components: { FormTpl, checkDialog },
  data() {
    return {
      dictsMap,
      columnsMap: [
        {
          label: "项目类型",
          prop: "projectType",
        },
        {
          label: "建设单位",
          prop: "deptId",
        },
        {
          label: "项目名称",
          prop: "projectName",
        },
        {
          label: "项目负责人",
          prop: "person1",
        },
        {
          label: "项目联系人",
          prop: "person2",
        },
        {
          label: "申报项目总投资(万元)",
          prop: "money",
        },
        {
          label: "行业类别",
          prop: "status1",
        },
        {
          label: "业务类型",
          prop: "status",
        },
        {
          label: "建设期",
          prop: "degree",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      dialogStatus: "dialogStatus",
      searchOption: [
        {
          label: "项目名称",
          prop: "projectName",
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
    handleAudit() {
      this.dialogStatus = "create";
      this.$refs.checkDialog.dialogShow = true;
      this.$refs.checkDialog.open({});
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
  },
};
</script>
