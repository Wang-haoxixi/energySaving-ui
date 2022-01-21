<template>
  <div class="pie-chart-box">
    <h2>标签分布</h2>
    <iep-no-data v-if="!realData.length" style="height: 300px;"></iep-no-data>
    <iep-charts class="echarts" v-else :options="options" autoresize />
  </div>
</template>
<script>
import { getTagDistributed } from "@/api/tms/statistics";
export default {
  data() {
    return {
      realData: [],
      initOptions: {
        renderer: "canvas",
      },
    };
  },
  computed: {
    options() {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.realData,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 60,
          },
        },
        yAxis: {},
        grid: {
          top: "2%",
          right: "2%",
          bottom: "55%",
        },
        series: [
          {
            type: "bar",
            barGap: "50%",
            itemStyle: {
              normal: {
                color: "#c488e2",
              },
            },
          },
        ],
      };
    },
  },
  created() {
    this.loadDistributed();
  },
  methods: {
    loadDistributed() {
      getTagDistributed().then(res => {
        this.realData = res.map(m => {
          return [m.item, m.count];
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pie-chart-box {
  h2 {
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .echarts {
    width: 100%;
    min-width: 200px;
    height: 280px;
  }
}
</style>
