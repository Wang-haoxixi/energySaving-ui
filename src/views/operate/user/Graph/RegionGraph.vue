<template>
  <div class="graph">
    <div class="title-wrap">用户所在地域分布</div>
    <div class="charts-wrap">
      <iep-charts class="echarts" :options="options" autoresize />
    </div>
  </div>
</template>
<script>
import { getStatisticsUserWorkPlace } from "@/api/admin/statistics";
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
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function(params) {
            return params[0].name + " : " + params[0].value;
          },
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
            name: "TOP7 区域",
            nameTextStyle: {
              color: "#000",
            },
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
            name: "分布人数",
            nameTextStyle: {
              color: "#303031",
            },
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
            legendHoverLink: false,
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
      const { data } = await getStatisticsUserWorkPlace();
      this.workData = data.slice(0, 7);
      this.nameData = this.workData
        .map(m => {
          return m.name || "其他";
        })
        .reverse();
      this.seriesData = this.workData.map(m => m.value).reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
.graph {
  .charts-wrap {
    height: 300px;
    width: 100%;
    .echarts {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
