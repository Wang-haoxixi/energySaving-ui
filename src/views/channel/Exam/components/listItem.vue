<template>
  <div class="item">
    <div class="header">
      <div class="title">
        <span class="red" v-if="data.chargeStatus === '2' || data.chargeStatus === '3'">收费</span>
        <span
          class="plain"
          v-if="data.tag && data.tag.length"
          :style="data.hasBell ? '': 'max-width: 270px'"
        >{{ data.examName }}</span>
        <span
          class="plain"
          v-else
          :style="data.hasBell ? '': 'max-width: 300px'"
          :title="data.examName"
        >{{ data.examName }}</span>
        <span class="bell" v-if="data.hasBell">
          <i class="iconfont el-icon-woneng-caiwu1"></i>
          {{ data.bell }}
        </span>
      </div>
      <div v-if="!isSO" class="tag-wrap">{{data.orgName}}</div>
    </div>
    <div class="contents">
      <span class="icon-warp">
        <i class="iconfont el-icon-woneng-touxiang"></i>
      </span>
      <span class="num">{{ data.testNumber }}人参与</span>
      <span class="time">{{data.beginTime ? data.beginTime + " ~ " + data.endTime : "长期有效"}}</span>
      <span class="middle" v-if="data.awardNumber">
        <i class="iconfont el-icon-woneng-caiwu1"></i>
        {{data.awardNumber}}贝
      </span>
    </div>
    <div class="footer">
      <div class="left-middle">
        <div class="left">
          <span v-if="+data.beginStatus === 1">
            <i class="el-icon-woneng-gengduo1-sx green"></i>
          </span>
          <span v-else-if="+data.beginStatus === 6">
            <i class="el-icon-woneng-jianhao1shixin black"></i>
          </span>
          <span v-else-if="+data.beginStatus === 3">
            <i class="el-icon-woneng-jianhao1shixin black"></i>
          </span>
          <span>{{ dictsMap.beginStatus[data.beginStatus] }}</span>
        </div>
        <el-button
          type="text"
          v-if="+data.participate === 2 && +data.beginStatus === 1"
          class="join"
        >
          <i class="el-icon-woneng-file-survey"></i>已参与
        </el-button>
      </div>
      <div class="right">
        <el-button
          type="primary"
          plain
          v-if="+data.beginStatus === 1"
          class="btn"
          @click="handerFuc(data)"
        >立即参与</el-button>
        <el-button
          type="primary"
          v-if="+data.beginStatus == 3"
          class="btn"
          @click="handerFuc(data)"
        >已参与</el-button>
      </div>
    </div>
    <ExerciseViewDialog ref="ExerciseViewDialog"></ExerciseViewDialog>
    <ExamViewDialog ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>

<script>
import { dictsMap } from "../const/option";
import ExerciseViewDialog from "@/views/exam/examList/Page/Components/ExerciseViewDialog";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog";
export default {
  name: "listItem",
  components: {
    ExerciseViewDialog,
    ExamViewDialog,
  },
  data() {
    return {
      dictsMap,
      DialogName: "",
    };
  },
  methods: {
    handerFuc(row) {
      if (this.type === "1") {
        this.DialogName = "ExamViewDialog";
      } else {
        this.DialogName = "ExerciseViewDialog";
      }
      if (row.beginStatus === 3) {
        this.$refs[this.DialogName].manageId = row.manageId;
      }
      this.$refs[this.DialogName].id = row.id;
      this.$refs[this.DialogName].beginStatus = row.beginStatus;
      this.$refs[this.DialogName].dialogShow = true;
    },
    open({ id, name }) {
      this.$emit("open", { id, name });
    },
  },
  props: {
    isSO: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "1",
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
