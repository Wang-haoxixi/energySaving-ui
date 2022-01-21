<template>
  <div>
    <div class="time">
      <div class="timeRow">剩余时间</div>
      <div class="timeRun">{{this.disabled ? '已考完' : countDownList}}</div>
    </div>
    <div class="progress">
      当前进度：
      <span style="color:red">{{examInfo.answered}}</span>
      / {{examInfo.total}}
    </div>
    <div class="submit">
      <el-button v-if="!disabled && examInfo.allowSave === '1'" @click="saveAndOout">保存并退出</el-button>
      <el-button v-if="!disabled" type="primary" @click="submit">交卷</el-button>
      <el-button v-if="disabled" type="primary" @click="out">退出</el-button>
      <!-- <el-button v-if="disabled" type="primary" @click="result" plain>查看结果</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    examInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      countDownList: "00:00:00",
      timeLock: false,
      endTime: 100, //倒计时时间
      totalTime: 0, //总时间
    };
  },
  watch: {
    examInfo: {
      immediate: true,
      handler(val) {
        //暂时防多次触发
        if (val.time && this.totalTime !== val.time) {
          this.endTime = this.getTime(val.time);
          this.countDown();
          this.totalTime = val.time;
        }
      },
    },
  },
  created() {
    // this.countDown(70 * 60);
  },
  methods: {
    initCountDown(val) {
      this.endTime = this.getTime(val);
      this.countDown();
    },
    getTime(val) {
      return val ? val.split("-")[0] * 60 + Number(val.split("-")[1]) : "";
    },
    getSurplusTime() {
      return Math.floor(this.endTime / 60) + "-" + (this.endTime % 60);
    },
    getStrTime() {
      return this.endTime;
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    countDown() {
      if (this.timeLock == false) {
        const time = this.endTime;
        if (time > 0) {
          this.timeLock = true;
          const obj = {
            hou: this.timeFormat(parseInt(time / (60 * 60))),
            min: this.timeFormat(parseInt((time / 60) % 60)),
            sec: this.timeFormat(parseInt((time % 60) % 60)),
          };
          this.countDownList = obj.hou + ":" + obj.min + ":" + obj.sec;
          setTimeout(() => {
            this.endTime = this.endTime - 1;
            this.timeLock = false;
            this.$nextTick(() => {
              this.countDown();
            });
          }, 1000);
        } else {
          if (this.disabled == false) {
            this.$emit("endTime");
          }
        }
      }
    },
    saveAndOout() {
      this.$emit("saveAndOut");
    },
    submit() {
      this.$emit("submit");
    },
    out() {
      this.$emit("out");
    },
    result() {
      this.$emit("result");
    },
  },
};
</script>
<style lang="scss" scoped>
.time {
  margin: 0;
  border-radius: 15px;
  text-align: center;
  color: white;
  background: #ec6f66;
  background: linear-gradient(to right, #f3a183, #ec6f66);
  .timeRow {
    padding: 15px 0 7px 0;
    font-size: 18px;
  }
  .timeRun {
    padding-bottom: 15px;
    font-weight: 600;
    font-size: 24px;
  }
}
.progress {
  margin: 15px;
  text-align: center;
}
.submit {
  margin: 35px;
  text-align: center;
  .el-button {
    margin-bottom: 10px;
    width: 90px;
    height: 36px;
  }
}
</style>
