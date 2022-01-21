<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name" :backOption="backOption"></iep-page-header>
      <el-alert title="创建成功" type="success" description="组织创建成功 请依次完成以下任务" show-icon></el-alert>
      <div class="task-list-wrap">
        <TaskItem
          v-for="item in taskList"
          :key="item.id"
          :item="item"
          @refresh="loadData()"
          @inviteSoUser="inviteSoUser"
        ></TaskItem>
      </div>
      <div class="banner" @click="$openPage('/wel/index')">
        <img src="/img/banner/so_newer_banner.png" alt />
      </div>
    </iep-basic-container>
    <IepDialogInviteSoUser ref="IepDialogInviteSoUser"></IepDialogInviteSoUser>
  </div>
</template>
<script>
import { getSoTaskList } from "@/api/qms/so_task";
import { taskList } from "./options";
import TaskItem from "./TaskItem";
import { mapGetters } from "vuex";
export default {
  components: {
    TaskItem,
  },
  data() {
    return {
      backOption: {
        isBack: true,
      },
      taskList,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data } = await getSoTaskList();
      this.taskList = data;
    },
    inviteSoUser() {
      this.$refs["IepDialogInviteSoUser"].form = {
        orgId: this.userInfo.orgId,
        orgName: this.userInfo.orgName,
        users: [],
      };
      this.$refs["IepDialogInviteSoUser"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.task-list-wrap {
  padding: 20px 40px;
}
.banner {
  cursor: pointer;
}
</style>
