<template>
  <div>
    <div v-show="pageState === 'list'">
      <iep-basic-container>
        <iep-page-header title="待确认"></iep-page-header>
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
          :span-method="indexSpanMethod"
          @pagination-size-change="handlePaginationSizeChange"
          @pagination-current-change="handlePaginationCurrentChange"
        >
          <template #numberGenerator="{scope}">
            <el-button size="small" @click="isDataDept(scope.row)" type="text">是数源部门</el-button>
            <el-button size="small" @click="notDataDept(scope.row)" type="text">非数源部门</el-button>
          </template>
          <template
            #materialKind="{scope}"
          >{{dictsMap.materialKind[scope.row.materialKind] || "暂无"}}</template>
        </iep-table>
      </iep-basic-container>
    </div>
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" :formStatus="formStatus"></form-tpl>
    <notDataDialog ref="notDataDialog" :dialogStatus="dialogStatus"></notDataDialog>
  </div>
</template>
<script>
import { mockData } from "./const/mock";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import FormTpl from "./form";
import notDataDialog from "./notDataDialog";
export default {
  mixins: [mixins],
  components: { FormTpl, notDataDialog },
  data() {
    return {
      columnsMap: [
        {
          prop: "deptIdName",
          label: "需求部门",
        },
        {
          prop: "matterName",
          label: "事项名称",
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
          label: "数源部门",
        },
        {
          prop: "desc",
          label: "备注",
        },
        {
          prop: "numberGenerator",
          label: "数源部门确认",
          type: "slot",
          width: "200px",
        },
      ],
      mockData: mockData,
      pageState: "list",
      formStatus: "detail",
      searchOption: [
        {
          prop: "deptId",
          label: "需求部门",
        },
        {
          prop: "matterName",
          label: "事项名称",
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
      spanArr: [], //单元格合并参数
      position: 0, //单元格合并参数
      deptArr: [], //单元格合并参数
      deptPosition: 0, //单元格合并参数
      matterArr: [], //单元格合并参数
      matterPosition: 0, //单元格合并参数
      materialArr: [], //单元格合并参数
      materialPosition: 0, //单元格合并参数
      itemArr: [], //单元格合并参数
      itemPosition: 0, //单元格合并参数
      tableData: [],
      dialogStatus: "create",
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    notDataDept() {
      this.dialogStatus = "create";
      this.$refs.notDataDialog.dialogShow = true;
      this.$refs.notDataDialog.open({});
    },
    isDataDept(row) {
      this.pageState = "form";
      this.formStatus = "edit";
      this.$nextTick(() => {
        this.$refs["form"].open(row);
      });
    },
    // 需求部门合并
    deptRowSpan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.deptArr.push(1);
          this.deptPosition = 0;
        } else {
          if (
            this.tableData[index].deptId === this.tableData[index - 1].deptId
          ) {
            this.deptArr[this.deptPosition] += 1;
            this.deptArr.push(0);
          } else {
            this.deptArr.push(1);
            this.deptPosition = index;
          }
        }
      });
    },
    // 事项合并
    matterRowSpan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.matterArr.push(1);
          this.matterPosition = 0;
        } else {
          if (
            this.tableData[index].matterId ===
            this.tableData[index - 1].matterId
          ) {
            this.matterArr[this.matterPosition] += 1;
            this.matterArr.push(0);
          } else {
            this.matterArr.push(1);
            this.matterPosition = index;
          }
        }
      });
    },
    // 材料合并
    materialRowSpan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.materialArr.push(1);
          this.materialPosition = 0;
        } else {
          if (
            this.tableData[index].materialId ===
            this.tableData[index - 1].materialId
          ) {
            this.materialArr[this.materialPosition] += 1;
            this.materialArr.push(0);
          } else {
            this.materialArr.push(1);
            this.materialPosition = index;
          }
        }
      });
    },
    // 信息项合并
    itemRowSpan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.itemArr.push(1);
          this.itemPosition = 0;
        } else {
          if (
            this.tableData[index].itemId === this.tableData[index - 1].itemId
          ) {
            this.itemArr[this.itemPosition] += 1;
            this.itemArr.push(0);
          } else {
            this.itemArr.push(1);
            this.itemPosition = index;
          }
        }
      });
    },
    //表格合并行
    indexSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        //需求部门列合并
        const _row = this.deptArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 2) {
        //事项列合并
        const _row = this.matterArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 3 || columnIndex === 4) {
        //材料列合并
        const _row = this.materialArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 5) {
        //信息项列合并
        const _row = this.itemArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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
      this.deptArr = []; //清空事项列合并用
      this.deptRowSpan(); //事项列合并
      this.matterArr = []; //清空事项列合并用
      this.matterRowSpan(); //事项列合并
      this.materialArr = []; //清空材料列合并用
      this.materialRowSpan(); //材料列合并
      this.itemArr = []; //清空信息项列合并用
      this.itemRowSpan(); //信息项列合并
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
