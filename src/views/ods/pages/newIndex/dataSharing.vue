<template>
  <div class="matter-statistics">
    <IepAppTabCard :title="title">
      <div class="title">
        <span class="title_blue">
          开放数据：
          <div style="color:#24a7eb">3</div>
        </span>
        <span class="title_blue">
          共享数据：
          <div style="color:#24a7eb">5</div>
        </span>
      </div>
      <iep-charts class="echarts" :options="options" autoresize />
    </IepAppTabCard>
  </div>
</template>

<script>
function randomize() {
  return Array.from(new Array(12).keys()).map(() => {
    return (Math.round(Math.random() * 100) / 10).toFixed();
  });
}
export default {
  data() {
    return {
      title: "数据开放共享",
      chartData: {
        columns: ["日期", "数据需求", "数据认责", "负面请求"],
        rows: [
          { 日期: "01", 数据需求: 1393, 数据认责: 1093, 负面请求: 8.32 },
          { 日期: "02", 数据需求: 3530, 数据认责: 3230, 负面请求: 8.26 },
          { 日期: "03", 数据需求: 2923, 数据认责: 2623, 负面请求: 8.76 },
          { 日期: "04", 数据需求: 1723, 数据认责: 1423, 负面请求: 8.49 },
          { 日期: "05", 数据需求: 3792, 数据认责: 3492, 负面请求: 8.323 },
          { 日期: "06", 数据需求: 4593, 数据认责: 4293, 负面请求: 8.78 },
          { 日期: "07", 数据需求: 5222, 数据认责: 5322, 负面请求: 8.22 },
          { 日期: "08", 数据需求: 4593, 数据认责: 2434, 负面请求: 8.54 },
          { 日期: "09", 数据需求: 3552, 数据认责: 1245, 负面请求: 8.49 },
          { 日期: "10", 数据需求: 3372, 数据认责: 2923, 负面请求: 8.58 },
          { 日期: "11", 数据需求: 9222, 数据认责: 1238, 负面请求: 8.12 },
          { 日期: "12", 数据需求: 2831, 数据认责: 5955, 负面请求: 8.62 },
        ],
      },
    };
  },
  computed: {
    options() {
      return {
        legend: {
          data: ["数据需求", "数据认责", "负面请求"],
          bottom: 10,
          left: "center",
          textStyle: {
            color: "#9ea6b0",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: Array.from(new Array(12).keys()).map(m => `${1 + m}月`),
          axisLine: {
            lineStyle: {
              color: "#9ea6b0",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#9ea6b0",
            },
          },
        },
        series: [
          {
            name: "数据需求",
            type: "line",
            data: randomize(),
            itemStyle: {
              color: "#188bf6",
            },
          },
          {
            name: "数据认责",
            type: "line",
            data: randomize(),
            itemStyle: {
              color: "#2dbc57",
            },
          },
          {
            name: "负面请求",
            type: "line",
            data: randomize(),
            itemStyle: {
              color: "#f2c512",
            },
          },
        ],
      };
    },
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
// .baner {
//   grid-column-start: 1;
//   grid-column-end: 3;
//   display: grid;
// }
.echarts {
  width: 100%;
  min-width: 300px;
  height: 300px !important;
  margin-top: -25px;
}
.matter-statistics {
  .title {
    width: 100%;
    text-align: center;
    font-size: 14px;
    > span {
      display: inline-block;
      margin-right: 40px;
      > div {
        display: inline-block;
      }
    }
  }
}
</style>
