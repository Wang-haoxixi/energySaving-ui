<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="需求响应"></iep-page-header>
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
          :span-method="arraySpanMethod"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <template
            #materialKind="{scope}"
          >{{dictsMap.materialKind[scope.row.materialKind] || "暂无"}}</template>
          <template #auditState="{scope}">{{dictsMap.auditState[scope.row.auditState] || "暂无"}}</template>
          <template #sourceState="{scope}">{{dictsMap.sourceState[scope.row.sourceState] || "暂无"}}</template>
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
          label: "需求部门梳理情况",
          children: [
            {
              prop: "deptIdName",
              label: "需求部门",
            },
            {
              prop: "matterName",
              label: "事项名称",
            },
            {
              prop: "matterCode",
              label: "基本编码",
            },
            {
              prop: "materialName",
              label: "材料名称",
            },
            {
              prop: "materialKind",
              label: "材料类别",
              type: "slot",
            },
            {
              prop: "itemName",
              label: "信息项",
            },
            {
              prop: "markOrgName",
              label: "标记数源部门(共享需求)",
              minWidth: 100,
            },
            {
              prop: "desc",
              label: "备注",
            },
          ],
        },
        {
          label: "数源部门确认情况",
          children: [
            {
              prop: "auditState",
              label: "确认状态",
              type: "slot",
            },
            {
              prop: "sourceState",
              label: "是否共享",
              type: "slot",
            },
            {
              prop: "refuseReason",
              label: "理由",
            },
            {
              prop: "sourceOrgName",
              label: "数源部门",
            },
            {
              prop: "cmaterialName",
              label: "标准化材料名称",
              minWidth: 120,
            },
            {
              prop: "citemName",
              label: "信息项",
            },
            {
              prop: "cdesc",
              label: "备注",
            },
          ],
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          label: "事项名称",
          prop: "matterName",
        },
        {
          label: "材料名称",
          prop: "materialName",
        },
        {
          label: "数源部门",
          prop: "sourceOrg",
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
        auditState: {
          "2": "待确认",
          "3": "已确认",
          "4": "已拒绝",
        },
        sourceState: {
          "1": "是",
          "0": "否",
        },
      },
      deptSpanArr: [], //合并事项单元格的变量
      deptPosition: 0, //合并事项单元格的变量
      matterSpanArr: [], //合并事项单元格的变量
      matterPosition: 0, //合并事项单元格的变量
      materialSpanArr: [], //合并材料单元格的变量
      materialPosition: 0, //合并材料单元格的变量
      itemSpanArr: [], //合并信息项单元格的变量
      itemPosition: 0, //合并信息项单元格的变量
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    //表格合并行
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.deptSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 1 || columnIndex === 2) {
        const _row = this.matterSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 3 || columnIndex === 4) {
        const _row = this.materialSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 5 || columnIndex === 6 || columnIndex === 7) {
        const _row = this.itemSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 需求部门行的合并
    deptRowspan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.deptSpanArr.push(1);
          this.deptPosition = 0;
        } else {
          if (
            this.tableData[index].deptId === this.tableData[index - 1].deptId
          ) {
            this.deptSpanArr[this.deptPosition] += 1;
            this.deptSpanArr.push(0);
          } else {
            this.deptSpanArr.push(1);
            this.deptPosition = index;
          }
        }
      });
    },
    // 事项行的合并
    matterRowspan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.matterSpanArr.push(1);
          this.matterPosition = 0;
        } else {
          if (
            this.tableData[index].matterId ===
            this.tableData[index - 1].matterId
          ) {
            this.matterSpanArr[this.matterPosition] += 1;
            this.matterSpanArr.push(0);
          } else {
            this.matterSpanArr.push(1);
            this.matterPosition = index;
          }
        }
      });
    },
    // 材料行的合并
    materialRowspan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.materialSpanArr.push(1);
          this.materialPosition = 0;
        } else {
          if (
            this.tableData[index].materialId ===
            this.tableData[index - 1].materialId
          ) {
            this.materialSpanArr[this.materialPosition] += 1;
            this.materialSpanArr.push(0);
          } else {
            this.materialSpanArr.push(1);
            this.materialPosition = index;
          }
        }
      });
    },
    // 信息项行的合并
    itemRowspan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.itemSpanArr.push(1);
          this.itemPosition = 0;
        } else {
          if (
            this.tableData[index].itemId === this.tableData[index - 1].itemId
          ) {
            this.itemSpanArr[this.itemPosition] += 1;
            this.itemSpanArr.push(0);
          } else {
            this.itemSpanArr.push(1);
            this.itemPosition = index;
          }
        }
      });
    },
    loadPage(fn = m => m) {
      this.isLoadTable = true;
      this.tableData = this.mockData.data.records;
      this.deptSpanArr = [];
      this.matterSpanArr = [];
      this.materialSpanArr = [];
      this.itemSpanArr = [];
      this.deptRowspan();
      this.matterRowspan();
      this.materialRowspan();
      this.itemRowspan();
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
