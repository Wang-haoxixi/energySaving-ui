<template>
  <div class="time-line">
    <div class="chosen-year">
      <el-date-picker
        v-model="selectYear"
        type="year"
        placeholder="选择年"
        ref="selectYear"
        @change="changeYear"
        value-format="yyyy"
      ></el-date-picker>
    </div>
    <div v-for="(item, index) in option" :key="index">
      <div class="item" v-if="todayTime.timeStamp > item.timeStamp || item.year">
        <div class="before year" v-if="item.year" @click="chosenYear(item.year)">{{item.year}}年</div>
        <div class="middle">
          <div class="tail"></div>
          <div class="date icon" v-if="item.year" @click="chosenYear(item.year)">
            <i></i>
          </div>
          <div
            class="date"
            v-else
            @click="actively(index, 'month', item)"
            :class="active===index?'actively':''"
          >{{item.date}}</div>
          <div class="content">
            <slot name="content" :row="item" :index="index"></slot>
          </div>
        </div>
        <!-- 展开的子级 -->
        <div v-if="active===index">
          <div v-for="(child, i) in item.children" :key="i">
            <div
              class="child"
              :class="activeChild===i?'actively':''"
              v-if="todayTime.timeStamp > child.timeStamp"
            >
              <div class="before" @click="actively(i, 'week', child)">
                <div class="title" v-text="`第${toChinesNum(child.index)}周`"></div>
                <div class="sub-title">{{child.startTime}} ~ {{child.endTime}}</div>
              </div>
              <div class="middle">
                <div class="tail"></div>
                <div class="date" @click="actively(i, 'week', child)">
                  <i class="spot"></i>
                </div>
                <div class="content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  toChinesNum,
  getMonday,
  getWeekOfYear,
  createWeeks,
  getDateObj,
} from "./util";

