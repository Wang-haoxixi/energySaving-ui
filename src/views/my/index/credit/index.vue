<template>
  <iep-basic-container class="router-box">
    <iep-page-header :title="$route.name" :backOption="backOption">
      <template slot="left">
        <iep-tip
          content="信用值是节能宝平台依据用户在平台中的各项行为数据，运用云计算和机器学习等技术，对各维度数据进行综合处理和评估，在用户身份特质、人脉关系、履约行为、行为偏好和历史信用五个维度客观呈现用户信用状况的综合分值。致力于解决用户与用户，用户与组织之间的信任问题，构建互惠互信的节能宝世界。"
        ></iep-tip>
      </template>
    </iep-page-header>
    <div class="wrap">
      <div class="value-wrap">
        <div class="dashboard">
          <Dashboard class="dashboard-wrap" :gauge_value="userCredit"></Dashboard>
          <div class="detail-wrap">
            <div>评估时间：{{updateDate}}</div>
            <!-- <div>
              总排名
              <strong>9</strong>
            </div>-->
            <div>
              信用值等级说明
              <iep-tip
                content="节能宝新用户初始信用分为380分，之后随着自身行为而变化。用户信用分为五个层级：<br>
                750-1000  信用极好；<br>
                700-750  信用优秀；<br>
                650-700  信用良好；<br>
                600-650  信用中等；<br>
                380-600  信用一般<br>
                （每周一晚12点左右更新）"
              ></iep-tip>
            </div>
          </div>
        </div>
        <div class="description">
          <h3>涨粉策略</h3>
          <p>个人信用包含身份特质、人脉关系、履约能力、行为偏好和历史信用五大评估维度。</p>
          <h3>身份特质</h3>
          <p>丰富、真实的工作及学习履历等信息能更好地展现您的身份特质。</p>
          <div class="go-through">
            <div>
              工作经历：
              <span v-if="work" class="perfect" @click="$openPage('/my/account/base')">去完善</span>
              <span v-else>已完善</span>
            </div>
            <div>
              教育经历：
              <span v-if="education" class="perfect" @click="$openPage('/my/account/base')">去完善</span>
              <span v-else>已完善</span>
            </div>
          </div>
          <h3>人脉关系</h3>
          <p>丰富和稳定的人脉关系有助于您的信用值评估。</p>
          <h3>履约能力</h3>
          <p>主要包括支付能力和生产能力两方面的内容。</p>
          <h3>行为偏好</h3>
          <p>魔方交易，发布活动，协作任务等体现出的行为偏好。</p>
        </div>
      </div>
      <div class="chart-wrap">
        <Trend :xdata="xdata" :ydata="ydata"></Trend>
      </div>
    </div>
  </iep-basic-container>
</template>
<script>
import { getCreditByUserId } from "@/api/dms/assets_analyse";
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
      userCredit: 0,
      education: false,
      work: false,
      xdata: [],
      ydata: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      // education: true
      // updateDate: "2020-09-06"
      // userCredit: 479
      // work: true
      // xdata: (7) [36, 35, 34, 33, 32, 31, 30]
      // ydata: (7) [479, 499, 499, 492, 0, 0, 0]
      const { data } = await getCreditByUserId(this.userInfo.userId);
      this.updateDate = data.updateDate;
      this.userCredit = data.userCredit;
      this.education = data.education;
      this.work = data.work;
      this.xdata = data.xdata;
      this.ydata = data.ydata;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../router-box";

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
