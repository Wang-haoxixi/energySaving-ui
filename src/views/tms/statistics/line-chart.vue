<template>
  <div class="line-chart-box">
    <h2>每日新增</h2>
    <iep-no-data v-if="!realData.length" style="height: 300px;"></iep-no-data>
    <iep-charts v-else class="echarts" :options="options" autoresize />
  </div>
</template>
<script>
import { getTagDayNew } from "@/api/tms/statistics";
export default {
  data() {
    return {
      realData: [],
    };
  },
  computed: {
    options() {
      return {
        xAxis: {
          type: "category",
          data: this.realData.map(m => m.date),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.realData.map(m => m.value),
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#19bba5",
              },
            },
          },
        ],
      };
    },
  },
  created() {
    this.loadLineChartData();
  },
  methods: {
    loadLineChartData() {
      getTagDayNew().then(res => {
        this.realData = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.line-chart-box {
  h2 {
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .echarts {
    width: 100%;
    min-width: 200px;
    height: 280px;
  }
}
</style>
