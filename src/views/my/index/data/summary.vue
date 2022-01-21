<template>
  <iep-basic-container class="router-box">
    <iep-page-header :title="$route.name" :backOption="backOption"></iep-page-header>
    <!-- <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>-->
    <div class="content">
      <div class="data-content">
        <h3>数据资产变化趋势</h3>
        <div class="grid-content">
          <div class="chart">
            <LineChart :lineData="lineData"></LineChart>
          </div>
          <div class="data-text-box">
            <p>
              您的数据资产值累计为
              <span class="iep-red">{{data.assetsWorth}}</span>
            </p>
            <p>
              平台用户数据资产平均分为
              <span class="iep-red">{{data.assetsAverage}}</span>
            </p>
            <p>
              您已超过平台
              <span class="iep-red">{{data.stepPercent}}%</span>
              的用户！
            </p>
          </div>
        </div>
      </div>
      <div class="data-content">
        <!-- <h3>数据资产分布</h3> -->
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
              累计发布悬赏任务
              <span class="iep-red">{{data.releaseTasksWorth}}</span>
              次，完成悬赏任务
              <span class="iep-red">{{data.completeTasksWorth}}</span>次
            </p>
            <p>
              上传专栏文章
              <span class="iep-red">{{data.materialWorth}}</span>
              篇
            </p>
            <p>
              发布说说
              <span class="iep-red">{{data.thoughtWorth}}</span>
              条，被点赞
              <span class="iep-red">{{data.thumbsWorth}}</span>
              次，被评论
              <span class="iep-red">{{data.commentsWorth}}</span>
              次
            </p>
            <p>
              发送信函
              <span class="iep-red">{{data.emailWorth}}</span>
              次，发布纪要
              <span class="iep-red">{{data.meetingWorth}}</span>
              次，发布报表
              <span class="iep-red">{{data.reportWorth}}</span>
              次
            </p>
          </div>
        </div>
      </div>
      <el-button
        class="btn iep-btn-l"
        type="primary"
        @click="$openPage('/my/index/data_week')"
      >查看上周分析周报</el-button>
    </div>
  </iep-basic-container>
</template>
<script>
import LineChart from "./Components/LineChart";
import PieChart from "./Components/PieChart";
import { getWhole } from "@/api/dms/assets_analyse";
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
        taskScoreWorth: 0,
        thoughtScoreWorth: 0,
        documentScoreWorth: 0,
        communicationScoreWorth: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async init() {
      const { code, data } = await getWhole(this.userInfo.userId);
      if (!code) {
        this.data = data;
        const {
          xwhole,
          ywhole,
          taskScoreWorth, //任务
          thoughtScoreWorth, //说说
          documentScoreWorth, //文档
          communicationScoreWorth, //协同
        } = data;
        this.pieData = {
          taskScoreWorth,
          thoughtScoreWorth,
          documentScoreWorth,
          communicationScoreWorth,
        };
        const newXwhole = xwhole.map(item => {
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
@import "../router-box";
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
        flex: 0 0 372px;
        padding: 25px;
        background: $--background-color;
        border-radius: 10px;
        margin-left: 20px;
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
      }
    }
  }
}
.router-box ::v-deep .title-wrapper .title-col .page-title {
  font-size: 16px !important;
  line-height: 16px;
}
</style>
