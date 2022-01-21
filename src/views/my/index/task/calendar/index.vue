<template>
  <div class="iep-page-form" id="task_calendar">
    <div class="calendar-head">
      <div class="time">
        <div class="date">{{parseDate(time, "yyyy年MM月")}}</div>
        <div class="range">
          <i class="el-icon-arrow-left" @click="rangeChange(1)"></i>
          <i class="el-icon-arrow-right" @click="rangeChange(2)"></i>
        </div>
      </div>
      <div class="button-list">
        <!-- 搜索 -->
        <el-popover placement="bottom" width="40" trigger="hover" class="calendar_popover">
          <div id="calendar_select">
            <div
              class="select-item"
              v-for="(item, index) in selectList"
              :key="index"
              @click="handleState(item.value)"
            >
              <span>{{item.name}}</span>
              <i class="el-icon-check" v-if="state === item.value"></i>
            </div>
          </div>
          <i class="el-icon-woneng-shuju" slot="reference"></i>
        </el-popover>
        <i class="el-icon-woneng-jiahao1shixin" @click="handleCreate()"></i>
        <i class="el-icon-woneng-guanbihuozheshibai" @click="handleBack()"></i>
      </div>
    </div>
    <!-- 日历 -->
    <el-calendar v-model="time" v-loading="loading" class="calendar">
      <template slot="dateCell" slot-scope="{date, data}" v-if="!loading">
        <!-- 日期框 -->
        <div @click.stop="() => {}" class="calendar-item">
          <div class="head">
            <!-- 时间显示 - 点击快速创建该天任务 -->
            <div
              class="date"
              @click="handleCreate(data.day)"
            >{{ data.day.split('-').slice(1).join('-') }}</div>
            <!-- 该天任务统计 - 点击查看该天任务列表 -->
            <div
              class="number"
              @click="handleShowList($event, data)"
            >{{getTask(data).length > 0 ? `共${getTask(data).length}项` : ''}}</div>
          </div>
          <!-- 日历格中该天任务列表 -->
          <div
            class="task-item"
            :class="`item${item.level}`"
            v-for="(item, index) in getTask(data)"
            :key="index"
          >
            <div class="progress" @click.stop="handleFinishTask(item)">
              <el-progress
                type="circle"
                :width="12"
                :percentage="item.plan"
                :stroke-width="1"
                status="success"
                v-if="item.state === '2'"
              ></el-progress>
              <el-progress
                type="circle"
                :width="12"
                :percentage="item.plan"
                :stroke-width="1"
                :show-text="false"
                status="success"
                v-else
              ></el-progress>
            </div>
            <div
              class="content"
              :title="item.title"
              :class="{'finish': item.taskState !== '0'}"
              @click="handleDetail(item)"
            >{{item.title}}</div>
          </div>
        </div>
      </template>
    </el-calendar>
    <!-- 日历单元格popover详情 -->
    <PopoverTpl
      ref="task_popover"
      :top="popoverStyle.top"
      :left="popoverStyle.left"
      v-if="popoverModel"
    >
      <div class="dialog my_index_task_calendar_dialog">
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
                :width="12"
                :percentage="item.plan"
                :stroke-width="1"
                status="success"
                v-if="item.state === '2'"
              ></el-progress>
              <el-progress
                type="circle"
                :width="12"
                :percentage="item.plan"
                :stroke-width="1"
                :show-text="false"
                status="success"
                v-else
              ></el-progress>
            </div>
            <!-- 任务名称，点击查看详情 -->
            <div
              class="content"
              :class="{'finish': item.taskState !== '0'}"
              @click="handleDetail(item)"
            >{{item.title}}</div>
          </div>
        </div>
      </div>
    </PopoverTpl>
    <!-- 新增 -->
    <CreateDialog ref="create" @load_page="getCalendar(time)"></CreateDialog>
    <!-- 修改详情 -->
    <DetailDialog ref="detail" @load_data="getCalendar()"></DetailDialog>
    <!-- 奖励分配 -->
    <DistributeDialog ref="distribute"></DistributeDialog>
  </div>
</template>

<script>
import { getSelectCalendar } from "@/api/qms/cooperation_list";
import { countWeek } from "@/util/date";
import CreateDialog from "../form/create";
import DetailDialog from "../form/detail";
import PopoverTpl from "./popover";
import { parseDate } from "@/filters/index.ts";
import finishMixin from "@/views/task/components/finish/mixin.js";
import DistributeDialog from "@/views/task/components/finish/distribute";

const getFirstDay = () => {
  return `${parseDate(+new Date(), "yyyy-MM")}-01`;
};

