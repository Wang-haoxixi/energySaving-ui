<template>
  <div class="list-box">
    <div class="cont">
      <div class="top iep-ellipsis">
        <span class="red" v-if="value.top === 2">置顶</span>
        <span>{{value.name}}</span>
      </div>
      <div class="bottom">
        <span class="status">
          <span v-if="+value.status === 1">
            <i class="el-icon-woneng-gengduo1-sx green"></i>
          </span>
          <span v-else-if="+value.status === 6">
            <i class="el-icon-woneng-jianhao1shixin black"></i>
          </span>
          <span v-else-if="+value.status === 3">
            <i class="el-icon-woneng-jianhao1shixin black"></i>
          </span>
          <span>{{ dictsMap.status[value.status] }}</span>
        </span>
        <div class="contents">
          <span class="icon-warp">
            <i class="iconfont el-icon-woneng-touxiang"></i>
          </span>
          <span class="num">{{ value.joinPeople }}人参与</span>
          <span
            class="time"
            v-if="value.timeSetting===2"
          >起止日：{{ value.startTime | parseToTimeMinutes}}—{{ getEndTime(value) }}</span>
          <span class="time" v-else>长期有效</span>
        </div>
      </div>
    </div>
    <div class="right">
      <iep-tag-read class="tags iep-ellipsis" v-if="value.tag" :value="value.tag"></iep-tag-read>
      <iep-button class="btn" type="primary" @click="goTo(value)">立即参与</iep-button>
    </div>
  </div>
</template>
<script>
import { dictsMap } from "@/views/channel/questionnaire/const/option";

export default {
  name: "IepQuesListItem",
  props: {
    value: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      dictsMap,
    };
  },
  methods: {
    getEndTime(item) {
      const {
        parseToTimeMinutes,
        parseToYear,
        parseDate,
      } = this.$options.filters;
      const endTime =
        parseToYear(item.endTime) === parseToYear(item.startTime)
          ? parseDate(item.endTime, "MM-DD HH:mm")
          : parseToTimeMinutes(item.endTime);
      return endTime;
    },
    goTo({ id }) {
      this.$openPage(`/questionnaire_edit/${id}`, 2);
    },
  },
};
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: $--color-text-regular;

  .cont {
    flex: 1;
  }
  .right {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .tags {
      width: 100%;
      text-align: right;
      font-size: 12px;
      color: $--color-text-secondary;
      margin-bottom: 20px;
    }
  }
  .btn {
    padding: 5px;
    width: 80px;
    height: 28px;
    text-align: center;
    border-radius: $--small-border-radius;
    box-sizing: border-box;
  }
  .top {
    font-family: "微软雅黑";
    color: $--color-text-primary;
    margin-bottom: 10px;
    font-size: 14px;
    .red {
      padding: 3px;
      background-color: $--custom-menu-background-color;
      color: $--color-primary;
      font-size: 12px;
      line-height: 20px;
      border-radius: 4px;
      margin-right: 7px;
      text-align: center;
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    .status {
      display: flex;
      align-items: center;
      margin-right: 18px;
      span {
        margin-right: 6px;
        font-size: 12px;
        color: $--color-text-regular;
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
    .contents {
      color: $--color-text-secondary;
      font-size: 12px;
      .icon-warp {
        margin-right: 5px;
        .iconfont {
          font-size: 14px;
          color: $--color-input-regular;
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
  }
}
</style>