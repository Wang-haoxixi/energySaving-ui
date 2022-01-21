<template>
  <iep-charts class="echarts" :options="options" autoresize></iep-charts>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    options() {
      return {
        title: {
          left: "center",
          text: "每日通过分享成功注册的用户数",
          textStyle: {
            fontWeight: "normal",
            fontSize: 14,
          },
        },
        grid: {
          top: "40px",
          left: "12px",
          right: "12px",
          bottom: "12px",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: ({ name, marker, data }) => {
            return [name, marker + data].join("<br/>");
          },
        },
        xAxis: {
          type: "category",
          data: this.data.xAxis,
          axisLabel: {
            formatter: v => {
              return v
                .split("-")
                .slice(1)
                .map(m => +m)
                .join(".");
            },
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            smooth: false,
            data: this.data.yAxis,
            type: "line",
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
  height: calc(100% - 65px);
}
</style>