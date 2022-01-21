<template>
  <iep-wrapper title="组织资产规模">
    <iep-charts class="echarts" :options="options" autoresize />
  </iep-wrapper>
</template>
<script>
import { getOperateOrgBell } from "@/api/admin/statistics";
export default {
  data() {
    return {
      bellData: [],
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        grid: {
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "60%"],
            label: {
              //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
              show: true,
              color: "#666769",
              //a和b来识别不同的文字区域
              formatter: [
                "{b|{b}}", //引导线文字
                "{a|{c}人{d}%}", //引导线上面文字
              ].join("\n"), //用\n来换行
              rich: {
                a: {
                  color: "#666769", // 圆点颜色和饼图块状颜色一致
                },
                b: {
                  color: "#666769", // 圆点颜色和饼图块状颜色一致
                },
              },
            },
            minAngle: 5,
            avoidLabelOverlap: true,
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              length: 20, // 第一段线 长度
              length2: 30, // 第二段线 长度
              align: "right",
              lineStyle: {
                color: "#666769",
                opacity: 0.2,
              },
            },
            data: this.bellData,
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
      const { data } = await getOperateOrgBell();
      this.bellData = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>
