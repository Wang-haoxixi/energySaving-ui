<template>
  <div class="matter-statistics">
    <IepAppTabCard :title="title" :linkName="linkName" style="position: relative;">
      <iep-charts class="echarts" v-loading="loading" :options="options" autoresize />
    </IepAppTabCard>
  </div>
</template>

<script>
// import { getMatter } from "@/api/workbench"
// function randomize () {
//   return Math.round(300 + Math.random() * 700) / 10
// }
// import echarts from "echarts"
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: "历年项目",
      linkName: "/matter/matterRegister/index",
      materName: [],
      materData: [],
    };
  },
  watch: {},
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "教育",
            "医疗",
            "公安",
            "城管",
            "交通",
            "审计",
            "其他",
            "资金",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["2016年", "2017年", "2018年", "2019年", "2020年"],
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            show: false,
            type: "value",
            axisTick: {
              show: false,
            },
          },
          {
            splitLine: {
              show: false,
            },
            type: "value",
            name: "资金(万元)",
            position: "right",
            axisLine: {
              lineStyle: {
                color: "rgba(24,144,255, 0.9)",
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "教育",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [1, 2, 4, 4, 1],
            itemStyle: {
              normal: {
                color: "rgba(52,155,208, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "医疗",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [1, 1, 3, 2, 1],
            itemStyle: {
              normal: {
                color: "rgba(90,212,211, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "公安",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [1, 1, 1, 1, 4],
            itemStyle: {
              normal: {
                color: "rgba(234,247,134, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "城管",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [0, 0, 1, 1, 2],
            itemStyle: {
              normal: {
                color: "rgba(255,181,161, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "交通",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [0, 0, 3, 3, 1],
            itemStyle: {
              normal: {
                color: "rgba(184,255,184, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "审计",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [0, 1, 3, 4, 1],
            itemStyle: {
              normal: {
                color: "rgba(184,244,255, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "其他",
            type: "bar",
            stack: "总量",
            label: {
              // show: true,
              // position: 'insideRight'
            },
            data: [0, 2, 3, 6, 2],
            itemStyle: {
              normal: {
                color: "rgba(217,217,243, 0.9)",
              },
            },
            barWidth: 30,
            barGap: "70%",
          },
          {
            name: "资金",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(24,144,255, 0.9)",
              },
            },
            label: {
              show: true,
              // position: 'insideRight'
            },
            yAxisIndex: 1,
            data: [200, 1000, 163200, 1111, 200],
            markLine: {
              symbol: "none", //去掉警戒线最后面的箭头
              label: {
                position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                formatter: "数量 30",
              },
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "dashed",
                    color: "$--color-input-regular",
                  },
                  name: "数量 30",
                  yAxis: 180000,
                },
              ],
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
  height: 404px !important;
}

.tab {
  position: absolute;
  top: 15px;
  left: 180px;

  > span {
    height: 30px;
    line-height: 30px;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    font-size: 16px;
  }

  .active {
    color: #23a8eb;
  }
}
</style>
