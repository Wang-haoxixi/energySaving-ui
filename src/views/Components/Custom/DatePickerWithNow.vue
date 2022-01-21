<template>
  <div class="box-wrap">
    <el-date-picker
      v-model="starTime"
      :type="type||'month'"
      :value-format="valueFormat[type||'month']"
      placeholder="选择日期"
      :picker-options="startPickerOptions"
      @change="setStartDate"
    ></el-date-picker>
    <span class="mid">至</span>
    <el-date-picker
      ref="datePicker"
      v-model="endTime"
      :value-format="valueFormat[type||'month']"
      :format="format"
      :type="type||'month'"
      placeholder="选择日期"
      :picker-options="endPickerOptions"
      @change="setEndDate"
      @blur="initFormat"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: "IepDatePickerWithNow",
  props: {
    type: {
      type: String,
    },
  },
  data() {
    const setFormat = () => {
      this.format = "至今";
      this.$attrs.endDateStr = "至今";
    };
    const startDisabledDate = time => {
      return (
        time.getTime() > Date.now() ||
        time.getTime() > new Date(this.$attrs.endTime || "").getTime()
      );
    };
    const endDisabledDate = time => {
      return (
        time.getTime() > Date.now() ||
        time.getTime() < new Date(this.$attrs.starTime || "").getTime()
      );
    };
    return {
      startPickerOptions: {
        disabledDate(time) {
          return startDisabledDate(time);
        },
      },
      endPickerOptions: {
        disabledDate(time) {
          return endDisabledDate(time);
        },
        shortcuts: [
          {
            text: "至今",
            async onClick(picker) {
              await picker.$emit("pick", new Date());
              setFormat();
            },
          },
        ],
      },
      starTime: this.$attrs.starTime,
      endTime: this.$attrs.endTime,
      format: "yyyy 年 MM 月",
      valueFormat: { date: "yyyy-MM-dd", month: "yyyy-MM" },
    };
  },
  methods: {
    initFormat() {
      this.format = "yyyy 年 MM 月";
    },
    setStartDate(val) {
      this.$attrs.startDateStr = val || "";
    },
    setEndDate(val) {
      if (this.format === "至今") {
        this.initFormat();
      }
      this.$attrs.endDateStr = val || "";
    },
  },
};
</script>
<style lang="scss" scoped>
.box-wrap {
  display: flex;
  align-items: center;
  .mid {
    padding: 0 15px;
  }
  &::v-deep .el-input__prefix {
    display: none;
  }
  .el-input {
    max-width: 180px;
  }
  &::v-deep .el-input__inner {
    padding: 0 12px;
  }
}
</style>
