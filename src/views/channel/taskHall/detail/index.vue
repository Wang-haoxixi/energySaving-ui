<template>
  <div class="task-body">
    <div class="task-detail">
      <!-- 主区域 -->
      <div class="left">
        <DetailTpl ref="left" @changeOrg="changeOrg"></DetailTpl>
      </div>
      <!-- 右侧推荐位 -->
      <div class="right">
        <user-info-tpl class="tpl" :orgId="orgId" v-if="orgId"></user-info-tpl>
        <NewestTaskTpl class="tpl"></NewestTaskTpl>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UserInfoTpl from "./userInfo";
import NewestTaskTpl from "../components/newestTask";
import DetailTpl from "./detail";

export default {
  components: {
    UserInfoTpl,
    NewestTaskTpl,
    DetailTpl,
  },
  computed: {
    ...mapGetters(["dictGroup", "userInfo"]),
  },
  data() {
    return {
      orgId: 0,
    };
  },
  methods: {
    open(id) {
      this.$refs.left.loadData(id);
    },
    changeOrg(id) {
      this.orgId = id;
    },
  },
  mounted() {
    const params = this.$route.params;
    this.open(params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.open(to.params.id);
    next();
  },
};
</script>

<style lang="scss" scoped>
.task-body {
  background-color: $--background-color;
  .task-detail {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: auto;
    padding: 25px;
    .left {
      width: 860px;
    }
    .right {
      background-color: $--background-color;
      width: 270px;
      border-radius: 10px;
      .tpl {
        margin-bottom: 20px;
        border-radius: 10px;
      }
    }
  }
}
</style>
