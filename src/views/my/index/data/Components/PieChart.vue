<template>
  <iep-charts class="echarts" :options="options" autoresize />
</template>
<script>
import { showBigNumber } from "@/filters/index";
export default {
  props: {
    pieData: {
      type: Object,
      default: () => {},
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    options() {
      let total = 0;
      if (this.total) {
        total = this.total;
      } else {
        for (const key in this.pieData) {
          total += this.pieData[key];
        }
      }
      return {
        title: {
          zlevel: 0,
          text: ["合计", `${showBigNumber(total).join("")}`].join("\n"),
          y: "center",
          x: "155",
          textAlign: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "400",
            color: "#919397",
          },
        },
        grid: {
          top: 20,
          left: "5%",
          bottom: 20,
          right: 20,
        },
        tooltip: {
          trigger: "item",
          formatter: params => {
            const v = showBigNumber(params.value).join("");
            return `${params.name}<br/>${v}(${params.percent}%)`;
          },
        },
        legend: {
          top: "60",
          orient: "vertical",
          right: "20%",
          itemHeight: 7,
          data: [
            { name: "任务协作" },
            { name: "说说互动" },
            { name: "文档共享" },
            { name: "协同交流" },
          ],
          textStyle: {
            fontSize: 14,
            lineHeight: 30,
          },
          icon: "circle",
          formatter: function(name) {
            return name;
          },
        },
        series: [
          {
            name: "合计",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["65%", "90%"],
            avoidLabelOverlap: false,
            zlevel: 1,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "18",
                fontWeight: "500",
                formatter: params => {
                  const v = showBigNumber(params.value).join("");
                  return `${params.name}\n${v}`;
                },
                backgroundColor: "#ffffff",
                padding: [25, 25, 25, 25],
                borderRadius: [100, 100, 100, 100],
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.pieData.taskScoreWorth, name: "任务协作" },
              { value: this.pieData.thoughtScoreWorth, name: "说说互动" },
              { value: this.pieData.documentScoreWorth, name: "文档共享" },
              { value: this.pieData.communicationScoreWorth, name: "协同交流" },
            ],
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
