<template>
  <div class="task-box box">
    <div class="sub-title">本周任务</div>
    <iep-no-data v-if="!data.length" complex></iep-no-data>
    <div class="task-list">
      <IepTaskColumn v-for="item in data" :key="item.id" :data="item"></IepTaskColumn>
    </div>
  </div>
</template>
<script>
import { getWeekTaskListByOrgId } from "@/api/qms/cooperation_list";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: [],
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getWeekTaskListByOrgId(this.userInfo.orgId);
      this.data = data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.task-box {
  display: flex;
  flex-direction: column;
}
</style>
