<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="待清洗数据池"></iep-page-header>
        <iep-operation-container>
          <template slot="left">
            <iep-button type="primary" plain @click="connectionDb">连接数据库</iep-button>
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
    <connectionDbDialog ref="connectionDbDialog"></connectionDbDialog>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { mockData } from "./const/mock";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import connectionDbDialog from "./connectionDbDialog";
export default {
  mixins: [mixins],
  components: { FormTpl, connectionDbDialog },
  data() {
    return {
      columnsMap: [
        {
          label: "序号",
          prop: "id",
          width: 80,
        },
        {
          label: "部门",
          prop: "dataDeptName",
        },
        {
          label: "表名",
          prop: "dataTableName",
        },
        {
          label: "字段名称",
          prop: "dataFieldName",
        },
      ],
      pageState: "list",
      mockData: mockData,
      formStatus: "detail",
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
      const { records, size, total, current } = {
        records: [],
        total: 0,
        size: 10,
        current: 1,
        orders: [],
        searchCount: true,
        pages: 1,
      };
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
    connectionDb() {
      this.$refs.connectionDbDialog.dialogShow = true;
      this.$refs["connectionDbDialog"].open({});
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
