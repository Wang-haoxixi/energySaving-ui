<template>
  <div class="graph-page">
    <div class="top-container">
      <div class="wrap" data-text="新增统计">
        <div class="data-item">
          <div class="value">
            <span class="num">{{昨日新增用户}}</span>人
          </div>
          <div class="label">昨日新增用户</div>
        </div>
        <div class="data-item">
          <div class="value">
            <span class="num">{{Seven日新增用户}}</span>人
          </div>
          <div class="label">7日新增用户</div>
        </div>
        <div class="data-item">
          <div class="value">
            <span class="num">{{Thirty日新增用户}}</span>人
          </div>
          <div class="label">30日新增用户</div>
        </div>
        <div class="data-item">
          <div class="value">
            <span class="num">{{平台总用户}}</span>人
          </div>
          <div class="label">平台总用户</div>
        </div>
      </div>
      <div class="wrap" data-text="活跃流存统计">
        <div class="data-item">
          <div class="value">
            <span class="num">{{昨日活跃用户}}</span>人
          </div>
          <div class="label">
            昨日活跃用户
            <IepTip content="昨日操作次数1次以上的总人数"></IepTip>
          </div>
        </div>
        <div class="data-item">
          <div class="value">
            <span class="num">{{上周活跃用户}}</span>人
          </div>
          <div class="label">
            上周活跃用户
            <IepTip content="周操作次数1次以上的总人数"></IepTip>
          </div>
        </div>
        <div class="data-item">
          <div class="value">
            <span class="num">{{上月活跃用户}}</span>人
          </div>
          <div class="label">
            上月活跃用户
            <IepTip content="月操作次数1次以上的总人数"></IepTip>
          </div>
        </div>
        <div class="data-item">
          <div class="value">
            注册
            <span class="num">{{月用户注册}}</span>人
            存留
            <span class="num">{{月用户存留}}</span>人
          </div>
          <div class="label">月用户留存率</div>
        </div>
      </div>
    </div>
    <div class="main-title">分布统计</div>
    <div class="main-container">
      <div class="wrap">
        <SourceGraph></SourceGraph>
      </div>
      <div class="wrap">
        <DurationGraph></DurationGraph>
      </div>
      <div class="wrap">
        <AgeGraph></AgeGraph>
      </div>
      <div class="wrap">
        <SexGraph></SexGraph>
      </div>
      <div class="wrap">
        <RegionGraph></RegionGraph>
      </div>
      <div class="wrap">
        <InterestGraph></InterestGraph>
      </div>
    </div>
  </div>
</template>
<script>
import SourceGraph from "./SourceGraph";
import DurationGraph from "./DurationGraph";
import AgeGraph from "./AgeGraph";
import SexGraph from "./SexGraph";
import RegionGraph from "./RegionGraph";
import InterestGraph from "./InterestGraph";
import {
  getStatisticsUserAdd,
  getStatisticsRetention,
} from "@/api/admin/statistics";
export default {
  components: {
    SourceGraph,
    DurationGraph,
    AgeGraph,
    SexGraph,
    RegionGraph,
    InterestGraph,
  },
  data() {
    return {
      昨日新增用户: 0,
      Seven日新增用户: 0,
      Thirty日新增用户: 0,
      平台总用户: 0,
      昨日活跃用户: 0,
      上周活跃用户: 0,
      上月活跃用户: 0,
      月用户注册: 0,
      月用户存留: 0,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadAddData();
      this.loadRetentionData();
    },
    async loadRetentionData() {
      const { data } = await getStatisticsRetention();
      this.昨日活跃用户 = data.yesterday;
      this.上周活跃用户 = data.lastWeek;
      this.上月活跃用户 = data.lastMonth;
      this.月用户注册 = data.count;
      this.月用户存留 = data.retained;
    },
    async loadAddData() {
      const { data } = await getStatisticsUserAdd();
      // 昨日: 0
      // 7天: 2
      // 30天: 9
      // 平台累计用户: 2036
      this.昨日新增用户 = data["昨日"];
      this.Seven日新增用户 = data["7天"];
      this.Thirty日新增用户 = data["30天"];
      this.平台总用户 = data["平台累计用户"];
    },
  },
};
</script>
<style lang="scss" scoped>
.graph-page {
  margin-top: 15px;
}
.top-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 230px;
  gap: 20px;
  .wrap {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    display: grid;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    position: relative;
    padding: 20px;
    &::after {
      content: attr(data-text);
      padding: 0 10px;
      position: absolute;
      top: -13px;
      left: 20px;
      font-family: Microsoft YaHei;
      background-color: #fff;
      color: #303031;
    }
    .data-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      color: $--color-text-regular;
      .value {
        .num {
          font-size: 22px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
      }
    }
  }
}
.main-title {
  margin: 20px 10px;
}
.main-container {
  display: grid;
  grid-template-columns: minmax(200px, 845px) minmax(200px, 845px);
  grid-template-rows: 370px 370px 370px;
  gap: 20px;
  .wrap {
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    padding: 20px;
  }
}
</style>
