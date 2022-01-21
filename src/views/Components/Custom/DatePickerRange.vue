<template>
  <div class="picker-wrap">
    <!-- 开始时间 -->
    <el-date-picker
      v-model="st"
      :value-format="valueFormat"
      type="datetime"
      :format="format"
      :placeholder="startPlaceholder"
      @change="changeStart"
      :pickerOptions="startPickerOption"
      :prefix-icon="startPrefixIcon"
    ></el-date-picker>
    <!-- :default-time="startDefaultTime" -->

    <span class="mid">{{midholder}}</span>
    <!-- 结束时间 -->
    <el-date-picker
      v-model="et"
      :value-format="valueFormat"
      :format="format"
      type="datetime"
      :placeholder="endPlaceholder"
      @change="changeEnd"
      :pickerOptions="endPickerOption"
      :prefix-icon="endPrefixIcon"
    ></el-date-picker>
    <!-- default-time="23:59:59" -->
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "IepDatePickerRange",
  props: {
    startPlaceholder: {
      type: String,
      default: "选择开始时间",
    },
    endPlaceholder: {
      type: String,
      default: "选择结束时间",
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss",
    },
    format: {
      type: String,
      default: "yyyy-MM-dd HH:mm",
    },
    startTime: {
      type: String,
      default: "",
      required: true,
    },
    endTime: {
      type: String,
      default: "",
      required: true,
    },
    startPickerOptions: {
      type: Object,
      default: () => {},
    },
    endPickerOptions: {
      type: Object,
      default: () => {},
    },
    startPrefixIcon: {
      type: String,
      default: "el-icon-date",
    },
    endPrefixIcon: {
      type: String,
      default: "el-icon-date",
    },
    midholder: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      st: "",
      et: "",
    };
  },
  watch: {
    startTime: {
      handler(v) {
        this.st = v;
      },
      immediate: true,
    },
    endTime: {
      handler(v) {
        this.et = v;
      },
      immediate: true,
    },
  },
  computed: {
    startPickerOption() {
      if (this.startPickerOptions) return this.startPickerOptions;
      return {
        disabledDate: time => {
          const condition =
            time.getTime() <
            moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
          // 如果结束已经设置，不能大于结束时间，只判断到天
          // if (this.et)
          //   return (
          //     moment(time).format("YYYY-MM-DD") >
          //       moment(this.et).format("YYYY-MM-DD") || condition
          //   );
          return condition;
        },
        selectableRange: this.selectableRange(this.st),
      };
    },
    endPickerOption() {
      if (this.endPickerOptions) return this.endPickerOptions;
      return {
        disabledDate: time => {
          // 如果开始已经设置，不能小于开始时间，只判断到天
          if (this.st)
            return (
              moment(time).format("YYYY-MM-DD") <
              moment(this.st).format("YYYY-MM-DD")
            );
          return (
            time.getTime() <
            moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          );
        },
        selectableRange: this.selectableRange(this.et),
      };
    },
    startDefaultTime() {
      return moment().format("HH:mm:ss");
    },
  },
  methods: {
    changeStart(v) {
      // 当开始时间大于结束时间时清除结束时间
      if (v) {
        if (this.et) {
          if (v > this.et) {
            this.et = moment(v)
              .add(1, "d")
              .format("YYYY-MM-DD HH:mm:ss");
            this.changeEnd(this.et);
          }
        } else {
          if (this.autocomplete) {
            this.et = moment(v)
              .add(1, "d")
              .format("YYYY-MM-DD HH:mm:ss");
            this.changeEnd(this.et);
          }
        }
      }
      this.$emit("update:startTime", v || "");
    },
    changeEnd(v) {
      // 当结束时间小于开始时间时清除开始时间
      if (v < this.st) {
        this.st = "";
        this.changeStart(this.st);
      }
      this.$emit("update:endTime", v || "");
    },
    selectableRange(time) {
      //如果选择当天，时间不能小于当前时间；
      if (moment(time).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
        return `${moment().format("HH:mm:ss")} - 23:59:59`;
      }
      return "00:00:00 - 23:59:59";
    },
  },
};
</script>
<style lang="scss" scoped>
.picker-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  .mid {
    padding: 0 10px;
  }
  // &::v-deep .el-input__prefix {
  //   display: none;
  // }
  &::v-deep .el-input__inner {
    padding: 0 12px;
    text-indent: 30px;
  }
}
</style>