<template>
  <iep-basic-container class="container out-box">
    <component v-bind:is="ComponentName" @changeWeb="changeWeb"></component>
  </iep-basic-container>
</template>

<script>
import ListTpl from "./list/index";
import CalendarTpl from "./calendar/index";
export default {
  components: { ListTpl, CalendarTpl },
  data() {
    return {
      ComponentName: "ListTpl",
    };
  },
  methods: {
    changeWeb(name) {
      this.ComponentName = name;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 676px;
}
.out-box {
  padding: 0;
  border: none;
}
.out-box ::v-deep .task-list .content-list .head .button-list {
  position: relative;
  top: -2px;
}
.out-box ::v-deep .task-list .content-list .head .button-list .el-tooltip {
  color: $--color-text-secondary;
  font-size: 20px;
}
.out-box ::v-deep .task-list .content-list .list {
  margin: 10px 0;
  padding: 0;
}
.out-box ::v-deep .task-list .content-list .list .item {
  align-items: center;
  padding: 15px 0;
  margin: 0 15px;
  &:hover {
    .el-progress-circle {
      opacity: 0.7;
    }
  }
}
.out-box ::v-deep .task-list .content-list .list .item:nth-of-type(n + 2) {
  border-top: 1px solid #eff0f1;
}
.out-box ::v-deep .task-list .content-list .list .item .state {
  padding-top: 0;
  display: flex;
  align-items: center;
  width: auto;
}
.out-box
  ::v-deep
  .task-list
  .content-list
  .list
  .item
  .state
  .el-progress-circle {
  width: 20px !important;
  height: 20px !important;
}
.out-box ::v-deep .task-list .content-list .list .item .org {
  align-items: center;
  // line-height: 50px;
  font-size: 14px;
}
.out-box ::v-deep .task-list .content-list .list .item .time {
  // line-height: 50px;
  font-size: 14px;
}
.out-box ::v-deep .task-list .content-list .list .item .avatar {
  display: flex;
  align-items: center;
  padding-top: 0;
}
</style>
