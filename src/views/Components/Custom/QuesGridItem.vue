<template>
  <div class="list-box">
    <div class="top iep-ellipsis">
      <span>{{value.name}}</span>
      <span class="red" v-if="value.top === 2">置顶</span>
    </div>
    <iep-tag-read class="tags iep-ellipsis" v-if="value.tag" :value="value.tag"></iep-tag-read>
    <div class="contents">
      <span class="icon-warp">
        <i class="iconfont el-icon-woneng-touxiang"></i>
      </span>
      <span class="num">{{ value.joinPeople }}人参与</span>
      <span
        class="time"
        v-if="value.timeSetting===2"
      >起止日：{{ value.startTime | parseToDay}}—{{ getEndTime(value) }}</span>
      <span class="time" v-else>长期有效</span>
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
      <el-button v-if="value.participate==='1'" type="primary" @click="goTo(value.id)">立即参与</el-button>
      <el-button v-else type="primary" plain @click="showAnalysis(value)">分析报告</el-button>
    </div>
    <dialogAnalysis ref="dialogAnalysis"></dialogAnalysis>
  </div>
</template>
<script>
import { dictsMap } from "@/views/channel/questionnaire/const/option";
import dialogAnalysis from "@/views/qms/questionnaire/manage/dialog/analysis/dialog";
export default {
  name: "IepQuesGridItem",
  props: {
    value: {
      type: Object,
      require: true,
    },
  },
  components: {
    dialogAnalysis,
  },
  data() {
    return {
      dictsMap,
    };
  },
  methods: {
    getEndTime(item) {
      const {
        parseToDay,
        parseToMonthDay,
        parseToYear,
      } = this.$options.filters;
      const endTime =
        parseToYear(item.endTime) === parseToYear(item.startTime)
          ? parseToMonthDay(item.endTime)
          : parseToDay(item.endTime);
      return endTime;
    },
    goTo(id) {
      this.$openPage(`/questionnaire_edit/${id}`, 2);
    },
    showAnalysis({ id, name }) {
      this.$refs.dialogAnalysis.open({ id, name });
    },
  },
};
</script>
<style lang="scss" scoped>
.list-box {
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  font-size: 14px;
  color: $--color-text-regular;
  padding: 18px 15px;
  .top {
    font-size: 16px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    .red {
      padding: 3px;
      background-color: $--custom-menu-background-color;
      color: $--color-primary;
      font-size: 12px;
      border-radius: 4px;
      margin-left: 5px;
      text-align: center;
    }
  }
  .tags {
    color: $--color-text-secondary;
    margin-top: 8px;
  }
  .contents {
    color: $--color-text-secondary;
    margin-top: 8px;
    .icon-warp {
      margin-right: 5px;
    }
    .num {
      margin-right: 15px;
    }
  }
  .bottom {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .status {
    display: flex;
    align-items: center;
    span {
      margin-right: 6px;
      font-size: 14px;
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
}
</style>