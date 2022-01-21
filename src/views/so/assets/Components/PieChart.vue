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
          data: [
            { name: "材料" },
            { name: "任务" },
            { name: "纪要" },
            { name: "报表" },
            { name: "问卷" },
            { name: "活动" },
            { name: "产品" },
          ],
          itemHeight: 7,
          icon: "circle",
          textStyle: {
            fontSize: 14,
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
              { value: this.pieData.soMaterialScoreWorth, name: "材料" },
              { value: this.pieData.soTaskScoreWorth, name: "任务" },
              { value: this.pieData.soMeetingScoreWorth, name: "纪要" },
              { value: this.pieData.soReportScoreWorth, name: "报表" },
              { value: this.pieData.soQuestionnaireScoreWorth, name: "问卷" },
              { value: this.pieData.soActivityScoreWorth, name: "活动" },
              { value: this.pieData.soProductScoreWorth, name: "产品" },
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
  height: 230px;
}
</style>
