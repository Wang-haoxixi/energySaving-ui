<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="800px" @close="_close()">
    <div v-loading="loading">
      <div class="header">
        <div class="title">
          报名新增情况
          <span class="subtitle">
            总报名人数：
            <span>{{userStatistics.enroleCount}}</span>
          </span>
        </div>
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="changeDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <bar-chart :barData="userStatistics.statisticsItems"></bar-chart>
      <div class="header">
        <div class="title">订单状态统计</div>
      </div>
      <pie-chart :pieData="statusStatistics"></pie-chart>
      <div class="header">
        <div class="title">
          签到人数统计
          <span class="subtitle">
            总计销售票：
            <span>{{signStatistics.headCount}}</span>
          </span>
        </div>
      </div>
      <pie-chart-sign :pieData="signStatistics"></pie-chart-sign>
    </div>
  </iep-dialog>
</template>
<script>
import {
  statusStatistics,
  userStatistics,
  signStatistics,
} from "@/api/meetting/enroll";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import PieChartSign from "./PieChartSign";
import { parseToDay } from "@/filters/index.ts";

export default {
  name: "DialogChart",
  components: {
    BarChart,
    PieChart,
    PieChartSign,
  },
  props: {
    title: {
      type: String,
      default: "统计",
    },
  },
  data() {
    return {
      dialogShow: false,
      timeRange: {},
      pickerOptions: {
        disabledDate: v => {
          const d = new Date();
          const s = new Date(
            parseToDay(this.timeRange.startTime) + " 00:00:00",
          );
          const e = new Date(parseToDay(this.timeRange.endTime) + " 00:00:00");
          return v > d || v < s || v > e;
        },
      },
      timeValue: [],
      conferenceId: 0,
      statusStatistics: null,
      userStatistics: {},
      signStatistics: {},
      loading: false,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    init() {
      let endTime = new Date();
      const s = new Date(this.timeRange.startTime);
      const e = new Date(this.timeRange.endTime);
      endTime = endTime > e ? e : endTime;
      let startTime = endTime - 6 * 24 * 60 * 60 * 1000;
      startTime = startTime < s ? s : startTime;
      if (startTime > endTime) {
        this.timeValue = [];
        return;
      }
      this.timeValue = [parseToDay(startTime), parseToDay(endTime)];
      this.loadPage();
    },
    async loadPage() {
      const params = {
        conferenceId: this.conferenceId,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1],
      };
      this.loading = true;
      {
        const { code, data } = await statusStatistics({
          conferenceId: this.conferenceId,
        });
        if (!code) {
          this.statusStatistics = data;
        }
      }
      {
        const { code, data } = await userStatistics(params);
        if (!code) {
          this.userStatistics = data;
        }
      }
      {
        const { code, data } = await signStatistics(params);
        if (!code) {
          this.signStatistics = data;
        }
      }
      this.loading = false;
    },
    changeDate(v) {
      this.timeValue = v;
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  margin-right: 20px;
  .title {
    .subtitle {
      font-size: 14px;
      color: $--color-text-secondary;
      margin-left: 10px;
      span {
        color: $--color-primary;
      }
    }
  }
}
</style>
