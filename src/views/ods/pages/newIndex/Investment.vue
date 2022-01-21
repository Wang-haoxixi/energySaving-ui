<template>
  <div class="matter-statistics">
    <IepAppTabCard :title="title" :linkName="linkName" style="position: relative;">
      <iep-charts class="echarts" v-loading="loading" :options="options" autoresize />
      <iep-charts class="echarts" v-loading="loading" :options="option" autoresize />
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
      title: "投资金额分布/投资组成",
      linkName: "/matter/matterRegister/index",
      materName: [],
      materData: [],
    };
  },
  watch: {},
  computed: {
    option() {
      return {
        title: {
          left: "center",
          text: "2020投资组成",
          textStyle: {
            fontWeight: "normal",
            color: "rgba(24,144,255, 0.9)",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["其他", "软件", "硬件", "配套"],
          formatter: name => {
            // 获取legend显示内容
            const data = this.option.series[0].data;
            let total = 0;
            let tarValue = 0;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            const p = ((tarValue / total) * 100).toFixed(2);
            return name + " " + " " + p + "%";
          },
        },
        series: [
          {
            name: "投资组成",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 100,
                name: "其他",
                itemStyle: {
                  normal: {
                    color: "#3499ce",
                  },
                },
              },
              {
                value: 60,
                name: "软件",
                itemStyle: {
                  normal: {
                    color: "#67e0e3",
                  },
                },
              },
              {
                value: 500,
                name: "硬件",
                itemStyle: {
                  normal: {
                    color: "#ffdb5c",
                  },
                },
              },
              {
                value: 50,
                name: "配套",
                itemStyle: {
                  normal: {
                    color: "#fd9e7e",
                  },
                },
              },
            ],
          },
        ],
      };
    },
    options() {
      return {
        title: {
          left: "center",
          text: "2020投资金额分布",
          textStyle: {
            fontWeight: "normal",
            color: "rgba(24,144,255, 0.9)",
            fontSize: 14,
          },
        },
        xAxis: {
          name: "万元",
          type: "category",
          data: [
            "51以下",
            "51-100",
            "101-200",
            "201-300",
            "301-500",
            "500以上",
          ],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "数量（个）",
          type: "value",
          max: 50,
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "资金",
            data: [4, 0, 3, 0, 0, 0, 0],
            type: "line",

            itemStyle: {
              normal: {
                color: "rgba(24,144,255, 0.9)",
                label: { show: true },
              },
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
  height: 202px !important;
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
