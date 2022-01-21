<template>
  <div class="header-wrapper" v-loading="loading">
    <div class="title">
      <span>实时概览</span>
      <span>截至{{new Date() | parseToTimeSeconds}}</span>
      <i class="el-icon-refresh-right" @click="load()"></i>
    </div>
    <div class="con">
      <div v-for="(item,index) in itemList" :key="index">
        <div class="info">{{item.user}}</div>
        <div>
          <span class="num">{{item.num}}</span>
          {{item.unit}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDayCount } from "@/api/dms/comprehensive";
export default {
  computed: {
    itemList() {
      return [
        {
          user: "用户",
          num: this.summary.userCount,
          unit: "人",
        },
        {
          user: "组织",
          num: this.summary.soCount,
          unit: "个",
        },
        {
          user: "订单",
          num: this.summary.orderCount,
          unit: "笔",
        },
        {
          user: "订单额",
          num: this.summary.orderPriceCount,
          unit: "宝贝",
        },
      ];
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      const { data } = await getDayCount();
      this.summary = data;
      this.loading = false;
    },
  },
  data() {
    return {
      loading: false,
      summary: {
        orderCount: 0,
        orderPercent: "-100.00",
        soCount: 0,
        soPercent: "-100.00",
        thoughtCount: 4,
        thoughtPercent: "300.00",
        userCount: 2,
        userPercent: "100.00",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  padding: 20px;
  .title {
    margin-bottom: 20px;
    span:nth-child(1) {
      margin-right: 15px;
      font-size: 16px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    span:nth-child(2) {
      margin-right: 6px;
      font-size: 14px;
      color: $--color-text-secondary;
    }
    i {
      font-size: 20px;
      color: $--color-text-secondary;
      vertical-align: -2px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .con {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 40px 20px;
    & > div {
      position: relative;
      // margin: 0 10px;
      padding: 20px 15px;
      line-height: 32px;
      font-size: 14px;
      border-radius: $--border-radius-base;
      border: 1px dashed $--border-color;
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
      .blue {
        color: #2fcf75;
      }
      .red {
        color: #ff3200;
      }
    }
    .info {
      position: absolute;
      top: -16px;
      padding: 0 10px;
      font-family: "微软雅黑";
      background-color: #fff;
      color: $--color-text-primary;
    }
  }
}
</style>
