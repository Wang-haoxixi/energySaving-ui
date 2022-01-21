<template>
  <div class="time-line">
    <div class="item" v-if="upLoad">
      <div class="middle up-load">
        <div class="tail"></div>
        <div>
          <el-button class="iep-btn-l btn-secondary" plain @click="getupMore">
            加载更多
            <i class="el-icon-arrow-up"></i>
          </el-button>
          <div class="content"></div>
        </div>
      </div>
    </div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="before" v-if="item.month">{{item.month}}</div>
      <div class="middle">
        <div class="tail"></div>
        <div v-if="item.month">
          <div class="date icon">
            <i></i>
          </div>
          <div class="content"></div>
        </div>
        <div v-else>
          <div class="date" :class="active===index?'active':''">{{item.date}}</div>
          <div class="content">
            <slot name="content" :row="item" :index="index" :today="today == item.createTime"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="button">
        <el-button class="iep-btn-l" type="primary" plain @click="getMore">
          加载更多
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatYear } from "../util";

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
      font-size:14px;
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
      .content {
        position: relative;
        margin-left: 55px;
        top: -33px;
        min-height: 40px;
        // border: 1px solid $--border-color;
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
