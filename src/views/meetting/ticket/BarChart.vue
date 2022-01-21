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
      const xData = this.barData.map((item) => {
        return parseToMonthDay(item.time);
      });
      const canMoneyData = this.barData.map((item) => {
        return item.canMoney;
      });
      const moneyData = this.barData.map((item) => {
        return item.money;
      });
      // const canMoneyData = ["222", "180", "124", "165", "110", "48", "84"];
      // const moneyData = ["202", "150", "104", "145", "90", "28", "64"];

      return {
        tooltip: {
          trigger: "axis",
          formatter: (param) => {
            return [
              `${param[0].name}`,
              `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param[0].color.colorStops[0].color};"></span>${param[0].seriesName}：${param[0].value}贝`,
              `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param[1].color.colorStops[0].color};"></span>${param[1].seriesName}：${param[1].value}元`,
            ].join("<br/>");
          },
        },
        legend: {
          data: ["宝贝收入", "人民币收入"],
          bottom: 0,
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
            name: "宝贝收入（ 贝 ）",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "人民币收入（ 元 ）",
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "宝贝收入",
            type: "bar",
            data: canMoneyData,
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
                  color: "rgba(244,114,104,1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(251,184,179,1)", // 100% 处的颜色
                },
              ],
              globalCoord: true, // 缺省为 false
            },
          },
          {
            name: "人民币收入",
            type: "bar",
            data: moneyData,
            yAxisIndex: 1,
            barWidth: 8,
            barGap: 1,
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
                  color: "rgba(100,169,248,1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(170,204,242,1)", // 100% 处的颜色
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
  height: 400px;
}
</style>