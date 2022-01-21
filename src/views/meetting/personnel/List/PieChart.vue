<template>
  <iep-charts class="echarts" :options="options" autoresize />
</template>
<script>
export default {
  name: "PieChart",
  props: {
    pieData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    options() {
      if (!this.pieData) {
        return {};
      }
      const arr = [];
      for (const key in this.pieData) {
        switch (key) {
          case "canMoneyPayCount":
            arr.push({ name: "宝贝支付-已支付", value: this.pieData[key] });
            break;
          // case "canMoneyPayCountRatio":
          //   arr.push({name:"",value:this.pieData[key]})
          //   break;
          case "cannelCount":
            arr.push({ name: "报名已取消", value: this.pieData[key] });
            break;
          // case "cannelCountRatio":
          //   arr.push({name:"",value:this.pieData[key]})
          //   break;
          case "freeCount":
            arr.push({ name: "免费", value: this.pieData[key] });
            break;
          // case "freeCountRatio":
          //   arr.push({name:"",value:this.pieData[key]})
          //   break;
          // case "offlineNoPayCount":
          //   arr.push({ name: "微信支付-待付款", value: this.pieData[key] });
          //   break;
          // case "offlineNoPayCountRatio":
          //   arr.push({name:"",value:this.pieData[key]})
          //   break;
          case "offlinePayCount":
            arr.push({ name: "微信支付-已支付", value: this.pieData[key] });
            break;
          // case "offlinePayCountRatio":
          //   arr.push({name:"",value:this.pieData[key]})
          //   break;
          case "pendingPaymentCount":
            arr.push({ name: "待付款", value: this.pieData[key] });
            break;
          // case "pendingPaymentCountRatio":
          //   arr.push({name:"",value:this.pieData[key]})
          //   break;
          default:
            break;
        }
      }
      return {
        tooltip: {
          trigger: "item",
          formatter: (param) => {
            return `${param.marker}${param.name}：${param.value}个（${param.percent}%）`;
          },
        },
        series: [
          {
            name: "订单状态统计",
            type: "pie",
            radius: ["15%", "35%"],
            center: ["50%", "50%"],
            label: {
              normal: {
                formatter: "{b}: {c} ({d}%) \n\n",
                // rich: {
                //   hr: {
                //     width: 10,
                //     height: 10,
                //     borderRadius: 50,
                //     backgroundColor: "#cccccc",
                //   },
                // },
                padding: [0, -70],
              },
            },
            labelLine: {
              normal: {
                length: 30,
                length2: 90,
                lineStyle: {
                  color: "#eff0f1",
                },
              },
            },

            data: arr,
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>