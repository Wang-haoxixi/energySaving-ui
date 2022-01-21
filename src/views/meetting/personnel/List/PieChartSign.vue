<template>
  <iep-charts class="echarts" :options="options" autoresize />
</template>
<script>
export default {
  name: "PieChartSign",
  props: {
    pieData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    options() {
      if (!this.pieData) {
        return {};
      }
      const arr = [];
      for (const key in this.pieData) {
        switch (key) {
          case "notSignCount":
            arr.push({ name: "未签到", value: this.pieData[key] });
            break;
          case "signCount":
            arr.push({ name: "已签到", value: this.pieData[key] });
            break;
          default:
            break;
        }
      }
      return {
        tooltip: {
          trigger: "item",
          formatter: param => {
            return `${param.marker}${param.name}：${param.value}个（${param.percent}%）`;
          },
        },
        series: [
          {
            name: "签到人数统计",
            type: "pie",
            radius: ["15%", "35%"],
            center: ["50%", "50%"],
            label: {
              normal: {
                formatter: "{b}: {c} ({d}%) \n\n",
                // rich: {
                //   hr: {
                //     width: 10,
                //     height: 10,
                //     borderRadius: 50,
                //     backgroundColor: "#cccccc",
                //   },
                // },
                padding: [0, -70],
              },
            },
            labelLine: {
              normal: {
                length: 30,
                length2: 90,
                lineStyle: {
                  color: "#eff0f1",
                },
              },
            },
            data: arr,
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