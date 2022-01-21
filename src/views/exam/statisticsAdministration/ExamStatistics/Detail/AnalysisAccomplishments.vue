<template>
  <div>
    <iep-charts class="echarts" :options="options" autoresize />
  </div>
</template>
<script>
import { getScoreAnalyseById } from "@/api/exam/exam_statistics";
export default {
  data() {
    return {
      xData: [],
      yData: [],
    };
  },
  computed: {
    options() {
      return {
        xAxis: {
          type: "category",
          data: this.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.yData,
            type: "bar",
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
      const { data } = await getScoreAnalyseById(this.$route.params.id);
      this.xData = data.xData;
      this.yData = data.yData;
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
}
</style>
