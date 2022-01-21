<template>
  <div class="task-column">
    <div class="state grid">
      <el-progress
        type="circle"
        :width="18"
        :percentage="formData.plan"
        :stroke-width="2"
        :status="formData.status"
        color="#3CD489"
      ></el-progress>
    </div>
    <div
      class="title grid iep-ellipsis-flex"
      :title="formData.title"
      @click="handleDetail(formData)"
    >{{formData.title}}</div>
    <div
      v-if="isComplex"
      class="urgency"
      :class="urgencyObj[formData.urgency].color"
    >{{urgencyObj[formData.urgency].name}}</div>
    <div
      class="time grid"
      :class="formData.timeDifference.state ? 'red' : formData.timeDifference.day === 0 ? 'orange' : 'green'"
    >
      <span>{{formData.timeDifference.state ? '逾期' : '剩余'}}</span>
      <span v-if="formData.timeDifference.day > 0">{{formData.timeDifference.day}}天</span>
      <span v-else>{{formData.timeDifference.hour}}时</span>
    </div>
    <div class="avatar grid">
      <iep-img class="img" :src="formData.avatar"></iep-img>
    </div>
  </div>
</template>

<script>
import { timeDifference } from "@/util/date";
import { urgencyObj } from "@/views/my/index/task/list/options";

export default {
  name: "IepTaskColumn",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    isComplex: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeDifference,
      urgencyObj,
    };
  },
  computed: {
    formData() {
      const data = { ...this.data };
      data.timeDifference = timeDifference(data.finishTime);
      return data;
    },
  },
  methods: {
    handleDetail(row) {
      this.$openPage(`/channel/task_detail/${row.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-column {
  display: flex;
  align-items: center;
  margin: 12px 0;
  cursor: pointer;
  box-sizing: border-box;
  &:nth-of-type(1) {
    margin-top: 16px;
  }
  .grid {
    margin-right: 20px;
    &:last-of-type {
      margin: 0;
    }
  }
  .state {
    margin-right: 20px;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    &::v-deep .el-progress__text {
      display: none;
    }
    &::v-deep .is-success .el-progress__text,
    &::v-deep .is-exception .el-progress__text {
      display: inline-block;
    }
  }
  .title {
    flex: 1;
    font-size: 14px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .urgency {
    width: 60px;
    // line-height: 60px;
    color: $--color-text-regular;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    font-size: 14px;
    margin-left: 20px;
  }
  .time {
    flex: 0 0 110px;
    font-size: 14px;
    text-align: right;
    .span {
      color: $--color-text-regular;
    }
    i {
      font-style: normal;
      color: $--color-text-secondary;
    }
  }
  .red {
    color: $--color-primary;
  }
  .blue {
    color: $--color-secondary;
  }
  .green {
    color: $--color-third;
  }
  .gray {
    color: #babec0;
  }
  .orange {
    color: #ff9667;
  }
  .avatar {
    flex: 0 0 40px;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid #eff0f1;
      box-sizing: border-box;
    }
  }
}
</style>
