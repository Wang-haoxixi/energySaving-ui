<template>
  <div class="grid-container">
    <iep-wrapper title="新增统计">
      <div class="con">
        <div>
          <div class="info">昨日新增组织</div>
          <div>
            <span class="num">{{datas.yesterdayNew}}</span>
          </div>
        </div>
        <div>
          <div class="info">7日新增组织</div>
          <div>
            <span class="num">{{datas.weekNew}}</span>
          </div>
        </div>
        <div>
          <div class="info">30日新增组织</div>
          <div>
            <span class="num">{{datas.thirtyDayNew}}</span>
          </div>
        </div>
      </div>
    </iep-wrapper>
    <iep-wrapper title="平台总组织">
      <span class="all">{{datas.count}}</span>
    </iep-wrapper>
    <liveness-wrapper></liveness-wrapper>
    <redness-wrapper></redness-wrapper>
    <location-wrapper></location-wrapper>
    <industry-wrapper></industry-wrapper>
    <member-wrapper></member-wrapper>
    <assets-wrapper></assets-wrapper>
  </div>
</template>
<script>
import LivenessWrapper from "./LivenessWrapper";
import RednessWrapper from "./RednessWrapper";
import LocationWrapper from "./LocationWrapper";
import IndustryWrapper from "./IndustryWrapper";
import MemberWrapper from "./MemberWrapper";
import AssetsWrapper from "./AssetsWrapper";
import { getNewSoData } from "@/api/dms/comprehensive";

export default {
  components: {
    LivenessWrapper,
    RednessWrapper,
    LocationWrapper,
    IndustryWrapper,
    MemberWrapper,
    AssetsWrapper,
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      datas: {},
    };
  },
  methods: {
    async loadData() {
      const { data } = await getNewSoData();
      this.datas = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  overflow: hidden;
  gap: 20px;
  grid-template-columns: minmax(200px, 845px) minmax(200px, 845px);
  grid-template-rows: 160px 380px 400px 400px;
  & > div {
    background: none;
    border: 1px solid $--border-color;
    border-radius: 10px;
  }
}
.con {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  & > div {
    position: relative;
    padding: 20px 15px;
    line-height: 32px;
    font-size: 14px;
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    .num {
      margin-right: 5px;
      font-size: 22px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    i {
      margin: 0 2px;
      font-size: 20px;
      vertical-align: -2px;
    }
  }
  .info {
    position: absolute;
    top: -16px;
    padding: 0 10px;
    background-color: #fff;
    color: $--color-text-regular;
  }
}
.all {
  font-size: 18px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
</style>
