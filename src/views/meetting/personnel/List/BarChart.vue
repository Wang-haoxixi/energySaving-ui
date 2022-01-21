<template>
  <iep-charts class="echarts" :options="options" autoresize />
</template>
<script>
import { parseToMonthDay } from "@/filters/index.ts";

export default {
  name: "BarChart",
  props: {
    barData: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    options() {
      if (!this.barData) {
        return {};
      }
      const xData = this.barData.map(item => {
        return parseToMonthDay(item.enroleTime);
      });
      const enroleCountData = this.barData.map(item => {
        return item.enroleCount;
      });
      return {
        tooltip: {
          trigger: "axis",
          formatter: param => {
            return [
              param[0].name,
              `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param[0].color.colorStops[0].color};"></span>${param[0].seriesName}：${param[0].value}个`,
            ].join("<br/>");
          },
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "报名人数（个）",
            boundaryGap: [0, 0.1],
            minInterval: 1,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "报名人数",
            type: "bar",
            data: enroleCountData,
            barWidth: 8,
            itemStyle: {
              barBorderRadius: [4, 4, 4, 4],
            },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(228,121,109,1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(241,187,181,1)", // 100% 处的颜色
                },
              ],
              globalCoord: true, // 缺省为 false
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
  height: 250px;
}
</style>