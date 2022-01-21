<template>
  <el-card class="recent-tasks" shadow="never">
    <h4>
      <span>
        近期任务
        <!-- <em>（{{orgList.length}}）</em> -->
      </span>
      <!-- <el-button type="default" slot="right">新建任务</el-button> -->
    </h4>
    <div class="recent-tasks-box">
      <calendarTpl ref="calendar" class="calendar-box" @load-data="loadData"></calendarTpl>
      <taskListTpl ref="taskList" class="tasks-list" @load-data="loadData"></taskListTpl>
    </div>
  </el-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import calendarTpl from "./calendar";
import taskListTpl from "./taskListTpl";

export default {
  components: { calendarTpl, taskListTpl },
  inject: ["reload"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["orgList"]),
    orgList9() {
      return this.orgList.slice(0, 9);
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async handleChangeOrg(item) {
      await this.orgChangeAction(item.id);
      this.reload();
    },
    loadData() {
      this.$refs.calendar.loadData();
      this.$refs.taskList.loadData();
    },
  },
};
</script>
<style lang="scss" scoped>
.recent-tasks {
  margin-bottom: 20px;
  padding: 20px;
  h4 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
    padding-bottom: 20px;
    font-size: 16px;
  }
}
.recent-tasks-box {
  display: grid;
  gap: 80px;
  grid-template-columns: 1fr 380px;
}
::v-deep .el-button--default {
  color: $--color-primary;
  border-color: $--color-primary;
  &:hover {
    color: #fff;
    background-color: $--color-primary;
  }
}
</style>
