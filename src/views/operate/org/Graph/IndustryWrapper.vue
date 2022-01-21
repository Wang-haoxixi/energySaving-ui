<template>
  <iep-wrapper title="组织所在行业分布">
    <iep-charts class="echarts" :options="options" autoresize />
  </iep-wrapper>
</template>
<script>
import { getStatisticsOrgIndustry } from "@/api/admin/statistics";
export default {
  data() {
    return {
      industryData: [],
      nameData: [],
      valueData: [],
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "10px",
          left: "0",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        // dataZoom: [
        //   {
        //     type: "slider",
        //     xAxisIndex: 0,
        //     filterMode: "empty",
        //   },
        // ],
        xAxis: [
          {
            type: "category",
            data: this.nameData,
            axisTick: {
              alignWithLabel: true,
            },

            axisLabel: { rotate: 30, interval: 0 },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 5,
              },
            },
            barWidth: 10,
            data: this.valueData,
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
      const { data } = await getStatisticsOrgIndustry();
      this.industryData = data;
      this.nameData = this.industryData.map((m) => {
        if (m.name) {
          return m.name;
        } else {
          return "其他";
        }
      });
      this.valueData = this.industryData.map((m) => m.value);
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
