<template>
  <div class="water-fall-box">
    <h2>常用标签瀑布图</h2>
    <iep-no-data v-if="!commontag.length" style="height: 300px;"></iep-no-data>
    <el-menu
      v-if="commontag.length"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in commontag" :index="item.tagId+''" :key="item.tagId">{{item.name}}</el-menu-item>
    </el-menu>
    <iep-charts class="echarts" :options="options" autoresize />
  </div>
</template>

<script>
import { getTagCommon, getTagRelationList } from "@/api/tms/statistics";
export default {
  data() {
    this.extend = {
      "xAxis.0.axisLabel.rotate": 45,
    };
    return {
      realData: [],
      activeIndex: "1",
      commontag: [],
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            const tar = params[0];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            splitLine: { show: false },
            data: this.realData.map(m => m.name),
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
              emphasis: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: this.realData.map(m => m.count),
          },
          {
            name: "数量",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                label: { show: true, position: "inside" },
                color: "#1baed0",
              },
            },
            data: this.realData.map(m => m.count).reverse(),
          },
        ],
      };
    },
  },
  created() {
    this.loadCommonTag();
  },
  methods: {
    async loadCommonTag() {
      const data = await getTagCommon();
      this.commontag = data;
      this.activeIndex = data[0].tagId + "";
      this.loadRelationList(this.activeIndex);
    },
    async loadRelationList(id) {
      const data = await getTagRelationList(id);
      this.realData = data;
    },
    handleSelect(index) {
      this.loadRelationList(index);
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  min-width: 200px;
  height: 380px;
}
.water-fall-box {
  > .el-menu {
    display: flex;
    justify-content: flex-start;
  }
  > .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 20px;
    font-size: 14px;
  }
  > .el-menu--horizontal > .el-menu-item.is-active {
    font-size: 16px;
    color: $--color-primary;
  }
}
h2 {
  font-size: 18px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
</style>
