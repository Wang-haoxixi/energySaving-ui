<template>
  <iep-basic-container class="router-box">
    <iep-page-header :title="pageName" :backOption="backOption">
      <template slot="left">
        <iep-tip
          content="组织信用是节能保平台依据组织在平台中的各项行为数据，运用云计算和机器学习等技术，对各维度数据进行综合处理和评估，在基本信息、组织人力、履约能力、组织运营能力和历史信用五个维度客观呈现组织信用状况的综合分值。致力于解决用户与组织，组织与组织之间的信任问题，构建互惠互信的节能保世界。"
        ></iep-tip>
      </template>
    </iep-page-header>
    <div class="wrap">
      <div class="value-wrap">
        <div class="dashboard">
          <Dashboard class="dashboard-wrap" :gauge_value="soCredit"></Dashboard>
          <div class="detail-wrap">
            <div>评估时间：{{updateDate}}</div>
            <!-- <div>
              总排名
              <strong>9</strong>
            </div>-->
            <div>
              信用值等级说明
              <iep-tip
                content="节能保新组织初始信用值为500分，之后随着组织的行为而变化。组织信用主要分为五个层级：<br>
                信用极好：1701-2000分；<br>
                信用优秀：1401-1700分；<br>
                信用良好：1101-1400分；<br>
                信用中等：801-1100分；<br>
                信用一般：500-800分。<br>
                （每周一晚12点左右更新）"
              ></iep-tip>
            </div>
          </div>
        </div>
        <div class="description">
          <h3>涨粉策略</h3>
          <p>组织信用包含基本信息、组织人力、履约能力、运营能力和历史信用五大评估维度。</p>
          <h3>基本信息</h3>
          <p>丰富明确定位的名称、标签等信息能帮助证明组织实力和身份，是信用分评估的因素之一。</p>
          <div class="go-through">
            <div>
              完善信息：
              <span class="perfect" @click="$openPage('/so/info')">去完善</span>
              <!-- <span v-else>已完善</span> -->
            </div>
          </div>
          <h3>组织人力</h3>
          <p>丰富和优秀的人力结构有助于组织的信用值评估。</p>
          <div class="go-through">
            <div v-if="!isExemption">
              免审加入：
              <span class="perfect" @click="$openPage('/so/workplace')">去开启</span>
            </div>
            <div>
              邀请用户：
              <span class="perfect" @click="$openPage('/wel/index')">去邀请</span>
            </div>
          </div>
          <h3>履约能力</h3>
          <p>主要包括支付能力和生产能力两方面的内容。</p>
          <h3>运营能力</h3>
          <p>材料、任务、问卷、考试、活动、产品等基于组织运营产生的行为特点。</p>
        </div>
      </div>
      <div class="chart-wrap">
        <Trend :xdata="xdata" :ydata="ydata"></Trend>
      </div>
    </div>
  </iep-basic-container>
</template>
<script>
import { getCreditBySoId } from "@/api/dms/assets_analyse";
import Dashboard from "./Dashboard";
import Trend from "./Trend";
import { mapGetters } from "vuex";
export default {
  components: {
    Dashboard,
    Trend,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      updateDate: "",
      soCredit: 0,
      isExemption: false,
      xdata: [],
      ydata: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    pageName() {
      const nameArr = this.$route.name.split("-");
      return nameArr[1];
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      // education: true
      // updateDate: "2020-09-06"
      // soCredit: 479
      // work: true
      // xdata: (7) [36, 35, 34, 33, 32, 31, 30]
      // ydata: (7) [479, 499, 499, 492, 0, 0, 0]
      const { data } = await getCreditBySoId(this.userInfo.orgId);
      this.updateDate = data.updateDate;
      this.soCredit = data.soCredit;
      this.isExemption = data.isExemption;
      this.xdata = data.xdata;
      this.ydata = data.ydata;
    },
  },
};
</script>
<style lang="scss" scoped>
.value-wrap {
  display: flex;
  .dashboard {
    flex: 0 0 360px;

    .detail-wrap {
      border: 1px solid $--border-color;
      border-radius: $--border-radius-base;
      padding: 20px;
      font-size: 14px;
      > div {
        margin-bottom: 16px;
        color: $--color-text-regular;
        span {
          color: $--color-text-secondary;
        }
        &:last-child {
          margin-bottom: 0;
        }
        strong {
          font-size: 18px;
          font-weight: 400;
          color: $--color-primary;
        }
      }
    }
  }
  .description {
    flex: 1;
    margin-left: 20px;
    padding: 20px;
    background-color: $--background-color;
    border-radius: $--border-radius-base;
    h2 {
      font-size: 16px;
      color: $--color-text-primary;
    }
    h3 {
      margin-bottom: 0;
      font-size: 14px;
      margin-top: 8px;
    }
    p {
      margin-bottom: 0;
      font-size: 14px;
      margin-top: 8px;
      color: $--color-text-secondary;
    }
  }
}
.go-through {
  display: flex;
  align-items: center;
  > div {
    margin-right: 40px;
    font-size: 14px;
    color: $--color-text-secondary;
    &:last-child {
      margin-right: 0;
    }
    .perfect {
      color: $--color-secondary;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
.chart-wrap {
  margin-top: 50px;
}
</style>
