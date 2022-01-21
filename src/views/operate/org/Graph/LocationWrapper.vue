<template>
  <iep-wrapper title="组织所在地区分布">
    <iep-charts class="echarts" :options="options" autoresize />
  </iep-wrapper>
</template>
<script>
import { getStatisticsOrgRegion } from "@/api/admin/statistics";
export default {
  data() {
    return {
      workData: [],
      seriesData: [],
      nameData: [],
    };
  },
  computed: {
    maxSeriesData() {
      const maxData = Math.max(...this.seriesData);
      return this.seriesData.map(() => maxData);
    },
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        dataZoom: [
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "empty",
          },
        ],
        grid: {
          top: "0",
          left: "0",
          bottom: "0",
          containLabel: true,
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            data: this.nameData,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          {
            type: "category",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#303031",
                fontSize: "12",
              },
            },
            data: this.seriesData,
          },
        ],
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
              },
            },
            barWidth: 10,
            data: this.seriesData,
            showBackground: true,
            backgroundStyle: {
              color: "#f4f5f6",
              barBorderRadius: 5,
            },
          },
        ],
      };
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getStatisticsOrgRegion();
      this.workData = data;
      this.nameData = this.workData
        .map((m) => {
          return m.name || "其他";
        })
        .reverse();
      this.seriesData = this.workData.map((m) => m.value).reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>
