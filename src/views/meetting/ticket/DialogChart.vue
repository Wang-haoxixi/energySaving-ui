<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="800px" @close="_close()">
    <div v-loading="loading">
      <div class="header">
        <div class="title">票款收入新增情况</div>
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
      <div class="income">
        <span>
          总宝贝收入：
          <span>{{statisticsData.canMoney||0}}贝</span>
        </span>
        <span>
          总人民币收入：
          <span>{{statisticsData.money||0}}元</span>
        </span>
      </div>
      <bar-chart :barData="statisticsData.ticketingItemList"></bar-chart>
    </div>
  </iep-dialog>
</template>
<script>
import { ticketingStatistics } from "@/api/meetting/enroll";
import BarChart from "./BarChart";
import { parseToDay } from "@/filters/index.ts";

export default {
  name: "DialogChart",
  components: {
    BarChart,
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
        disabledDate: (v) => {
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
      statisticsData: {},
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
      const { code, data } = await ticketingStatistics(params);
      if (!code) {
        this.statisticsData = data;
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
}
.income {
  margin: 20px 0 0;
  span {
    margin-right: 10px;
    span {
      color: $--color-primary;
    }
  }
}
</style>
