<template>
  <div class="matter-statistics">
    <IepAppTabCard :title="title">
      <div class="box">
        <div class="item">
          <span style="color:#9ea6b0">需求清单</span>
          <iep-charts class="echarts" :options="option1" autoresize />
        </div>
        <div class="item">
          <span style="color:#9ea6b0">责任清单</span>
          <iep-charts class="echarts" :options="option2" autoresize />
        </div>
        <div class="item">
          <span style="color:#9ea6b0">负面清单</span>
          <iep-charts class="echarts" :options="option3" autoresize />
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
function randomize() {
  return Array.from(new Array(5).keys()).map(() => {
    return Math.round(Math.random() * 10) / 1;
  });
}
const data1 = [
  {
    value: randomize()[0],
    name: "表格类",
  },
  {
    value: randomize()[1],
    name: "批文类",
  },
  {
    value: randomize()[2],
    name: "证明类",
  },
  {
    value: randomize()[3],
    name: "证照类",
  },
  {
    value: randomize()[4],
    name: "其他",
  },
];
const data2 = [
  {
    value: randomize()[3],
    name: "表格类",
  },
  {
    value: randomize()[2],
    name: "批文类",
  },
  {
    value: randomize()[0],
    name: "证明类",
  },
  {
    value: randomize()[1],
    name: "证照类",
  },
  {
    value: randomize()[4],
    name: "其他",
  },
];
const data3 = [
  {
    value: randomize()[3],
    name: "表格类",
  },
  {
    value: randomize()[4],
    name: "批文类",
  },
  {
    value: randomize()[2],
    name: "证明类",
  },
  {
    value: randomize()[0],
    name: "证照类",
  },
  {
    value: randomize()[1],
    name: "其他",
  },
];
export default {
  data() {
    return {
      title: "供需对接三清单",
      option1: {
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          containLabel: false,
        },
        title: {
          text: "数据项",
          subtext: "20",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "normal",
            color: ["#9ea6b0"],
          },
          subtextStyle: {
            color: "#23a7e7",
            fontSize: 18,
          },
        },
        color: ["#3aa1fe", "#37cbcb", "#4fcb73", "#fbd437", "#f3637c"],
        legend: {
          //图例组件，颜色和名字
          right: "center",
          top: "80%",
          height: "80",
          orient: "vertical",
          itemWidth: 6,
          itemHeight: 6,
          data: ["表格类", "批文类", "证明类", "证照类", "其他"],
          textStyle: {
            fontStyle: "normal",
            fontSize: 14,
            color: "#9ea6b0",
          },
        },
        series: [
          {
            name: "需求清单",
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ["50%", "50%"], //饼图的中心（圆心）坐标
            radius: [60, 90], //饼图的半径
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 3,
              },
            },
            label: {
              normal: {
                show: false,
                position: "left",
                textStyle: {
                  color: "#9ea6b0",
                },
              },
              emphasis: {
                show: false,
              },
            },
            data: data1,
          },
        ],
      },

      option2: {
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          containLabel: false,
        },
        title: {
          text: "数据项",
          subtext: "8",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "normal",
            color: ["#9ea6b0"],
          },
          subtextStyle: {
            color: "#23a7e7",
            fontSize: 18,
          },
        },
        color: ["#3aa1fe", "#37cbcb", "#4fcb73", "#fbd437", "#f3637c"],
        legend: {
          //图例组件，颜色和名字
          right: "center",
          top: "80%",
          height: "80",
          orient: "vertical",
          itemWidth: 6,
          itemHeight: 6,
          data: ["表格类", "批文类", "证明类", "证照类", "其他"],
          textStyle: {
            fontStyle: "normal",
            fontSize: 14,
            color: "#9ea6b0",
          },
        },
        series: [
          {
            name: "责任清单",
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ["50%", "50%"], //饼图的中心（圆心）坐标
            radius: [60, 90], //饼图的半径
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 3,
              },
            },
            label: {
              normal: {
                show: false,
                position: "center",
                textStyle: {
                  color: "#9ea6b0",
                },
              },
              emphasis: {
                show: false,
              },
            },
            data: data2,
          },
        ],
      },

      option3: {
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          containLabel: false,
        },
        title: {
          text: "数据项",
          subtext: "4",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "normal",
            color: ["#9ea6b0"],
          },
          subtextStyle: {
            color: "#23a7e7",
            fontSize: 18,
          },
        },
        color: ["#3aa1fe", "#37cbcb", "#4fcb73", "#fbd437", "#f3637c"],
        legend: {
          //图例组件，颜色和名字
          right: "center",
          top: "80%",
          height: "80",
          orient: "vertical",
          itemWidth: 6,
          itemHeight: 6,
          data: ["表格类", "批文类", "证明类", "证照类", "其他"],
          textStyle: {
            fontStyle: "normal",
            fontSize: 14,
            color: "#9ea6b0",
          },
        },
        series: [
          {
            name: "负面清单",
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 20, //最小的扇区角度（0 ~ 360）
            center: ["50%", "50%"], //饼图的中心（圆心）坐标
            radius: [60, 90], //饼图的半径
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#ffffff",
                borderWidth: 3,
              },
            },
            label: {
              normal: {
                show: false,
                position: "center",
                textStyle: {
                  color: "#9ea6b0",
                },
              },
              emphasis: {
                show: false,
              },
            },
            data: data3,
          },
        ],
      },
    };
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
  min-width: 200px;
  height: 350px !important;
  margin-top: -70px;
}

.matter-statistics {
  .box {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 33%;

      > span {
        font-size: 16px;
        color: #666769;
        display: block;
        width: 100%;
        text-align: center;
      }
    }

    .charts-a {
      width: 100%;
      height: 200px !important;
    }
  }
}
</style>
