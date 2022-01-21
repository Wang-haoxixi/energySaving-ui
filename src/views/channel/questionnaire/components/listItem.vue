<template>
  <div class="item">
    <div class="header">
      <div class="title">
        <span class="red" v-if="data.top === 2">置顶</span>
        <span
          class="plain"
          v-if="data.tag && data.tag.length"
          @click="handleClickName(data)"
          :style="data.hasBell ? '': 'max-width: 270px'"
        >{{ data.name }}</span>
        <span
          class="plain"
          v-else
          @click="handleClickName(data)"
          :style="data.hasBell ? '': 'max-width: 300px'"
          :title="data.name"
        >{{ data.name }}</span>
        <span class="bell" v-if="data.hasBell">
          <i class="iconfont el-icon-woneng-caiwu1"></i>
          {{ data.bell }}
        </span>
      </div>
      <div class="tag-wrap">
        <el-tag
          :title="v"
          class="tag iep-ellipsis"
          type="info"
          size="mini"
          v-for="(v, i) in data.tag"
          :key="i"
          :style="i > 2 ? 'display: none' : ''"
        >{{ v }}</el-tag>
      </div>
    </div>
    <div class="contents">
      <span class="icon-warp">
        <i class="iconfont el-icon-woneng-touxiang"></i>
      </span>
      <span class="num">{{ data.joinPeople }}人参与</span>
      <span
        class="time"
        v-if="data.timeSetting===2"
      >起止日：{{ data.startTime | parseToTimeMinutes}}—{{ getEndTime }}</span>
      <span class="time" v-else>长期有效</span>
      <span class="middle" v-if="data.awardNumber">
        <i class="iconfont el-icon-woneng-caiwu1"></i>
        {{data.awardNumber}}贝
      </span>
    </div>
    <div class="footer">
      <div class="left-middle">
        <div class="left">
          <span v-if="+data.status === 1">
            <i class="el-icon-woneng-gengduo1-sx green"></i>
          </span>
          <span v-else-if="+data.status === 6">
            <i class="el-icon-woneng-jianhao1shixin black"></i>
          </span>
          <span v-else-if="+data.status === 3">
            <i class="el-icon-woneng-jianhao1shixin black"></i>
          </span>
          <span>{{ dictsMap.status[data.status] }}</span>
        </div>
        <el-button type="text" v-if="+data.participate === 2 && +data.status === 1" class="join">
          <i class="el-icon-woneng-file-survey"></i>已参与
        </el-button>
      </div>
      <div class="right">
        <iep-button
          type="primary"
          v-if="+data.participate === 1 && +data.status === 1"
          class="btn"
          @click="handerFuc(data.id)"
        >立即参与</iep-button>
        <iep-button
          type="primary"
          v-if="+data.participate === 2"
          class="btn"
          @click="open(data)"
        >分析报告</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import { dictsMap } from "../const/option";
export default {
  name: "listItem",
  data() {
    return {
      dictsMap,
    };
  },
  methods: {
    handerFuc(id) {
      this.$openPage(`/questionnaire_edit/${id}`, 2);
    },
    open({ id, name }) {
      this.$emit("open", { id, name });
    },
    handleClickName(data) {
      if (+data.participate === 1 && +data.status === 1) {
        this.handerFuc(data.id);
      } else if (+data.participate === 2) {
        this.open(data);
      }
    },
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getEndTime() {
      const {
        parseToTimeMinutes,
        parseToYear,
        parseDate,
      } = this.$options.filters;
      const endTime =
        parseToYear(this.data.endTime) === parseToYear(this.data.startTime)
          ? parseDate(this.data.endTime, "MM-DD HH:mm")
          : parseToTimeMinutes(this.data.endTime);
      return endTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
  height: 160px;
  background: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    height: 28px;
    font-size: 16px;
    color: #303031;
    .title {
      display: flex;
      align-items: center;
      max-width: 300px;
      .plain {
        max-width: 215px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .bell {
        border: 1px solid $--border-color;
        border-radius: 2px;
        padding: 2px 5px;
        margin-left: 8px;
        font-size: 12px;
        color: #e45b61;
        line-height: 1;
        .iconfont {
          font-size: 12px;
          color: #e45b61;
        }
      }
      .red {
        padding: 0;
        width: 36px;
        min-width: 36px;
        height: 20px;
        background-color: $--custom-menu-background-color;
        color: $--color-primary;
        font-size: 12px;
        line-height: 20px;
        border-radius: 4px;
        margin-right: 7px;
        text-align: center;
      }
    }
    .tag-wrap {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin-left: 30px;
      font-size: 12px;
      color: #737373;
      .tag {
        margin-bottom: 5px;
        margin-left: 5px;
        max-width: 60px;
        line-height: 20px;
      }
    }
  }
  .contents {
    color: $--color-text-secondary;
    font-size: 12px;
    .icon-warp {
      margin-right: 5px;
      .iconfont {
        font-size: 14px;
      }
    }
    .num {
      margin-right: 18px;
    }
    .time {
      margin-right: 9px;
    }
  }
  .contents {
    > span {
      display: inline-block;
      height: 14px;
      line-height: 14px;
      vertical-align: middle;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    font-size: 14px;
    .left-middle {
      display: flex;
      justify-content: flex-start;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-right: 6px;
        i {
          display: block;
          font-size: 18px;
        }
        .blue {
          color: $--color-secondary;
        }
        .green {
          color: $--color-third;
        }
        .red {
          color: $--color-primary;
        }
        .black {
          color: #666769;
        }
      }
    }
    .right {
      min-width: 160px;
      display: flex;
      justify-content: flex-end;
      .btn {
        margin-left: 10px;
        padding: 0;
        font-size: 14px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        // color: $--color-primary;
        border-color: $--color-primary;
        &:hover {
          background-color: $--color-primary;
          color: #ffffff;
        }
      }
    }
  }
}
.middle {
  margin-left: 10px;
  color: $--color-primary;
}
.join {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  color: $--color-text-secondary;
  cursor: default;
  i {
    margin-right: 5px;
    font-size: 16px;
  }
}
</style>
