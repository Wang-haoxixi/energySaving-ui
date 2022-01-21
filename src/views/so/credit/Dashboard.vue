<template>
  <div class="echarts-box">
    <iep-charts class="echarts" :options="options" autoresize />
  </div>
</template>
<script>
export default {
  props: ["gauge_value"],
  computed: {
    options() {
      return {
        series: [
          {
            type: "gauge",
            legendHoverLink: false,
            startAngle: 200,
            endAngle: -20,
            min: 500,
            max: 2000,
            splitNumber: 5,
            axisLine: {
              show: true,
              lineStyle: {
                width: 15,
                shadowBlur: 0,
                color: [
                  [0.35, "#5cec92"],
                  [0.65, "#4ba9ff"],
                  [0.85, "#f47268"],
                  [1, "#f4f5f6"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              distance: 1,
              textStyle: {
                color: "#666769",
              },
            },
            pointer: {
              show: true,
              length: "50%",
            },
            detail: {
              //show:false,
              formatter: function(e) {
                if (e <= 800) {
                  return `${e} 信用一般`;
                } else if (e <= 1100) {
                  return `${e} 信用中等`;
                } else if (e <= 1400) {
                  return `${e} 信用良好`;
                } else if (e <= 1700) {
                  return `${e} 信用优秀`;
                } else {
                  return `${e} 信用极好`;
                }
              },
              offsetCenter: [0, 50],
              textStyle: {
                fontSize: 16,
                color: "#666769",
              },
            },
            data: [
              {
                name: "",
                value: Math.floor(this.gauge_value),
              },
            ],
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts-box {
  margin-bottom: 20px;
  height: 200px;
  overflow: hidden;
}
.echarts {
  margin-top: -30px;
  width: 360px;
  height: 320px;
}
</style>
