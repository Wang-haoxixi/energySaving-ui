<template>
  <div class="calendar-box">
    <el-calendar :range="rangeTime" v-loading="loading">
      <template slot="dateCell" slot-scope="{date, data}" v-if="!loading">
        <div class="el-calendar-day">
          <span
            :class="{'is-exist': isTaskExist(date)}"
            @click="handleShowList($event, data)"
          >{{dayFormat(date)}}</span>
        </div>
      </template>
    </el-calendar>
    <div class="around">
      <el-button
        class="left-btn"
        type="text"
        icon="el-icon-woneng-arrowleft"
        @click="dateChange('before')"
      ></el-button>
      <el-button
        class="right-btn"
        type="text"
        icon="el-icon-woneng-arrowright"
        @click="dateChange('after')"
      ></el-button>
    </div>
    <div class="detail">
      <div class="detail-item" v-for="item in itemList" :key="item.id">
        <i :class="[item.icon,item.color]"></i>
        <span class="con">
          {{item.name}}
          <strong>{{numberData[item.num]}}</strong>条
        </span>
      </div>
    </div>
    <!-- 任务列表弹框 -->
    <popoverTpl
      ref="task_popover"
      :top="popoverStyle.top"
      :left="popoverStyle.left"
      v-if="popoverModel"
    >
      <div class="dialog calendar-dialog">
        <div class="head">
          <div class="date">{{getDayDetail(popoverData.day)}}</div>
          <i class="el-icon-close" @click="()=>{popoverModel = false}"></i>
        </div>
        <div class="list">
          <div
            class="task-item"
            :class="`item${item.level}`"
            v-for="(item, index) in getTask(popoverData)"
            :key="index"
          >
            <!-- 进度 - 可点击完成任务 -->
            <div class="progress" @click.stop="handleFinish(item)">
              <el-progress
                type="circle"
                :width="15"
                :percentage="item.plan"
                :stroke-width="1"
                status="success"
                v-if="item.state === '2'"
              ></el-progress>
              <el-progress
                type="circle"
                :width="15"
                :percentage="item.plan"
                :stroke-width="1"
                :show-text="false"
                v-else
              ></el-progress>
            </div>
            <!-- 任务名称 -->
            <div
              class="content"
              :class="{'finish': item.taskState !== '0'}"
              @click.stop="handleDetail(item)"
            >{{item.title}}</div>
          </div>
        </div>
      </div>
    </popoverTpl>
    <!-- 奖励分配 -->
    <DistributeDialog ref="distribute"></DistributeDialog>
    <!-- 修改详情 -->
    <DetailDialog ref="detail" @load_data="loadData()"></DetailDialog>
  </div>
</template>
      
<script>
import { dateFormat } from "@/util/date";
import { getSelectWeekTask } from "@/api/qms/cooperation_list";
import popoverTpl from "@/views/my/index/task/calendar/popover.vue";
import { parseDate } from "@/filters/index.ts";
import { countWeek } from "@/util/date";
import { mapGetters } from "vuex";
import finishMixin from "@/views/task/components/finish/mixin.js";
import DistributeDialog from "@/views/task/components/finish/distribute";
import DetailDialog from "@/views/my/index/task/form/detail";

