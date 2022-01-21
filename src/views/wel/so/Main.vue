<template>
  <div class="main-container">
    <div class="so-header" v-intro="'恭喜你加入节能保的第一个智慧组织！（简称组织）下面就来了解一下组织赋能台的使用方法'" v-intro-step="1">
      <Header :value="form"></Header>
    </div>
    <div class="notice-box" v-intro="'这里是组织的通知栏，重要消息不怕错过'" v-intro-step="3">
      <Notice></Notice>
    </div>
    <div class="task-box" v-intro="'该组织本周任务，及时掌握同伴们的任务进度'" v-intro-step="5">
      <Task></Task>
    </div>
    <div class="so-worth">
      <Worth></Worth>
    </div>
    <div class="so-data">
      <Data :value="form"></Data>
    </div>
    <!-- <div class="active-box" v-intro="'发布组织动态，分享属于你的真知灼见'" v-intro-step="6">
      <Activity></Activity>
    </div>-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getOrgById } from "@/api/admin/org";
import { OrgEntity } from "@/types/org";
import Header from "./Header";
import Notice from "./Notice";
import Data from "./Data";
import Worth from "./Worth";
import Task from "./Task";
// import Activity from "./Activity";
export default {
  components: {
    Header,
    Notice,
    Data,
    Worth,
    Task,
    // Activity,
  },
  data() {
    return {
      form: new OrgEntity(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const { data } = await getOrgById(this.userInfo.orgId);
      this.form = this.$mergeByFirst(new OrgEntity(), data);
    },
  },
};
</script>
<style lang="scss" scoped>
.main-container {
  display: grid;
  grid-template-columns: minmax(383px, 1fr) minmax(383px, 1fr);
  grid-template-rows: 180px 215px 85px 480px;
  gap: 20px;
  grid-template-areas: "so-header so-header" "notice-box so-data" "notice-box so-worth" "task-box task-box";
}

.so-header {
  grid-area: so-header;
}

.notice-box {
  grid-area: notice-box;
}

.task-box {
  grid-area: task-box;
}

.so-worth {
  grid-area: so-worth;
}

.so-data {
  grid-area: so-data;
}

// .active-box {
//   grid-area: active-box;
// }
</style>
