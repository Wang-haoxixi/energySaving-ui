<template>
  <div>
    <div v-if="data.length" class="task-list" v-loading="loading">
      <IepTaskColumn v-for="item in data" :key="item.id" :data="item"></IepTaskColumn>
    </div>
    <iep-no-data v-else complex style="width:100%;"></iep-no-data>
  </div>
</template>
<script>
import { getTaskListByOrgId } from "@/api/qms/cooperation_list";

export default {
  name: "FeatureTask",
  data() {
    return {
      data: [],
      loading: false,
    };
  },
  methods: {
    async load() {
      this.loading = true;
      const { data } = await getTaskListByOrgId(this.$route.params.id);
      if (data) {
        this.data = data;
        this.$emit("setDataLength", data.length >= 5);
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.task-list {
  .task-column {
    padding: 5px 15px;
    margin: 0;
    width: 790px;
    &:nth-of-type(1) {
      margin-top: -10px;
    }
  }
}
</style>
