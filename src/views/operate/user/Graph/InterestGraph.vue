<template>
  <div class="graph">
    <div class="title-wrap">用户兴趣分布</div>
    <div class="charts-wrap">
      <iep-charts class="echarts" :options="options" autoresize />
    </div>
  </div>
</template>
<script>
import { getWordCloudTagsRefers } from "@/api/tms/relation";

export default {
  data() {
    return {
      datas: [],
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 30,
          },
        },
        series: [
          {
            type: "wordCloud",
            // 网格大小，各项之间间距
            gridSize: 10,
            // 形状 circle 圆，cardioid  心， diamond 菱形，
            // triangle-forward 、triangle 三角，star五角星
            shape: "circle",
            // 字体大小范围
            sizeRange: [12, 30],
            // 文字旋转角度范围
            rotationRange: [0, 0],
            // 旋转步值
            rotationStep: 0,
            // 自定义图形
            // maskImage: maskImage,
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            // 画布宽
            width: "90%",
            // 画布高
            height: "80%",
            // 是否渲染超出画布的文字
            drawOutOfBound: false,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 200 + 55),
                      Math.round(Math.random() * 200 + 55),
                      Math.round(Math.random() * 200 + 55),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#2ac",
              },
            },
            data: this.datas,
          },
        ],
      };
    },
  },
  methods: {
    async loadPage(num) {
      const { data } = await getWordCloudTagsRefers(num);
      if (data) {
        this.datas = data;
      }
    },
  },
  created() {
    this.loadPage(30);
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
