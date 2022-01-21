<template>
  <iep-charts class="echarts" :options="options" autoresize />
</template>
<script>
import { showBigNumber } from "@/filters/index";
export default {
  props: {
    lineData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    options() {
      return {
        tooltip: {
          formatter: params => {
            return `${params.name}：${params.value}`;
          },
        },
        grid: {
          top: 20,
          left: "12%",
          bottom: 20,
          right: 20,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.lineData.xwhole,
          axisLabel: {
            color: "#919397",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#919397",
            formatter: params => {
              return showBigNumber(params).join("");
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#eff0f1",
            },
          },
        },
        series: [
          {
            data: this.lineData.ywhole,
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#f74437",
            },
            areaStyle: {
              color: "#feeceb",
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 530px;
  height: 220px;
}
</style>
