<template>
  <div>
    <!-- table -->
    <el-table
      class="table-wrap"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      :data="columnData"
      style="width: 100%"
    >
      <el-table-column
        v-for="item of columnMap"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
    <!-- tar -->
    <div class="bar">
      <div :class="defaultG === 'bar' ? 'active' : ''" @click="changeType('bar')">
        <span>
          <i class="iconfont el-icon-woneng-histogram"></i>
        </span>
        <span>柱状图</span>
      </div>
      <div :class="defaultG === 'line' ? 'active' : ''" @click="changeType('line')">
        <span>
          <i class="iconfont el-icon-woneng-tiaoxingtu1"></i>
        </span>
        <span>条形图</span>
      </div>
      <i>
        <el-button @click="downLoad">导出图片</el-button>
      </i>
    </div>
    <!-- graph -->
    <div class="body-wrapper" v-show="['1', '2', '3', '4',  '5', '8'].includes(data.type)">
      <chart-bar ref="bar" v-if="defaultG === 'bar'" :data="data" :statisticData="statisticData"></chart-bar>
      <chart-line ref="line" v-if="defaultG === 'line'" :data="data" :statisticData="statisticData"></chart-line>
    </div>
  </div>
</template>

<script>
import ChartBar from "./bar";
import ChartLine from "./line";

const columnMap = [
  {
    prop: "name",
    label: "选项",
  },
  {
    prop: "0分",
    label: "0分",
  },
  {
    prop: "1分",
    label: "1分",
  },
  {
    prop: "2分",
    label: "2分",
  },
  {
    prop: "3分",
    label: "3分",
  },
  {
    prop: "4分",
    label: "4分",
  },
  {
    prop: "5分",
    label: "5分",
  },
];
export default {
  name: "rate",
  data() {
    return {
      columnMap,
      showSummary: true,
    };
  },
  methods: {
    init() {
      this.$refs[this.defaultG].init();
    },
    changeType(type) {
      this.$emit("change-type", type);
    },
    downLoad() {
      switch (this.defaultG) {
        case "pie":
          this.$refs["pie"].downLoad();
          break;
        case "line":
          this.$refs["line"].downLoad();
          break;
        case "bar":
          this.$refs["bar"].downLoad();
          break;
        case "pieDoughnut":
          this.$refs["pieDoughnut"].downLoad();
          break;
      }
    },
    getSummaries() {
      return ["本题有效填写人次", this.statisticData.total];
    },
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    defaultG: {
      type: String,
      default: "line",
    },
    columnData: {
      type: Array,
      default: () => [],
    },
    statisticData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ChartBar,
    ChartLine,
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  margin: 20px 0;
}
.bar {
  display: flex;
  text-align: center;
  > div {
    display: flex;
    align-items: center;
    width: 80px;
    padding: 4px 0;
    font-family: Microsoft YaHei;
    justify-content: center;
    border-radius: $--border-radius-base;
    border: 1px solid #eff0f1;
    color: #303031;
    margin-right: 10px;
    font-size: 14px;
    transition: all 0.2s ease;
    cursor: pointer;
    line-height: 1;
    .iconfont {
      margin-right: 5px;
      color: $--color-text-secondary;
      font-size: 20px;
    }
  }
  > div:hover {
    color: $--color-primary;
    background: $--custom-menu-background-color;
    border-color: $--custom-menu-background-color;
    .iconfont {
      margin-right: 5px;
      color: $--color-primary;
      font-size: 20px;
    }
  }
  > i {
    margin-left: auto;
  }
  .active {
    color: $--color-primary;
    background: $--custom-menu-background-color;
    border-color: $--custom-menu-background-color;
    .iconfont {
      color: $--color-primary;
    }
  }
}
</style>
