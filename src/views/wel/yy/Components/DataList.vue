<template>
  <div class="data-wrap">
    <div class="data-top">
      <div class="data-box">
        <span>{{value.user}}</span>
        <span>用户数</span>
      </div>
      <div class="data-box">
        <span>{{value.quesPartNum}}</span>
        <span>问卷参与人数</span>
      </div>
      <div class="data-box">
        <span>{{value.activityPersonNum}}</span>
        <span>活动报名人数</span>
      </div>
    </div>
    <div class="wrapper-grid">
      <div class="grid-item" v-for="item of dataList" :key="item.value">
        <div>
          <span class="item-marker" :style="{backgroundColor:item.color}"></span>
          <span>{{item.label}}</span>
        </div>
        <span :title="value[item.value]+item.unit">
          <span class="item-amount">{{value[item.value]|showBigNumber|arrJoin}}</span>
          {{item.unit}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { dataList } from "../options";
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataList,
    };
  },
};
</script>
<style lang="scss" scoped>
.data-wrap {
  width: 100%;
  .data-top {
    display: flex;
    background: $--background-color;
    border-radius: $--border-radius-base;
    justify-content: space-around;
    padding: 15px 0;
    margin-bottom: 20px;
    .data-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      span:nth-child(1) {
        font-size: 16px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      span:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
.wrapper-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 20px 0;
  .grid-item {
    & > div {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $--color-text-regular;
      margin-bottom: 8px;
    }
    & > span {
      font-size: 14px;
    }
    .item-marker {
      display: block;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      margin-right: 5px;
    }
    // .item-label{

    // }
    .item-amount {
      font-size: 16px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
  }
}
</style>