<template>
  <iep-charts class="echarts" :options="options" autoresize />
</template>
<script>
export default {
  props: ["xdata", "ydata"],
  computed: {
    options() {
      return {
        title: {
          text: "历史信用变化趋势",
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: "#666769",
            padding: [0, 0, 10, 70],
          },
        },
        grid: {
          x: 40,
          y: 55,
          x2: 20,
          y2: 20,
        },
        tooltip: {
          show: true,
          trigger: "axis",

          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#f74437",
              width: 1,
              type: "solid",
            },
            z: -100,
          },
          formatter: function(params) {
            return `<div>第${params[0].name}周</div><div>信用值：${params[0].data}
              </div>`;
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          data: this.xdata,
          axisLabel: {
            formatter: "第 {value} 周",
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ydata,
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#f7443738", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f7443738", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
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
  width: 100%;
  height: 300px;
}
</style>