export default {
  mixins: [finishMixin],
  components: { CreateDialog, DetailDialog, PopoverTpl, DistributeDialog },
  data() {
    return {
      time: new Date(),
      taskList: [],
      taskObj: {},
      dateRanger: {
        beginTime: parseDate(new Date(), "yyyy-MM-DD"),
        endTime: parseDate(new Date(), "yyyy-MM-DD"),
      },
      loading: false,
      parseDate,
      selectList: [
        {
          value: "all",
          name: "全部",
        },
        {
          value: "for",
          name: "进行中",
        },
        {
          value: "complete",
          name: "完成",
        },
        {
          value: "close",
          name: "关闭",
        },
      ],
      state: "for",
      popoverModel: false,
      popoverStyle: {
        left: 0,
        top: 0,
      },
      popoverData: {},
    };
  },
  methods: {
    getCalendar(time = getFirstDay(), type = false) {
      const fn = () => {
        this.taskList = [];
        this.taskObj = {};
        this.loading = true;
        const month = parseDate(time, "yyyy-MM");
        const firstDay = month + "-01 00:00";
        getSelectCalendar({
          time: firstDay,
          state: this.state,
        }).then(({ data }) => {
          this.taskList = data;
          for (const item of data) {
            this.taskObj[
              month +
                "-" +
                ((item.day + "").length === 1 ? `0${item.day}` : item.day)
            ] = item.taskList;
          }
          this.loading = false;
        });
      };
      if (type) {
        fn();
      } else {
        if (parseDate(time, "yyyy-MM") !== this.dateRanger.$index) {
          fn();
        }
      }
    },
    getTask(row) {
      const list = this.taskObj[row.day] || [];
      return list;
    },
    // 打开日历单元格的popover
    handleShowList(event, row) {
      this.popoverData = { ...row };
      // 根据日历的高宽进行日历详情的偏移
      this.$nextTick(() => {
        const width = document.body.clientWidth;
        const height = document.body.offsetHeight;
        // 宽度
        let screenX = event.screenX;
        if (width - event.screenX < 342) {
          screenX = width - 342;
        }
        // 高度
        let screenY = event.screenY - 100;
        const domHeight =
          82 +
          41 *
            (this.getTask(this.popoverData).length > 9
              ? 9
              : this.getTask(this.popoverData).length);
        if (height - screenY < domHeight) {
          screenY = height - domHeight;
        }
        this.popoverModel = true;
        this.popoverStyle = {
          left: screenX,
          top: screenY,
        };
      });
    },
    rangeChange(type) {
      const date = new Date(this.time);
      let year = date.getFullYear();
      let month = date.getMonth();
      if (type === 1) {
        if (month === 0) {
          year = year - 1;
          month = 12;
        }
      } else if (type === 2) {
        if (month === 11) {
          year += 1;
          month = 0;
        } else {
          month += 2;
        }
      }
      this.time = year + "-" + month + "-01 00:00";
    },
    handleCreate(day = parseDate(new Date(), "yyyy-MM-DD")) {
      this.$refs.create.loadData({ finishTime: day + " 23:59:59" });
    },
    handleBack() {
      this.$emit("changeWeb", "ListTpl");
    },
    // 搜索
    handleState(value) {
      this.state = value;
      this.getCalendar(this.time);
    },
    getDayDetail(day = new Date()) {
      return countWeek(day) + "，" + parseDate(day, "MM月DD日，yyyy年");
    },
    handleDetail(row) {
      this.$refs.detail.loadData(row);
    },
    refreshData() {
      this.getCalendar();
    },
    // 完成任务
    handleFinishTask(row) {
      if (row.state === "1") {
        this.handleFinish(row);
      }
    },
  },
  watch: {
    time(val) {
      this.getCalendar(val);
    },
  },
  created() {
    this.getCalendar(getFirstDay(), true);
  },
};
</script>

<style lang="scss" scoped>
.iep-page-form {
  position: relative;
  &::v-deep .el-calendar-day {
    padding: 0;
  }
  .calendar-head {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid #ebeef5;
    .time {
      display: flex;
      .date {
        margin-right: 15px;
        color: #000000;
        align-self: center;
      }
      .range {
        i {
          color: $--color-text-regular;
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
    .button-list {
      i {
        font-size: 22px;
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
  .calendar-item {
    padding: 8px;
    height: calc(100% - 16px);
    width: calc(100% - 16px);
    .head {
      display: flex;
      justify-content: space-between;
      .number {
        font-size: 12px;
        color: $--color-text-regular;
      }
    }
    .task-item {
      font-size: 12px;
      margin-bottom: 4px;
      display: flex;
      .progress {
        margin-right: 5px;
      }
      .content {
        width: calc(100% - 20px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .finish {
        text-decoration: line-through;
        color: $--color-text-secondary;
      }
    }
  }
  .button-right {
    margin-right: 20px;
    width: 254px;
    text-align: right;
    .button {
      margin-right: 5px;
    }
  }
  .item1 {
    color: #f74437;
  }
  .item2 {
    color: #fe9b00;
  }
  .item3 {
    color: #3cd489;
  }
  .item4 {
    color: $--color-text-secondary;
  }
}
.iep-page-form ::v-deep .el-calendar-day {
  overflow-y: hidden;
}
.calendar_popover {
  min-width: 70px;
}
#calendar_select {
  min-width: 70px;
  .select-item {
    cursor: pointer;
    padding: 5px 0;
    span {
      display: inline-block;
      width: 90px;
    }
    i {
      font-size: 18px;
      color: $--color-primary;
    }
  }
}
.calendar {
  &::v-deep .el-calendar__header {
    display: none;
  }
  &::v-deep .el-calendar-table:not(.is-range) td.prev .task-item {
    color: #babec0 !important;
  }
  &::v-deep .el-calendar-table:not(.is-range) td.prev .number {
    color: #babec0 !important;
  }
  &::v-deep .el-calendar-table:not(.is-range) td.next .task-item {
    color: #babec0 !important;
  }
  &::v-deep .el-calendar-table:not(.is-range) td.next .number {
    color: #babec0 !important;
  }
  &::v-deep .is-today {
    color: #666769;
  }
}
</style>
<style lang="scss" scoped>
.my_index_task_calendar_dialog {
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
    max-height: 350px;
    overflow-y: scroll;
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
.calendar-head .button-list i {
  color: $--color-text-secondary;
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>
