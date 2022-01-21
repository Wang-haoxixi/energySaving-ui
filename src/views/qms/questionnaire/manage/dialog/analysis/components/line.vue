<template>
  <!-- 条形图 -->
  <div @downLoad="downLoad" :class="className" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
import mixin from "./mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      name: "条形图",
    };
  },
  methods: {
    loadMap() {
      const bar_dv = this.$refs.chart;
      const myChart = echarts.init(bar_dv);
      let keyData = [];
      let series = [];
      const legend = { show: false };
      if (this.data.type !== "8") {
        const valueData = [];
        for (const item of this.data.optionList) {
          keyData.push(item.name);
          valueData.push(this.statisticData[item.name]);
        }
        series = [
          {
            name: "选择",
            type: "bar",
            barWidth: "20%",
            data: valueData,
          },
        ];
      } else {
        keyData = ["0分", "1分", "2分", "3分", "4分", "5分"];
        for (const item of this.data.optionList) {
          series.push({
            name: item.name,
            type: "bar",
            // barWidth: '60%',
            data: this.statisticData[item.name],
          });
        }
        // legend = {
        //   show: true,
        //   x: "right",
        //   y: "15%",
        // };
      }
      if (bar_dv) {
        const option = {
          title: {
            text: this.formatter(this.statisticData.title, 2, 30),
            subtext: `参与人数${this.statisticData.total || 0}人`,
            x: "center",
            textStyle: {
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 24,
            },
            subtextStyle: {
              fontSize: 14,
              lineHeight: 18,
            },
            triggerEvent: true,
          },
          color: [
            "#6eaff8",
            "#f78379", // 0 1换了颜色
            "#83cc93",
            "#f4b665",
            "#6ed7fa",
            "#db80d7",
            "#626c91",
            "#c1232b",
            "#c6e579",
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
            extraCssText:
              "max-width:200px; white-space:pre-wrap;word-break:break-all",
            formatter: params => {
              const param = params[0];
              return [
                param.name,
                "<br/>",
                param.marker,
                param.seriesName,
                "：",
                param.value,
              ].join("");
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "15%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "value",
            },
          ],
          yAxis: [
            {
              type: "category",
              data: keyData,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                formatter: this.axisLabelFormatter(12),
                interval: 0,
              },
              triggerEvent: true,
            },
          ],
          legend: legend,
          series: series,
          backgroundColor: "#ffffff",
        };
        myChart.clear();
        myChart.setOption(option);
        this.formatXaxis(myChart, option);
      } else {
        console.log("error");
      }
    },
    formatXaxis(el, { tooltip }) {
      el.on("mouseover", params => {
        if (params.componentType === "title") {
          const offsetX = params.event.offsetX + 10;
          const offsetY = params.event.offsetY + 10;
          el.setOption({
            tooltip: {
              formatter: this.statisticData.title,
              alwaysShowContent: true,
            },
          });
          el.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: 0,
            position: [offsetX, offsetY],
          });
        }
        if (
          (params.componentType =
            "xAxis" && params.value && params.value.length > 5)
        ) {
          const offsetX = params.event.offsetX + 10;
          const offsetY =
            params.event.offsetY -
            (Math.floor(params.value.length / 15) + 1) * 24;
          el.setOption({
            tooltip: {
              formatter: params.value,
              alwaysShowContent: true,
            },
          });
          el.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: 0,
            position: [offsetX, offsetY],
          });
        }
      });
      el.on("mouseout", params => {
        if (params.componentType !== "seires") {
          el.setOption({
            tooltip: tooltip,
          });
          el.setOption({
            tooltip: {
              alwaysShowContent: false,
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.charts {
  margin-top: 30px;
  width: 100%;
  min-height: 600px;
}
</style>
