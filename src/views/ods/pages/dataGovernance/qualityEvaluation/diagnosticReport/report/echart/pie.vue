<template>
  <div class="process_dialog">
    <div id="newmain" style="width: 1000px;height:300px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "tempchild",
  components: {},
  mixins: [],
  data() {
    return {
      data: [
        {
          name: "诊断字段数量比率",
          value: 42,
        },
        {
          name: "异常字段数量比率",
          value: 44,
        },
        {
          name: "脏数据数量比率",
          value: 35,
        },
      ],
    };
  },
  props: {
    list: {
      type: Object,
      default: () => [],
    },
  },
  created() {
    this.open();
  },
  methods: {
    // 打开界面
    open() {
      // console.log(this.list);
      this.diage = true;
      this.$nextTick(() => {
        const data = [
          {
            name: "诊断字段数量比率",
            value: (
              (this.list.reportFieldQuantity / this.list.fieldQuantity) *
              100
            ).toFixed(2),
          },
          {
            name: "异常字段数量比率",
            value: (
              (this.list.errorFieldQuantity / this.list.fieldQuantity) *
              100
            ).toFixed(2),
          },
          {
            name: "脏数据数量比率",
            value: (
              (this.list.errorEntityDataQuantity /
                this.list.entityDataQuantity) *
              100
            ).toFixed(2),
          },
        ];
        const titleArr = [],
          seriesArr = [];
        const colors = [
          ["#389af4", "#dfeaff"],
          ["#FF3030", "#fed4e0"],
          ["#FF3030", "#fed4e0"],
        ];
        data.forEach(function(item, index) {
          titleArr.push({
            text: item.name,
            left: index * 33 + 10 + "%",
            top: "80%",
            textAlign: "center",
            textStyle: {
              fontWeight: "normal",
              fontSize: "16",
              color: colors[index][0],
              textAlign: "center",
            },
          });
          seriesArr.push({
            name: item.name,
            type: "pie",
            clockWise: false,
            radius: [60, 70],
            itemStyle: {
              normal: {
                color: colors[index][0],
                shadowColor: colors[index][0],
                shadowBlur: 0,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            center: [index * 33 + 10 + "%", "50%"],
            data: [
              {
                value: item.value,
                label: {
                  normal: {
                    formatter: function(params) {
                      return params.value + "%";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "20",
                      fontWeight: "bold",
                      color: colors[index][0],
                    },
                  },
                },
              },
              {
                value: 100 - item.value,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: colors[index][1],
                  },
                  emphasis: {
                    color: colors[index][1],
                  },
                },
              },
            ],
          });
        });

        const option = {
          title: titleArr,
          series: seriesArr,
        };
        const myChart = echarts.init(document.getElementById("newmain"));
        myChart.setOption(option);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.process_dialog {
  text-align: center;
  height: 300px;
}
#newmain {
  margin: 0 auto;
}
</style>
