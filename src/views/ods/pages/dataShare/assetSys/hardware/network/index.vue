<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="网络设备"></iep-page-header>
        <div style="width:100%;">
          <IepOdsSearch :formProps="searchOption"></IepOdsSearch>
        </div>
        <iep-operation-container>
          <template slot="left">
            <iep-button type="primary" icon="el-icon-plus" plain @click="handleCreate">新增</iep-button>
            <iep-button plain @click="batchDelete">批量删除</iep-button>
          </template>
        </iep-operation-container>
        <iep-table
          :size="tableSize"
          :isLoadTable="isLoadTable"
          border
          :dictsMap="dictsMap"
          :pagination="pagination"
          :columnsMap="columnsMap"
          :pagedTable="pagedTable"
          :isMutipleSelection="true"
          @selection-change="handleSelectionChange"
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
import { dictsMap } from "./option";
export default {
  mixins: [mixins],
  components: { FormTpl },
  data() {
    return {
      dictsMap,
      columnsMap: [
        {
          label: "网络设备名称",
          prop: "name",
        },
        {
          label: "所属单位",
          prop: "deptName",
        },
        {
          label: "重要程度",
          prop: "degree",
          type: "dict",
          //dicData: getDic("data_assets_level"),
        },
        {
          label: "资产使用状态",
          prop: "status",
          type: "dict",
          //dicData: getDic("hardware_status"),
        },
        {
          label: "入场时间",
          prop: "entranceTime",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          label: "网络设备名称",
          prop: "name",
        },
        {
          label: "所属单位",
          prop: "deptId",
        },
        {
          label: "状态",
          prop: "status",
          type: "select",
          dicData: [
            { label: "故障设备", value: "1" },
            { label: "库存备用", value: "2" },
            { label: "已停用", value: "3" },
            { label: "使用中", value: "4" },
          ],
        },
        {
          label: "重要程度",
          prop: "degree",
          type: "select",
          dicData: [
            { label: "重要", value: "1" },
            { label: "关键", value: "2" },
            { label: "一般", value: "3" },
            { label: "其他", value: "4" },
          ],
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
    batchDelete() {
      this.$confirm(`是否确认删除该数据？`, "提示", {
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
