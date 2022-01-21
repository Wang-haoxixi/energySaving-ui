<template>
  <iep-dialog :dialog-show="dialogShow" title="关联" width="50%" @close="resetForm">
    <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>

    <div class="select-tag">
      <el-tag type="info" v-for="(item, index) in selectList" :key="index">
        {{item.name}}
        <i class="el-icon-close" style="cursor: pointer;" @click="deleteSelect(item, index)"></i>
      </el-tag>
    </div>

    <iep-table
      ref="table"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-mutiple-selection
      @select="selectChange"
      @select-all="selectAll"
    >
      <!-- <el-table-column prop="operation" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleEdit(scope.row)">选择</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>-->
    </iep-table>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from "@/mixins/mixins";
// import {
//   getSummaryList,
//   getProductList,
// } from "@/api/mlms/material/report/organize";
// import { getTableData } from "@/api/gpms/index";
// import { summaryTable, productTable, projectTable } from "./option";
import { dateFormat } from "@/util/date";

export default {
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      // tableObj: {
      //   summary: {
      //     name: "纪要",
      //     column: summaryTable,
      //     request: getSummaryList,
      //     prop: "title",
      //   },
      //   product: {
      //     name: "产品",
      //     column: productTable,
      //     request: getProductList,
      //     prop: "name",
      //   },
      //   project: {
      //     name: "项目",
      //     column: projectTable,
      //     request: getTableData,
      //     prop: "projectName",
      //   },
      // },
      selectList: [],
      tableData: [],
      searchData: "",
    };
  },
  props: {
    type: {
      type: String,
      default: "summary",
    },
  },
  computed: {
    columnsMap() {
      return this.tableObj[this.type].column;
    },
  },
  methods: {
    resetForm() {
      this.searchForm = {};
      this.searchData = "";
      this.dialogShow = false;
    },
    open(list) {
      this.dialogShow = true;
      this.selectList = list;
      this.loadPage();
    },
    submitForm() {
      this.$emit("submit-success", this.selectList, this.type);
      this.dialogShow = false;
    },
    // loadPage (param) {
    //   this.loadTable(Object.assign({}, param, this.searchForm), this.tableObj[this.type].request).then(({records}) => {
    //     if (this.type === 'summary') {
    //       records = records.map(m => {
    //         m.meetingType = '拜访纪要'
    //         return m
    //       })
    //     }
    //     this.tableData = records
    //     // 每次获取完数据之后就要进行当前数据是否选中的判断
    //     for (let item of this.tableData) {
    //       let status = this.isSelectNow(this.selectList, item)
    //       if (status) {
    //         this.$refs['table'].toggleRowSelection(item, true)
    //       }
    //     }
    //   })
    // },
    loadPage(param) {
      this.loadTable(
        Object.assign({}, param, this.searchForm),
        this.tableObj[this.type].request,
        m => {
          if (this.type === "summary") {
            m.meetingType = "拜访纪要";
          } else if (this.type === "product") {
            m.onlineTime = dateFormat(m.onlineTime);
          }
          return m;
        },
      ).then(({ records }) => {
        this.tableData = records;
        // 每次获取完数据之后就要进行当前数据是否选中的判断
        for (const item of this.tableData) {
          const status = this.isSelectNow(this.selectList, item);
          if (status) {
            this.$refs["table"].toggleRowSelection(item, true);
          }
        }
      });
    },
    // 单选
    selectChange(selection, row) {
      const status = this.isSelectNow(selection, row);
      if (status) {
        this.selectList.push({
          id: row.id,
          name: row[this.tableObj[this.type].prop],
        });
      } else {
        this.deleteSelectList(row);
      }
    },
    // 全选
    selectAll(selection) {
      if (selection.length > 0) {
        // 若时全选
        for (const item of selection) {
          // 若已经选中了，不做任何操作，若没有选中，push进入列表
          const status = this.isSelectNow(this.selectList, item);
          if (!status) {
            this.selectList.push({
              id: item.id,
              name: item[this.tableObj[this.type].prop],
            });
          }
        }
      } else {
        // 若为反选
        // 遍历这个表格的数据，将已经选中的去掉
        for (const item of this.tableData) {
          const status = this.isSelectNow(this.selectList, item);
          if (status) {
            this.deleteSelectList(item);
          }
        }
      }
    },
    // 判断当前数据是否选中
    isSelectNow(list, row) {
      for (const item of list) {
        if (item.id == row.id) {
          return true;
        }
      }
      return false;
    },
    // 去除选中的选项
    deleteSelectList(row) {
      for (const index in this.selectList) {
        if (this.selectList[index].id == row.id) {
          this.selectList.splice(index, 1);
          return;
        }
      }
    },
    // 选中数据在标签中的删除
    deleteSelect(row, index) {
      this.selectList.splice(index, 1);
      // 判断是否在表格中存在这个数据，若有，则去掉
      for (const item of this.tableData) {
        if (item.id == row.id) {
          this.$refs["table"].toggleRowSelection(item, false);
        }
      }
    },
    // 搜索
    handleSearch() {
      const search = this.tableObj[this.type].prop;
      this.pageOption.current = 1;
      this.searchForm[search] = this.searchData;
      this.loadPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.select-tag {
  margin-bottom: 20px;
}
.el-tag {
  margin: 0 10px 10px 0;
}
</style>
