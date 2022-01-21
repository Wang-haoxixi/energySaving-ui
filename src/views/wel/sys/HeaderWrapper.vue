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
        <div>
          日环比
          <span class="square">
            <i :class="[item.color,item.icon]"></i>
            {{item.grade}} %
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _color, _icon } from "./options";
import { getDayCount } from "@/api/dms/comprehensive";
export default {
  computed: {
    itemList() {
      return [
        {
          user: "今日新增用户",
          num: this.summary.userCount,
          grade: this.summary.userPercent,
          unit: "人",
          color: _color(this.summary.userPercent),
          icon: _icon(this.summary.userPercent),
        },
        {
          user: "今日新增组织",
          num: this.summary.soCount,
          grade: this.summary.soPercent,
          unit: "个",
          color: _color(this.summary.soPercent),
          icon: _icon(this.summary.soPercent),
        },
        {
          user: "今日新增说说",
          num: this.summary.thoughtCount,
          grade: this.summary.thoughtPercent,
          unit: "条",
          color: _color(this.summary.thoughtPercent),
          icon: _icon(this.summary.thoughtPercent),
        },
        {
          user: "今日新成交订单",
          num: this.summary.orderCount,
          grade: this.summary.orderPercent,
          unit: "笔",
          color: _color(this.summary.orderPercent),
          icon: _icon(this.summary.orderPercent),
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6px -10px 0;
    & > div {
      position: relative;
      width: 25%;
      margin: 0 10px;
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
