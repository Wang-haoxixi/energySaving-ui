<template>
  <div>
    <!-- table -->
    <div-table
      v-if="!['6', '7'].includes(data.type)"
      :statisticData="statisticData"
      :data="data"
      :columData="columnData"
      :summary="['2', '4','8'].includes(data.type) ? statisticData.total : 0"
    ></div-table>
    <!-- tar -->
    <div class="bar">
      <div
        v-if="['1', '3', '5'].includes(data.type)"
        :class="defaultG === 'pie' ? 'active' : ''"
        @click="changeType('pie')"
      >
        <span>
          <i class="iconfont el-icon-woneng-bingtu"></i>
        </span>
        <span>饼状图</span>
      </div>
      <div
        v-if="['1', '3', '5'].includes(data.type)"
        :class="defaultG === 'pieDoughnut' ? 'active' : ''"
        @click="changeType('pieDoughnut')"
      >
        <span>
          <i class="iconfont el-icon-woneng-yuanhuan"></i>
        </span>
        <span>圆环图</span>
      </div>
      <div
        v-if="['1', '2', '3', '4',  '5', '8'].includes(data.type)"
        :class="defaultG === 'bar' ? 'active' : ''"
        @click="changeType('bar')"
      >
        <span>
          <i class="iconfont el-icon-woneng-histogram"></i>
        </span>
        <span>柱状图</span>
      </div>
      <div
        v-if="['1', '2', '3', '4', '5', '8'].includes(data.type)"
        :class="defaultG === 'line' ? 'active' : ''"
        @click="changeType('line')"
      >
        <span>
          <i class="iconfont el-icon-woneng-tiaoxingtu1"></i>
        </span>
        <span>条形图</span>
      </div>
      <i v-if="['1', '2', '3', '4', '5', '8'].includes(data.type)">
        <el-button @click="downLoad">导出图片</el-button>
      </i>
    </div>
    <!-- graph -->
    <div class="body-wrapper" v-show="['1', '2', '3', '4',  '5', '8'].includes(data.type)">
      <chart-bar ref="bar" v-if="defaultG === 'bar'" :data="data" :statisticData="statisticData"></chart-bar>
      <chart-line ref="line" v-if="defaultG === 'line'" :data="data" :statisticData="statisticData"></chart-line>
      <chart-pie-doughnut
        ref="pieDoughnut"
        v-if="defaultG === 'pieDoughnut'"
        :statisticData="statisticData"
        :data="data"
      ></chart-pie-doughnut>
      <chart-pie ref="pie" v-if="defaultG === 'pie'" :data="data" :statisticData="statisticData"></chart-pie>
    </div>
  </div>
</template>
<script>
import DivTable from "./table";
import ChartBar from "./bar";
import ChartLine from "./line";
import ChartPie from "./pie";
import ChartPieDoughnut from "./pieDoughnut";
export default {
  name: "other",
  methods: {
    init() {
      // 未使用参数 type
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
    DivTable,
    ChartBar,
    ChartLine,
    ChartPie,
    ChartPieDoughnut,
  },
};
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  text-align: center;
  > div {
    display: flex;
    align-items: center;
    width: 80px;
    padding: 4px 0;
    justify-content: center;
    font-family: Microsoft YaHei;
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
      font-size: 16px;
    }
  }
  > div:hover {
    color: $--color-primary;
    background: $--custom-menu-background-color;
    border-color: $--custom-menu-background-color;
    .iconfont {
      color: $--color-primary;
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
