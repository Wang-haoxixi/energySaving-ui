<template>
  <div class="chart-wrapper" v-loading="loading">
    <iep-wrapper :title="`${titleName||indexName}指标`">
      <div class="ibox">
        <div class="statistics">
          <div>
            <div class="num" :title="chart.count">{{chart.count}}</div>
            <div class="text">累计总{{indexName}}数</div>
          </div>
          <div class="num-box" v-for="(box,index) in boxList" :key="index">
            <div>
              <span class="num" :title="box.num">{{box.num}}</span> 日环比
              <span class="square">
                <i :class="[box.color,box.icon]"></i>
                {{box.grade}} %
              </span>
            </div>
            <div class="text">{{box.name}}</div>
          </div>
        </div>
        <div class="situation">
          <span>{{indexName}}新增情况</span>
          <span class="date">
            <el-date-picker
              v-model="dates"
              :picker-options="pickerOptions"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </span>
        </div>
        <div class="chart">
          <iep-charts class="echarts" :options="options" autoresize />
        </div>
      </div>
    </iep-wrapper>
  </div>
</template>
<script>
import moment from "moment";
import { genOptions, genBoxList } from "./options";
export default {
  name: "CommonChart",
  props: {
    func: {
      type: Function,
      required: true,
    },
    indexName: {
      type: String,
      required: true,
    },
    titleName: {
      type: String,
    },
  },
  computed: {
    options() {
      return genOptions(
        this.chart.xdata,
        this.chart.ydata,
        `当日${this.indexName}新增`,
      );
    },
    boxList() {
      return genBoxList(this.chart, this.indexName);
    },
  },
  data() {
    return {
      loading: false,
      chart: {
        count: 0,
        dayNew: 0,
        dayPercent: "0",
        weekNew: 0,
        weekPercent: "0",
        xdata: [],
        ydata: [],
      },
      dates: [moment().subtract(6, "days"), moment()],
      pickerOptions: {
        disabledDate: time => {
          if (time.getTime() > moment()) {
            return true;
          }
          // if (time.getTime() > moment(this.dates[0]).add(6, "days")) {
          //   return true;
          // }
          // if (time.getTime() < moment(this.dates[0]).subtract(6, "days")) {
          //   return true;
          // }
          return false;
        },
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      if (this.dates) {
        const end = moment(this.dates[1]);
        const start = moment(this.dates[0]);
        const duration = moment.duration(end.diff(start));
        const years = duration.asYears();
        if (years >= 1) {
          this.$message("范围不能大于一年");
          this.loading = false;
          return;
        }
      }
      const { data } = await this.func(this.dates);
      this.chart = data;
      this.loading = false;
    },
  },
  watch: {
    dates() {
      this.load();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>
