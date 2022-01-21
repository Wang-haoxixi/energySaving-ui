<template>
  <iep-basic-container class="router-box">
    <iep-page-header :title="title" :backOption="backOption"></iep-page-header>
    <!-- <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>-->
    <div class="content">
      <div class="data-content">
        <h3>数据变化趋势</h3>
        <div class="grid-content">
          <div class="chart">
            <LineChart :lineData="lineData"></LineChart>
          </div>
          <div class="data-text-box">
            <p>
              <span class="org-name">“{{userInfo.orgName}}”</span>&nbsp;数据资产值累计为
              <span class="iep-red">{{data.soAssetsWorth|showBigNumber|arrJoin}}</span>，
            </p>
            <p>
              平台内所有组织的数据资产平均分为
              <span class="iep-red">{{data.soAssetsAverage|showBigNumber|arrJoin}}</span>，
            </p>
            <p>
              您超过平台
              <span class="iep-red">{{data.soStepPercent}}%</span>
              的组织！
            </p>
          </div>
        </div>
      </div>
      <div class="data-content">
        <h3>数据分布图</h3>
        <div class="grid-content">
          <div class="chart">
            <PieChart :total="data.assetsWorth" :pieData="pieData"></PieChart>
          </div>
          <div class="data-text-box">
            <p>
              截至上周末
              <i class="iep-font-color-2">（ {{data.lastWeekSunday}} ）</i>
            </p>
            <p>
              本组织已经累计发布材料
              <span class="iep-red">{{data.soMaterialWorth}}</span>
              篇，
            </p>
            <p>
              发布协作任务
              <span class="iep-red">{{data.soReleaseTasksWorth}}</span>次，发布会议纪要
              <span class="iep-red">{{data.soMeetingWorth}}</span>篇，
            </p>
            <p>
              发布报表总数
              <span class="iep-red">{{data.soReportWorth}}</span>篇，发布魔方产品
              <span class="iep-red">{{data.soSoftWareNumWorth|showBigNumber|arrJoin}}</span>份，
            </p>
            <p>
              发布问卷总数
              <span class="iep-red">{{data.soQuestionnaireWorth}}</span>份，发布会议活动
              <span class="iep-red">{{data.soActivityWorth}}</span>次，
            </p>
          </div>
        </div>
      </div>
      <!-- <el-button
        class="btn iep-btn-l"
        type="primary"
        @click="$openPage('/my/index/data_week')"
      >查看上周分析周报</el-button>-->
    </div>
  </iep-basic-container>
</template>
<script>
import LineChart from "./Components/LineChart";
import PieChart from "./Components/PieChart";
import { getWholeSo } from "@/api/dms/assets_analyse";
import { mapGetters } from "vuex";
import mixins from "./mixins/mixins";

export default {
  components: {
    LineChart,
    PieChart,
  },
  mixins: [mixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      dateRange: [],
      data: {},
      lineData: {},
      pieData: {
        soActivityScoreWorth: 0,
        soMaterialScoreWorth: 0,
        soMeetingScoreWorth: 0,
        soProductScoreWorth: 0,
        soQuestionnaireScoreWorth: 0,
        soReportScoreWorth: 0,
        soTaskScoreWorth: 0,
      },
      title: "组织数据资产总体分析",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async init() {
      const { code, data } = await getWholeSo(this.userInfo.orgId);
      if (!code) {
        this.data = data;
        const {
          xwhole,
          ywhole,
          soActivityScoreWorth, //活动分
          soMaterialScoreWorth, //材料
          soMeetingScoreWorth, //会议纪要
          soProductScoreWorth, //魔方产品
          soQuestionnaireScoreWorth,
          soReportScoreWorth,
          soTaskScoreWorth,
        } = data;
        this.pieData = {
          soActivityScoreWorth,
          soMaterialScoreWorth,
          soMeetingScoreWorth,
          soProductScoreWorth,
          soQuestionnaireScoreWorth,
          soReportScoreWorth,
          soTaskScoreWorth,
        };
        const newXwhole = xwhole.map((item) => {
          const week = this.getYearWeek(item);
          return week ? `第${week}周` : "暂无";
        });
        this.lineData = {
          xwhole: newXwhole.reverse(),
          ywhole: ywhole.reverse(),
        };
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.router-box {
  // padding: 20px 20px;
  background-color: #fff;
  // border: 1px solid $--border-color;
  border-radius: 10px;
}
.router-box ::v-deep {
  .wrapper {
    margin: 0;
    padding: 0;
  }
}

.router-box ::v-deep {
  .el-date-editor {
    margin: 20px 0;
  }
  .btn {
    margin-top: 20px;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .data-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    &:nth-child(2) {
      margin-top: 60px;
    }
    h3 {
      margin: 15px 0;
      font-size: 14px;
    }
    .grid-content {
      display: flex;
      width: 100%;
      .chart {
        flex: 1;
      }
      .data-text-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        padding: 25px;
        background: $--background-color;
        border-radius: 10px;
        margin-left: 40px;
        box-sizing: border-box;
        p {
          margin: 5px 0;
          font-size: 14px;
          color: #666769;
          i {
            font-style: normal;
          }
        }
        span {
          font-size: 20px;
        }
        .org-name {
          font-size: 16px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
      }
    }
  }
}
.router-box ::v-deep .title-wrapper .title-col .page-title {
  font-size: 16px !important;
  line-height: 16px;
}
</style>