export default {
  name: "timeline",
  computed: {},
  props: {
    timeLineOption: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      active: -1,
      activeChild: -1,
      option: [],
      selectYear: "",
      todayTime: getMonday(new Date()),
      today: new Date(),
    };
  },
  methods: {
    /**
     * 周月点击事件
     * @index 下标
     * @type 点击的类型是周还是月
     * @item 当前点击对象
     */
    actively(index, type, item) {
      // 点击时间轴首先判断是否到达时间，若为未来时，点击无效
      if (item.timeStamp > +new Date()) {
        // this.$message('未到时间')
        return;
      }
      if (type === "month") {
        if (this.activeChild == -1 && this.active == index) {
          this.active = -1;
        } else {
          this.active = index;
        }
        this.activeChild = -1;
      } else {
        if (this.activeChild === index) return;
        this.activeChild = index;
      }
      item.$index = index;
      this.$emit("actively", item, type);
    },
    toChinesNum(index) {
      return toChinesNum(index);
    },
    // 年份点击事件
    chosenYear() {
      this.$refs["selectYear"].focus();
    },
    // 年份改变
    changeYear(val) {
      this.$emit("changeYear", val);
    },
    /**
     * 时间轴初始化
     * @date 初始化截止的时间
     * @type 是否按年初始化
     */
    loadPage(date, type) {
      // 初始化时间轴，获取到当前的周
      const list = createWeeks(
        new Date(
          type === "year" ? date : getMonday(date).timeStamp,
        ).getFullYear(),
        this.title,
      );
      /**
       * 需要判断是否是当前年，若不是，显示第一个月，若是，显示现在时
       * getDateObj 获取date时间的月份和星期，时间轴为倒叙，所以获取的也是倒叙
       */
      let obj = {};
      if (type === "year") {
        if (date.getFullYear() == this.today.getFullYear()) {
          obj = getDateObj(list, this.today);
          date = new Date(`${date.getFullYear()}-${13 - obj.month}-01`);
        } else {
          obj = { month: 1, week: 0 };
        }
        this.contentType = "week";
      } else if (type === "search") {
        obj = getDateObj(list, date);
      } else {
        date = new Date(getMonday(+this.today).timeStamp);
        obj = getDateObj(list, date);
      }
      // 赋值时间轴
      this.active = obj.month;
      this.activeChild = obj.week;
      this.option = list;
      this.params = date;
      this.$emit("load_data", this.params, true);
    },
    // 处理接口获取到的数据，将数据插入到时间轴上面
    dealData(row = []) {
      if (this.active === -1) return;
      for (const index in row) {
        const item = row[index];
        for (const i in this.option[this.active].children) {
          const t = this.option[this.active].children[i];
          const timeStamp = +new Date(item.startDateTime) - t.timeStamp;
          if (
            timeStamp >= 0 &&
            timeStamp < 7 * 24 * 60 * 60 * 1000 &&
            item.reportType === 0
          ) {
            this.$set(
              this.option[this.active].children,
              i,
              Object.assign({}, t, item),
            );
          } else if (item.reportType === 1) {
            this.$set(
              this.option,
              this.active,
              Object.assign({}, this.option[this.active], item),
            );
          }
        }
      }
      // 处理完所有的数据之后，将选中周月的数据抛上去显示在formData中（首次、搜索、年份切换时生效）
      const emitData =
        this.activeChild === -1
          ? this.option[this.active]
          : this.option[this.active].children[this.activeChild];
      this.$emit("actively", emitData);
    },
  },
  created() {
    // 获取当前的时间，默认显示当前年-当前月
    let date = this.today;
    if (getWeekOfYear() == 0) {
      this.today = new Date(date.getFullYear() - 1, 11, 31);
      date = this.today;
    }
    this.loadPage(date);
  },
  watch: {
    timeLineOption: {
      handler(val) {
        this.dealData([...val]);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.time-line {
  .item {
    width: 150px;
    position: relative;
    min-height: 50px;
    .before {
      width: 100px;
      padding: 5px 0 0;
      position: absolute;
      top: 0px;
      font-size: 14px;
      text-align: right;
    }
    .year {
      cursor: pointer;
    }
    .middle {
      margin-left: 100px;
      position: relative;
      padding-left: 10px;
      .tail {
        position: absolute;
        left: 28px;
        top: 35px;
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
        cursor: pointer;
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
        border: 1px solid $--color-primary;
        color: $--color-primary;
        background: $--background-color;
        border-color: $--color-primary;
      }
      .content {
        position: relative;
        margin-left: 43px;
        top: -33px;
        min-height: 40px;
      }
    }
    .child {
      position: relative;
      min-height: 50px;
      .before {
        cursor: pointer;
        text-align: right;
        margin-top: -20px;
        .title {
          font-size: 14px;
          color: $--color-text-regular;
        }
        .sub-title {
          font-size: 12px;
          color: $--color-text-secondary;
        }
      }
      .middle {
        margin-left: 109px;
      }
      .tail {
        left: 19px;
        top: 20px;
        height: calc(100% - 18px);
      }
      .date {
        width: 18px;
        height: 18px;
        .spot:before {
          content: "";
          position: absolute;
          height: 2px;
          width: 2px;
          border: 2px solid #ddd;
          border-radius: 50%;
          background-color: #ddd;
          top: 7px;
          left: 17px;
        }
      }
    }
    .actively {
      border-color: $--color-primary !important;
      color: $--color-primary;
      .title {
        color: $--color-primary !important;
      }
      .date {
        background-color: $--custom-menu-background-color;
        border: 1px solid $--color-primary;
        .spot:before {
          border: 2px solid $--color-primary;
          background-color: $--color-primary;
        }
      }
    }
    .actively.date {
      background-color: $--custom-menu-background-color !important;
    }
  }
}
.chosen-year ::v-deep input {
  width: 0;
  height: 0;
  border: 0;
}
.chosen-year ::v-deep span {
  display: none;
}
.chosen-year {
  display: none;
  width: 0;
  height: 0;
}
</style>
