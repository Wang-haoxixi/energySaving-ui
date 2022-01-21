<template>
  <div class="warp">
    <el-table
      ref="table"
      :data="columData"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="name" align="center" label="选项"></el-table-column>
      <el-table-column prop="value" align="center" label="小计"></el-table-column>
      <!-- <el-table-column prop="percent" align="center" label="百分比">
        <template slot-scope="scope">
          <div>{{(scope.row.value/statisticData.total*100).toFixed(2)}}%</div>
        </template>
      </el-table-column>-->
      <el-table-column prop="eye" v-if="['1', '2'].includes(data.type)" width="50">
        <template slot-scope="scope" v-if="scope.row.answerContent&&scope.row.answerContent.length">
          <el-tooltip
            class="item"
            :open-delay="500"
            :hide-after="1500"
            effect="dark"
            content="查看详情"
            placement="top"
          >
            <i
              :class="scope.row.eyeShow?'el-icon-woneng-yanjing1':'el-icon-woneng-yanjing11'"
              @click="toogleExpand(scope.row)"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="expand" type="expand" width="1">
        <template slot-scope="props">
          <el-table
            header-row-class-name="table-head"
            show-overflow-tooltip
            :data="getAnswerPage(props.row.answerContent)"
          >
            <el-table-column prop="answer" align="left" :label="`在选项 ${props.row.name} 中填写的内容`"></el-table-column>
          </el-table>
          <div class="expand-footer">
            <span>{{`共 ${props.row.answerContent.length} 人回答`}}</span>
            <el-pagination
              :current-page.sync="currentPage"
              :page-size="currentSize"
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :total="props.row.answerContent.length"
            ></el-pagination>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      currentSize: 5,
      currentPage: 1,
    };
  },
  methods: {
    // 小计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (!column.label) {
          return;
        }
        if (index === 0) {
          sums[index] = "本题有效填写人次";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index] += " ";
        } else {
          sums[index] = "";
        }
      });
      if (this.summary !== 0) {
        sums[1] = this.summary;
      }
      return sums;
    },
    // getAnswerSummaries({ data }) {
    //   return [`共 ${data.length} 人回答`];
    // },
    // 可填选项内容开关
    toogleExpand(row) {
      const $table = this.$refs.table;
      this.columData.map((item) => {
        if (row.name != item.name) {
          item.eyeShow = false;
          $table.toggleRowExpansion(item, false);
        }
      });
      row.eyeShow = !row.eyeShow;

      $table.toggleRowExpansion(row);
    },
    // 可填选项内容分页
    getAnswerPage(data) {
      return data.slice(
        (this.currentPage - 1) * this.currentSize,
        this.currentPage * this.currentSize,
      );
    },
    // 用户选项样式
    tableRowClassName({ row }) {
      const cont = this.statisticData.contentBySelf;
      if (cont) {
        const newArr = [];
        cont.split(",").forEach((item) => {
          const arr = item.split("^");
          newArr.push(arr[0]);
        });
        if (newArr.includes(row.name)) {
          return "choice-row";
        }
        return "";
      }
      return "";
    },
    // 用户可填选项样式
    // tableRowClassNameExpand({ row, rowIndex }) {
    //   let cont = this.statisticData.contentBySelf;
    //   let newArr = [];
    //   cont.split(",").forEach(item => {
    //     let arr = item.split("^");
    //     newArr.push(arr[1]);
    //   });
    //   if (newArr.includes(row.answer)) {
    //     return "choice-row";
    //   }
    //   return "";
    // },
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    columData: {
      type: Array,
      default: () => [],
    },
    summary: {
      type: Number,
      default: 0,
    },
    statisticData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.warp {
  margin: 20px 0;
}
::v-deep .el-table {
  font-size: 14px;
}

.el-icon-woneng-yanjing1,
.el-icon-woneng-yanjing11 {
  cursor: pointer;
  color: #66f;
  font-size: 16px;
}

::v-deep .el-table th {
  background: $--background-color;
}
::v-deep .el-table th > .cell {
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
::v-deep .el-table__expanded-cell {
  padding: 10px;
  color: $--color-text-secondary;
  margin: 0;
  .table-head {
    div {
      font-family: "微软雅黑";
      color: $--color-text-primary;
      font-weight: normal;
    }
  }
  .el-table__footer-wrapper {
    td {
      background: #fff;
      .cell {
        font-weight: 400;
        color: $--color-text-secondary;
      }
    }
  }
  .expand-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
}
::v-deep .choice-row {
  color: $--color-primary;
}
</style>
