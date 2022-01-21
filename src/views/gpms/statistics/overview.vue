<template>
  <div class="overview">
    <iep-charts class="echarts" :options="options" autoresize />
    <el-date-picker
      class="picker"
      v-model="changeDate"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      value-format="yyyy-MM"
    ></el-date-picker>
  </div>
</template>
<script>
import { getInfoCurve } from "@/api/gpms/statistics";
import { mapGetters } from "vuex";
export default {
  props: {
    infoType: {
      type: String,
      default: "my",
    },
  },
  data() {
    return {
      changeDate: "",
      timeList: [],
      options: {
        title: {
          text: "项目概览分月统计图",
          textStyle: {
            fontSize: "16",
            fontWeight: 0,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["创建项目", "签订项目", "完成项目"],
          bottom: 0,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          top: "18%",
          left: "5%",
          right: "5%",
          bottom: "15%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "创建项目",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            name: "签订项目",
            type: "line",
            stack: "总量",
            data: [],
          },
          {
            name: "完成项目",
            type: "line",
            stack: "总量",
            // label: {
            //   normal: {
            //     show: true,
            //     position: "top",
            //   },
            // },
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.initialization();
    this.getData();
  },
  methods: {
    initialization() {
      let year = new Date().getFullYear();
      let mon = new Date().getMonth() + 1;
      for (let i = 0; i < 6; i++) {
        if (mon <= 0) {
          year = year - 1;
          mon = mon + 12;
        }
        if (mon < 10) {
          mon = "0" + mon;
        }
        this.timeList[i] = year + "-" + mon;
        mon = mon - 1;
      }
      this.timeList = this.timeList.reverse();
      this.changeDate = [this.timeList[0], this.timeList[5]];
    },
    getData() {
      getInfoCurve({
        userId: this.infoType === "my" ? this.userInfo.userId : "",
        maxDate: this.timeList[5],
        minDate: this.timeList[0],
      }).then(res => {
        const arryRes = Object.values(res);
        const xAxisList = [];
        for (const name in res) {
          xAxisList.push(name); //属性
        }
        this.$set(this.options.xAxis[0], "data", xAxisList);
        for (const i in this.options.series) {
          for (const j in arryRes) {
            this.options.series[i].data[j] = arryRes[j][i];
          }
        }
      });
    },
  },
  watch: {
    changeDate(val) {
      this.timeList[0] = val[0];
      this.timeList[5] = val[1];
      this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 400px;
}
.overview {
  margin-top: 40px;
  position: relative;
  .picker {
    position: absolute;
    top: 0;
    right: 5%;
  }
}
</style>
