<template>
  <div class="graph">
    <div class="title-wrap">
      <div class="title iep-ellipsis">用户注册来源</div>
      <div>
        <iep-date-picker
          class="date-picker"
          v-model="dateValue"
          type="month"
          placeholder="选择月"
          size="medium"
        ></iep-date-picker>
      </div>
    </div>
    <div class="charts-wrap">
      <iep-charts class="echarts" :options="options" autoresize />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateValue: null,
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "用户注册来源",
            type: "pie",
            radius: ["40%", "60%"],
            label: {
              //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
              show: true,
              color: "#666769",
              //a和b来识别不同的文字区域
              formatter: [
                "{b|{b}}", //引导线文字
                "{a|{c}人  {d}%}", //引导线上面文字
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
            data: [
              { value: 20, name: "活动" },
              { value: 12, name: "问卷" },
              { value: 10, name: "考试" },
              { value: 7, name: "魔方" },
              { value: 6, name: "用户" },
              { value: 6, name: "组织" },
              { value: 6, name: "工厂" },
              { value: 6, name: "能聘" },
            ],
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .date-picker {
    width: 140px;
  }
}
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
