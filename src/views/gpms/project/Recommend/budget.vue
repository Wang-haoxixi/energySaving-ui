<template>
  <div>
    <h3 style="text-align: center;font-size:14px;">平均成本预算：{{averageBudget}}元</h3>
    <iep-charts class="echarts" :options="options" autoresize />
  </div>
</template>
<script>
import { averageBudget } from "@/api/gpms/index";
export default {
  props: {
    projectTagList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      averageBudget: 0,
      proportionBelow: 0,
      proportionBetween: 0,
      proportionAbove: 0,
    };
  },
  computed: {
    options() {
      return {
        color: ["#e8b0b3", "#edbf8e", "#93c5dc"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["90天以下", "90-180天", "180天以上"],
        },
        series: [
          {
            name: "demo",
            type: "pie",
            radius: ["40%", "60%"],
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 60,
                lineStyle: {
                  color: "#d3d3d3",
                },
                align: "right",
              },
              color: "rgb(48, 48, 49)",
              emphasis: {
                show: true,
              },
            },
            label: {
              normal: {
                color: "$--color-text-primary",
                formatter: function(params) {
                  let str = "";
                  switch (params.name) {
                    case "90天以下":
                      str = "90天以下 : " + params.value + "%";
                      break;
                    case "90-180天":
                      str = "90-180天 : " + params.value + "%";
                      break;
                    case "180天以上":
                      str = "180天以上 : " + params.value + "%";
                      break;
                  }
                  return str;
                },
                padding: [0, -100],
                height: 35,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    lineHeight: 50,
                    align: "left",
                  },
                },
              },
            },
            data: [
              { value: this.proportionBelow, name: "90天以下" },
              { value: this.proportionBetween, name: "90-180天" },
              { value: this.proportionAbove, name: "180天以上" },
            ],
          },
        ],
      };
    },
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      averageBudget({ projectTagList: this.projectTagList }).then(res => {
        this.proportionBelow = res.proportionBelow;
        this.proportionBetween = res.proportionBetween;
        this.proportionAbove = res.proportionAbove;
        this.averageBudget = res.averageBudget;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  margin: 0 auto;
  width: 100%;
  height: 250px;
}
</style>
