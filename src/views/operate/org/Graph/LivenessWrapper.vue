<template>
  <iep-wrapper title="组织活跃度">
    <div class="liveness-switch" slot="right">
      <el-button disabled>
        昨日活跃
        <span class="liveness-value">{{yesterdayPercent}}</span>
      </el-button>
      <el-button disabled>
        7日活跃
        <span class="liveness-value">{{sevenDaysPercent}}</span>
      </el-button>
      <el-button disabled>
        30日活跃
        <span class="liveness-value">{{thirtyDaysPercent}}</span>
      </el-button>
    </div>
    <iep-charts class="echarts" :options="options" autoresize />
  </iep-wrapper>
</template>
<script>
import { getOrgActivity } from "@/api/dms/redness_record";
export default {
  data() {
    return {
      sevenDays: 0,
      soNumber: 1064,
      thirtyDays: 0,
      xdata: [
        "2020-09-20",
        "2020-09-19",
        "2020-09-18",
        "2020-09-17",
        "2020-09-16",
        "2020-09-15",
        "2020-09-14",
        "2020-09-13",
        "2020-09-12",
        "2020-09-11",
        "2020-09-10",
        "2020-09-09",
        "2020-09-08",
        "2020-09-07",
      ],
      ydata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      yesterday: 0,
    };
  },
  computed: {
    yesterdayPercent() {
      return (this.yesterday / this.soNumber) * 100 + "%";
    },
    sevenDaysPercent() {
      return (this.sevenDays / this.soNumber) * 100 + "%";
    },
    thirtyDaysPercent() {
      return (this.thirtyDays / this.soNumber) * 100 + "%";
    },
    options() {
      return {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "10px",
          left: "0",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            smooth: false,
            type: "line",
            step: "end",
            data: this.ydata,
          },
        ],
      };
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getOrgActivity();
      this.xdata = data.xdata;
      this.ydata = data.ydata;
      this.sevenDays = data.sevenDays;
      this.soNumber = data.soNumber;
      this.thirtyDays = data.thirtyDays;
      this.yesterday = data.yesterday;
    },
  },
};
</script>
<style lang="scss" scoped>
.liveness-switch {
  margin-top: -5px;
  .liveness-value {
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