export default {
  mixins: [finishMixin],
  components: { popoverTpl, DistributeDialog, DetailDialog },
  data() {
    return {
      itemList: [
        {
          icon: "el-icon-woneng-gengduoshixin",
          color: "green",
          name: "进行中",
          num: "forNumber",
        },
        {
          icon: "el-icon-woneng-chenggong2shixin",
          color: "blue",
          name: "已完成",
          num: "completeNumber",
        },
        {
          icon: "el-icon-woneng-guanbihuozheshibaishixin",
          color: "gray",
          name: "已关闭",
          num: "closeNumber",
        },
      ],
      rangeTime: [],
      loading: true,
      numberData: {}, // 统计数据
      taskList: {},
      popoverModel: false,
      popoverStyle: {
        left: 0,
        top: 0,
      },
      popoverData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 根据传入的时间，获取到这个星期的起始时间和结束时间 MM-DD
    getWeekStartAndEnd(day = new Date()) {
      const timeFormat = "yyyy-MM-dd 00:00:00";
      const date = new Date(day);
      const today = date.getDay();
      const firstDay = +new Date(+date - (today - 1) * 24 * 3600 * 1000);
      const lastDay = firstDay + 6 * 24 * 3600 * 1000;
      return [
        dateFormat(firstDay, timeFormat),
        dateFormat(lastDay, timeFormat),
      ];
    },
    dateChange(type) {
      this.loading = true;
      const date = this.rangeTime[0];
      const dayTime = 24 * 60 * 60 * 1000;
      const number = type === "before" ? -2 * dayTime : 8 * dayTime;
      this.$set(
        this,
        "rangeTime",
        this.getWeekStartAndEnd(+new Date(date) + number),
      );
      this.loadData();
    },
    loadData() {
      this.loading = true;
      this.taskList = [];
      getSelectWeekTask({
        time: this.rangeTime[0],
      }).then(({ data }) => {
        for (const item of data.dayTaskList) {
          this.taskList[item.day] = item.taskList;
        }
        this.numberData = { ...data };
        this.loading = false;
      });
    },
    handleDetail(row) {
      this.$refs.detail.loadData(row);
    },
    dayFormat(date) {
      return new Date(date).getDate();
    },
    // 当前日历是否存在任务
    isTaskExist(date) {
      const day = new Date(date).getDate();
      return !!this.taskList[day];
    },
    // 打开日历单元格的popover
    handleShowList(event, row) {
      this.popoverData = { ...row };
      const list = this.taskList[new Date(row.day).getDate()];
      if (!list) return;
      const screenX = event.screenX;
      this.popoverModel = true;
      this.popoverStyle = {
        left: screenX,
        top: event.screenY - 100,
      };
    },
    getDayDetail(day = new Date()) {
      return countWeek(day) + "，" + parseDate(day, "MM月DD日，yyyy年");
    },
    getTask(row) {
      const list = this.taskList[new Date(row.day).getDate()] || [];
      return list;
    },
    refreshData() {
      this.$emit("load-data");
    },
  },
  created() {
    this.rangeTime = this.getWeekStartAndEnd();
    this.loadData();
  },
};
</script>
      
<style lang="scss" scoped>
.calendar-box {
  position: relative;
  ::v-deep .el-calendar__header {
    padding: 0;
    font-size: 16px;
    text-align: center;
    border: 0;
    .el-calendar__title {
      position: relative;
      width: 100%;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
  }
  ::v-deep .el-calendar-table thead th {
    font-size: 14px;
    text-align: left;
    color: #666769;
    &:last-child {
      width: 16px !important;
    }
  }
  ::v-deep .el-calendar-table .el-calendar-day {
    padding: 0;
    height: 50px;
    span {
      position: relative;
      display: block;
      margin-left: -8px;
      width: 30px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #666769;
    }
    &:hover {
      background: none;
      span {
        background-color: $--color-secondary;
        color: #fff;
      }
    }
    .is-exist {
      &::after {
        position: absolute;
        content: "";
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #f74437;
        border-radius: 50%;
        top: -1px;
        right: -1px;
      }
    }
  }
  ::v-deep .el-calendar-table .is-today {
    span {
      background-color: #2f80ff;
      color: #fff;
    }
  }
  ::v-deep .el-calendar-table tr td {
    border: 0;
  }
  .around {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .el-button--text {
      padding: 4px 0;
      color: #666769;
      &:hover {
        color: $--color-primary;
      }
    }
  }
  .detail {
    display: flex;
    align-items: center;
    margin: 0 -3px;
    .detail-item {
      display: flex;
      align-items: center;
      margin-right: 45px;
      font-size: 14px;
      color: $--color-text-secondary;
      i {
        margin-right: 5px;
        font-size: 18px;
      }
      &:last-child {
        margin-right: 0;
      }
      strong {
        margin: 0 5px;
        font-size: 18px;
        font-weight: 400;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
    }
  }
  .calendar-dialog {
    .head {
      border-bottom: 1px solid $--border-color;
      padding: 0 0 10px;
      display: flex;
      justify-content: space-between;
      i {
        cursor: pointer;
      }
    }
    .list {
      padding: 10px 0 0;
      .task-item {
        font-size: 12px;
        margin-bottom: 4px;
        display: flex;
        margin-bottom: 25px;
        .progress {
          margin-right: 5px;
        }
        .content {
          width: calc(100% - 20px);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          cursor: pointer;
        }
        .finish {
          text-decoration: line-through;
          color: $--color-text-secondary;
        }
      }
    }
  }
}
.blue {
  color: $--color-secondary;
}
.red {
  color: $--color-primary;
}
.green {
  color: $--color-third;
}
.gray {
  color: $--color-text-regular;
}
</style>