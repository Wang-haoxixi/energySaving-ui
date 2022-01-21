<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="模型建库"></iep-page-header>
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
          :dictsMap="dictsMap"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <template #dbType="{scope}">{{dictsMap.dbType[scope.row.dbType] || "暂无"}}</template>
          <el-table-column prop="operation" label="操作" width="200">
            <template slot-scope="scope">
              <iep-operation-wrapper>
                <el-button type="text" @click="handleEdit(scope.row)">查看</el-button>
                <el-button type="text" @click="handleStar(scope.row)">项目评分</el-button>
                <el-button type="text">生成文档</el-button>
              </iep-operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <star-dialog ref="starDialog"></star-dialog>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import StarDialog from "./StarDialog";
export default {
  mixins: [mixins],
  components: { FormTpl, StarDialog },
  data() {
    return {
      columnsMap: [
        {
          label: "项目编号",
          prop: "p1",
          width: 80,
        },
        {
          label: "项目类型",
          prop: "p2",
        },
        {
          label: "起始年度",
          prop: "p3",
        },
        {
          label: "项目名称",
          prop: "p4",
          width: 150,
        },
        {
          label: "建设单位",
          prop: "p5",
        },
        {
          label: "申报项目总投资（万元）",
          prop: "p5",
        },
        {
          label: "其中：市财政资金（万元）",
          prop: "p6",
        },
        {
          label: "申请资金类型",
          prop: "p7",
        },
        {
          label: "预审结果",
          prop: "p8",
        },
        {
          label: "预审项目总投资（万元）",
          prop: "p9",
        },
        {
          label: "建设方案评审结果",
          prop: "p10",
        },
        {
          label: "财政审核结果",
          prop: "p11",
        },
        {
          label: "财政审核基金类型",
          prop: "p12",
        },
        {
          label: "财政审核项目总投资（万元）",
          prop: "p13",
        },
        {
          label: "项目进度",
          prop: "p14",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      dictsMap: {
        dbType: {
          "1": "MySql",
          "2": "MSSql",
          "3": "Oracle",
          "4": "Sybase",
          "5": "DB2",
          "6": "Hbase",
          "7": "Access",
          "8": "其他",
        },
      },
      searchOption: [
        {
          label: "项目名称",
          prop: "p1",
        },
        {
          label: "申报年度",
          prop: "p2",
          type: "date",
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
    handleStar() {
      this.$refs["starDialog"].open();
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
