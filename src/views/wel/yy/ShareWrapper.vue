<template>
  <div class="share-wrapper">
    <iep-wrapper title="分享裂变">
      <div class="share-content">
        <div class="share-data">
          <div class="share-item">
            <span>总计分享人数</span>
            <span>
              <span>{{mutiData.totalInviteNum|showBigNumber|arrJoin}}</span>人
            </span>
          </div>
          <em></em>
          <div class="share-item">
            <span>总计分享次数</span>
            <span>
              <span>{{mutiData.totalSharesNum|showBigNumber|arrJoin}}</span>次
            </span>
          </div>
          <em></em>
          <div class="share-item">
            <span>总计邀请新用户</span>
            <span>
              <span>{{mutiData.totalInviteNum|showBigNumber|arrJoin}}</span>人
            </span>
          </div>
          <em></em>
          <div class="share-item">
            <span>人均拉新</span>
            <span>
              <span>{{mutiData.perNewInvite|showBigNumber|arrJoin}}</span>人
            </span>
          </div>
        </div>
        <chart-share :data="chartData"></chart-share>
      </div>
    </iep-wrapper>
  </div>
</template>
<script>
import { getShareMarkData } from "@/api/admin/mark";
import ChartShare from "./Components/ChartShare";
export default {
  components: {
    ChartShare,
  },
  data() {
    return {
      mutiData: {
        perNewInvite: 0, //人均拉新
        totalInviteNum: 0, //总计邀请新用户
        totalManNum: 0, //总计分享人数
        totalSharesNum: 0, //总计分享次数
        xdata: [],
        ydata: [],
      },
    };
  },
  computed: {
    chartData() {
      return {
        xAxis: this.mutiData.xdata,
        yAxis: this.mutiData.ydata,
      };
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getShareMarkData();
      this.mutiData = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.share-wrapper {
  height: 100%;
  .share-content {
    width: 100%;
    height: 100%;
  }
  .share-data {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .share-item {
      color: $--color-text-regular;
      font-size: 14px;
      & > span {
        display: block;
        & > span {
          font-size: 16px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
          margin-right: 5px;
        }
      }
    }
    em {
      display: block;
      width: 1px;
      height: 45px;
      background: $--background-color;
    }
  }
}
</style>
