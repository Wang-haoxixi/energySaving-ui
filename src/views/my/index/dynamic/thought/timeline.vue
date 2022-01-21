<template>
  <div class="time-line">
    <div class="item" v-for="(item, index) in list" :key="index">
      <!-- 获取到第一条数据的月份 -->
      <div class="before" v-if="index == 0">{{formatYearMonth(item.createTime)}}</div>
      <!-- 判断与前一条月份是否相同 -->
      <div
        class="before"
        v-else-if="!isMonth(item, list[index-1])"
      >{{formatYearMonth(item.createTime)}}</div>
      <div class="middle">
        <div class="tail"></div>
        <div v-if="item.month">
          <div class="date icon">
            <i></i>
          </div>
          <div class="content"></div>
        </div>
        <div v-else>
          <div
            class="date"
            v-if="index == 0 || !isDay(item, list[index-1])"
          >{{formatDay(item.createTime)}}</div>
          <div class="date-null" v-else></div>
          <div class="thoughts-content">
            <slot name="content" :row="item" :index="index" :today="today == item.createTime"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="item" v-if="list.length">
      <div class="button">
        <el-button class="iep-btn-l btn-secondary" plain @click="getMore">
          加载更多
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </div>
    </div>
    <iep-no-data complex v-else></iep-no-data>
  </div>
</template>

<script>
import { formatYear } from "./util";

export default {
  name: "timeline",
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    upLoad() {
      let state = false;
      if (this.list.length > 1) {
        state = formatYear(this.list[1].createTime) !== formatYear(new Date());
      }
      return state;
    },
  },
  data() {
    return {
      active: -1,
      today: `${formatYear(new Date())} 00:00:00`,
    };
  },
  methods: {
    getMore() {
      this.$emit("getMore", true);
    },
    getupMore() {
      this.$emit("getUpMore", true);
    },
    // 返回日
    formatDay(mill) {
      return `${new Date(mill).getDate()}日`;
    },
    // 返回YYYY年mm月
    formatYearMonth(mill) {
      const y = new Date(mill);
      return `${y.getFullYear()}年${y.getMonth() + 1}月`;
    },
    isMonth(before, after) {
      // 年月都要判断
      if (
        new Date(before.createTime).getFullYear() !=
        new Date(after.createTime).getFullYear()
      ) {
        return false;
      } else {
        return (
          new Date(before.createTime).getMonth() ==
          new Date(after.createTime).getMonth()
        );
      }
    },
    isDay(before, after) {
      if (!after) {
        return true;
      }
      // 年月日都要判断
      if (
        new Date(before.createTime).getFullYear() !=
        new Date(after.createTime).getFullYear()
      ) {
        return false;
      } else if (
        new Date(before.createTime).getMonth() !=
        new Date(after.createTime).getMonth()
      ) {
        return false;
      } else {
        return (
          new Date(before.createTime).getDate() ==
          new Date(after.createTime).getDate()
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.time-line {
  .item {
    position: relative;
    min-height: 50px;
    .before {
      width: 100px;
      padding: 5px 0 0;
      position: absolute;
      top: 0px;
      font-size: 14px;
    }
    .middle {
      margin-left: 100px;
      position: relative;
      .tail {
        position: absolute;
        left: 17px;
        top: 34px;
        height: calc(100% - 33px);
        border-left: 1px solid #e4e7ed;
        :last-of-type {
          border: 0;
        }
      }
      .tail:last-of-type {
        border: 0;
      }
      .date {
        border-radius: 50%;
        border: 1px solid $--border-color;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 12px;
      }
      .date-null {
        margin-left: 17px;
        height: 36px;
        border-left: 1px solid #e4e7ed;
      }
      .icon {
        position: relative;
        // transform: rotate(134deg);
        color: $--color-text-secondary;
        i {
          position: absolute;
          top: 20%;
          left: 45%;
          display: block;
          width: 12px;
          height: 12px;
          border: 2px solid #ddd;
          border-top: 0;
          border-right: 0;
        }
      }
      .active {
        border: 1px solid #f56c6c;
        color: #f56c6c;
        background: #fef0f0;
        border-color: #fbc4c4;
      }
      .thoughts-content {
        border-radius: 8px;
        position: relative;
        margin-left: 55px;
        top: -33px;
        min-height: 40px;
        background-color: #f7f8fa;
        &::before {
          content: "";
          position: absolute;
          left: -16px;
          top: 8px;
          width: 29px;
          height: 18px;
          background: #fafafa url(./sanjiao.jpg) no-repeat;
        }
      }
    }
    .up-load {
      margin-left: 72px;
      .tail {
        left: 45px;
      }
      .content {
        margin-left: 100px;
      }
    }
    .button {
      margin-left: 77px;
    }
  }
}
</style>
