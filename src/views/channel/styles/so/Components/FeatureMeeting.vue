<template>
  <div>
    <div v-if="data.length" class="feature-meeting" v-loading="loading">
      <iep-activity-card small v-for="item of data" :key="item.id" :activity="item"></iep-activity-card>
    </div>
    <iep-no-data v-else complex style="width:100%;"></iep-no-data>
  </div>
</template>
<script>
import { getActivityListByOrgId } from "@/api/meetting/publish";
export default {
  name: "FeatureMeeting",
  data() {
    return {
      data: [],
      loading: false,
    };
  },
  methods: {
    async load() {
      this.loading = true;
      const { data } = await getActivityListByOrgId(this.$route.params.id);
      if (data) {
        this.data = data;
        this.$emit("setDataLength", data.length >= 3);
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.feature-meeting {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: -10px;
  ::v-deep .image {
    border-radius: 10px 10px 0 0;
  }
}
</style>
