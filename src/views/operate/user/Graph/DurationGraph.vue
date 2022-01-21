<template>
  <div class="graph">
    <div class="title-wrap">
      <div class="title iep-ellipsis">用户活跃时间段分布</div>
      <div class="param-wrap">
        <el-button @click="handle昨日()">昨日</el-button>
        <el-button @click="handle7日()">7日</el-button>
        <el-button @click="handle30日()">30日</el-button>
        <iep-date-picker
          class="date-picker"
          v-model="dateValue"
          type="date"
          placeholder="选择日期"
          size="medium"
        ></iep-date-picker>
      </div>
    </div>
    <div class="charts-wrap" v-loading="loading">
      <iep-charts class="echarts" :options="options" autoresize />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { getUserDuration } from "@/api/admin/statistics";
export default {
  data() {
    return {
      dateValue: null,
      loading: false,
      chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  computed: {
    dateData() {
      const date = this.dateValue ?? [];
      return {
        day: moment(date).date(),
        month: moment(date).months() + 1,
        year: moment(date).years(),
      };
    },
    options() {
      const valueList = this.chartData;
      const sum = valueList.reduce((a, b) => a + b);
      const percentList = valueList.map(m => ((m / sum) * 100).toFixed(2));
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "category",
          data: ["0点", "3点", "6点", "9点", "12点", "15点", "18点", "21点"],
        },
        yAxis: [
          {
            name: "百分比",
            type: "value",
            axisLabel: {
              formatter: [
                "{value}%", //引导线上面文字
              ].join("\n"), //用\n来换行
            },
          },
          {
            name: "活跃度",
            type: "value",
            max: function(value) {
              return value.max - 50;
            },
          },
        ],
        series: [
          {
            name: "百分比",
            data: percentList,
            type: "line",
          },
          {
            name: "活跃度",
            data: valueList,
            type: "line",
            showSymbol: false,
          },
        ],
      };
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    handle昨日() {
      this.dateValue = moment().subtract(1, "days");
    },
    handle7日() {
      this.dateValue = moment().subtract(7, "days");
    },
    handle30日() {
      this.dateValue = moment().subtract(30, "days");
    },
    async loadData() {
      this.loading = true;
      // {  "day":日,  "month": 月,  "year":  年}
      const { data } = await getUserDuration(this.dateData);
      console.log(data);
      this.chartData = data;
      this.loading = false;
    },
  },
  watch: {
    dateData: function() {
      this.loadData();
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    flex: 1;
  }
  .param-wrap {
    flex: 0 0 330px;
  }
  .date-picker {
    margin-left: 10px;
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
