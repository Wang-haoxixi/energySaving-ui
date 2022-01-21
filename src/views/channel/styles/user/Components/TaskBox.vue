<template>
  <div>
    <div class="title">TA的任务</div>
    <iep-no-data v-if="!data.length" complex></iep-no-data>
    <div class="task-list">
      <IepTaskColumn v-for="item in data" :key="item.id" :data="item"></IepTaskColumn>
    </div>
  </div>
</template>
<script>
import { getTaskListByUserId } from "@/api/qms/cooperation_list";
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getTaskListByUserId(this.$route.params.id);
      this.data = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
</style>
