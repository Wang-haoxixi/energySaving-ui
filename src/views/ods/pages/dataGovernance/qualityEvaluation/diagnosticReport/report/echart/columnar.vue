<template>
  <div class="process_dialog">
    <div id="newmains" style="width: 1000px;height:300px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "tempchild",
  components: {},
  mixins: [],
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.open();
  },
  methods: {
    // 打开界面
    open() {
      const makeMultiLine = (str, charQty) => {
        const strs = str.split("");
        const len = strs.length;
        if (len < charQty + 1) {
          return str;
        }
        let result = "";
        strs.forEach((_, index) => {
          result += _;
          if ((index + 1) % charQty === 0 && index < len - 1) {
            result += "\n";
          }
        });
        return result;
      };
      this.diage = true;
      this.$nextTick(() => {
        const option = {
          title: {
            text: "脏数据比率最高的字段",
            x: "center",
            textStyle: {
              color: "#9ea6b0",
            },
          },
          tooltip: {
            trigger: "item",
            formatter: function(params) {
              return params.name + ":" + params.value.toFixed(2) + "%";
            },
          },
          xAxis: {
            data: this.data.title,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: function(val) {
                const str = makeMultiLine(val, 15); // 每 5 个字符一行
                return `${str}`; // 使用 rich 中的 n 来设置样式
              },
              textStyle: {
                color: "#888",
                overhidden: "hidden",
              },
              margin: 20, //刻度标签与轴线之间的距离。
            },
          },
          yAxis: {
            splitLine: {
              show: true,
              lineStyle: {
                color: "#eee",
                type: "dashed",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#888",
              },
            },
          },
          series: [
            {
              name: "",
              type: "pictorialBar",
              symbolSize: [100, 25],
              symbolOffset: [0, -10],
              z: 12,
              symbolPosition: "end",
              itemStyle: {
                normal: {
                  color: "#d7ebcb",
                },
              },
              data: this.data.value,
            },
            {
              name: "",
              type: "pictorialBar",
              symbolSize: [100, 25],
              symbolOffset: [0, 10],
              z: 12,
              itemStyle: {
                normal: {
                  color: "#69c37b",
                },
              },
              data: this.data.value,
            },
            {
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#69c37b",
                },
              },
              barWidth: 100,
              data: this.data.value,
            },
          ],
        };
        const myChart = echarts.init(document.getElementById("newmains"));
        myChart.setOption(option);
      });
      // console.log(this.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.process_dialog {
  text-align: center;
}
#newmains {
  margin: 0 auto;
}
</style>
