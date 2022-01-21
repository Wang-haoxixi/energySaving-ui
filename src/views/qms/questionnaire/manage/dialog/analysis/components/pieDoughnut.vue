<template>
  <!-- 圆形图 -->
  <div @downLoad="downLoad" :class="className" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
import mixin from "./mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      name: "圆形图",
    };
  },
  methods: {
    // formatLabel(a) {
    //   const str = this.formatter(a.name, null, 20);
    //   const newStr = `${str} : ${a.value} (${a.percent}%)`;
    //   return newStr;
    // },
    loadMap() {
      const bar_dv = this.$refs.chart;
      const myChart = echarts.init(bar_dv);
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
          tooltip: {
            trigger: "item",
            // formatter: "{a}<br/>{b}:{c}({d}%)",
            formatter: params => {
              return [
                params.name,
                "<br/>",
                params.marker,
                params.seriesName,
                ":",
                params.value,
                "(",
                params.percent,
                "%)",
              ].join("");
            },
            extraCssText:
              "max-width:200px; white-space:pre-wrap;word-break:break-all",
          },
          color: [
            "#f78379",
            "#6eaff8",
            "#83cc93",
            "#f4b665",
            "#6ed7fa",
            "#db80d7",
            "#626c91",
            "#c1232b",
            "#c6e579",
          ],
          backgroundColor: "#ffffff",
          series: [
            {
              name: "选择",
              type: "pie",
              radius: ["40%", "60%"],
              center: ["50%", "55%"],
              label: {
                // formatter: this.formatLabel,
                formatter: ({ name }) => {
                  let res = name;
                  if (res.length > 15) {
                    res = res.substring(0, 10) + "..";
                  }
                  return res;
                },
              },
              labelLine: {
                normal: {
                  show: true,
                },
              },
              data: this.data.optionList
                ? this.data.optionList.map(v => {
                    return {
                      name: v.name,
                      value: this.statisticData[v.name],
                    };
                  })
                : [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
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
