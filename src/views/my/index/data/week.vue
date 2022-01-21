<template>
  <iep-basic-container class="router-box">
    <iep-page-header :title="$route.name" :backOption="backOption">
      <span slot="left" class="week">( 第{{getYearWeek(data.lastWeekSunday)}}周 )</span>
    </iep-page-header>
    <div class="content">
      <div class="data-content">
        <div class="grid-content">
          <div class="chart">
            <PieChart :total="data.assetsUpWorth" :pieData="pieData"></PieChart>
          </div>
          <div class="data-text-box">
            <p>
              您的数据资产值累计增加
              <span class="iep-red">{{data.assetsUpWorth}}</span>，超过了平台
              <span class="iep-red">{{data.stepUpPercent}}%</span>的用户，表现很棒哦！
            </p>
            <p v-if="data.taskUpWorth">
              上周累计完成
              <span class="iep-red">{{data.taskUpWorth}}</span>次悬赏任务，给辛苦工作一周的自己点个赞吧!
            </p>
            <p v-else>
              上周累计完成
              <span class="iep-red">{{data.taskUpWorth}}</span>次悬赏任务，下周请继续努力啊
            </p>
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <iep-page-header title="建议"></iep-page-header>
          <div class="suggest-box">
            <div v-for="(item,index) of suggestDate" :key="item.id">
              <p v-if="item.type==='task'">
                {{index+1}}、上周您在
                &nbsp;
                <el-tag>任务协作</el-tag>&nbsp;模块所积累的资产值没有合格哦，建议在本周完成更多悬赏任务，为自己赋能哦~
              </p>
              <p v-else-if="item.type==='document'">
                {{index+1}}、上周您在
                &nbsp;
                <el-tag>文档共享</el-tag>&nbsp;模块所积累的资产值没有合格哦，建议在本周发布更多优质内容，参与平台互动哦~
              </p>
              <p v-else-if="item.type==='thought'">
                {{index+1}}、上周您在
                &nbsp;
                <el-tag>说说互动</el-tag>&nbsp;模块所积累的资产值没有合格哦，建议在本周发布更多优质说说，参与平台互动哦~
              </p>
              <p v-else-if="item.type==='communication'">
                {{index+1}}、上周您在
                &nbsp;
                <el-tag>协同交流</el-tag>&nbsp;模块所积累的资产值没有合格哦，建议在本周完成多总结，多交流，为自己赋能哦~
              </p>
              <p v-else>
                {{index+1}}、
                <span v-if="item.state">上周您的数据资产构成非常健康，请在本周继续保持！</span>
                <span v-else></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </iep-basic-container>
</template>
<script>
import PieChart from "./Components/PieChart";
import { getLastWeek } from "@/api/dms/assets_analyse";
import { mapGetters } from "vuex";
import mixins from "./mixins/mixins";
const PassMap = {
  task: 30,
  document: 10,
  thought: 10,
  communication: 10,
};
export default {
  components: {
    PieChart,
  },
  mixins: [mixins],
  data() {
    return {
      backOption: {
        isBack: true,
      },
      data: {},
      pieData: {
        taskScoreWorth: 0, //任务
        thoughtScoreWorth: 0, //说说
        documentScoreWorth: 0, //文档
        communicationScoreWorth: 0, //协同,
      },
      suggestBoxData: [{ id: 105, type: "all" }],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    suggestDate() {
      const suggestBoxData = [];
      let flag = false;
      if (this.pieData.taskScoreWorth < PassMap["task"]) {
        suggestBoxData.push({ id: 101, type: "task" });
        flag = true;
      }
      if (this.pieData.documentScoreWorth < PassMap["document"]) {
        suggestBoxData.push({ id: 103, type: "document" });
        flag = true;
      }
      if (this.pieData.thoughtScoreWorth < PassMap["thought"]) {
        suggestBoxData.push({ id: 102, type: "thought" });
        flag = true;
      }
      if (this.pieData.communicationScoreWorth < PassMap["communication"]) {
        suggestBoxData.push({ id: 104, type: "communication" });
        flag = true;
      }
      if (!flag) {
        suggestBoxData.push({ id: 105, type: "all", state: true });
      }
      return suggestBoxData;
    },
  },
  methods: {
    async init() {
      const { code, data } = await getLastWeek(this.userInfo.userId);
      if (!code) {
        this.data = data;
        const {
          taskCooperationUpWorth, //任务
          thoughtUpWorth, //说说
          documentUpWorth, //文档
          communicationUpWorth, //协同
        } = data;
        this.pieData = {
          taskScoreWorth: taskCooperationUpWorth, //任务
          thoughtScoreWorth: thoughtUpWorth, //说说
          documentScoreWorth: documentUpWorth, //文档
          communicationScoreWorth: communicationUpWorth, //协同
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
  .week {
    font-size: 14px;
    color: $--color-text-secondary;
    line-height: 18px;
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
    h3 {
      margin: 15px 0;
    }
    .grid-content {
      display: flex;
      width: 100%;
      .chart {
        flex: 1;
      }
      .data-text-box {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        padding: 0 22px;
        background: $--background-color;
        border-radius: 10px;
        p {
          margin: 5px 0;
          font-size: 14px;
        }
        span {
          font-size: 20px;
        }
      }
    }
    .suggest-box {
      p {
        margin: 10px 0;
        font-size: 14px;
        color: $--color-text-secondary;
        .el-tag {
          font-size: 14px;
          height: 24px;
          line-height: 24px;
          padding: 0 6px;
          border: 0;
          border-radius: $--small-border-radius;
        }
      }
    }
  }
}
</style>
