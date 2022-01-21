<template>
  <div class="styles-wrap" v-loading="loading">
    <div class="title">活动</div>
    <div class="meeting-container">
      <!-- <iep-activity-card v-for="item of pagedTable" :key="item.id" :activity="item"></iep-activity-card> -->
      <meeting-item v-for="item of pagedTable" :key="item.id" :activity="item"></meeting-item>
    </div>
    <div class="page" v-if="pagedTable.length > 0">
      <iep-pagination
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        :pagination-option="pagination"
        :layout="layout"
        background
      ></iep-pagination>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getActivityPageByOrgId } from "@/api/meetting/publish";
import MeetingItem from "./Components/MeetingItem";
export default {
  mixins: [mixins],
  components: {
    MeetingItem,
  },
  data() {
    return {
      isRoute: true,
      iepPageSize: 10,
      layout: "prev, pager, next",
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      const params = {
        orgId: this.$route.params.id,
      };
      this.loading = true;
      await this.loadTable({ ...param, ...params }, getActivityPageByOrgId);
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped >
.styles-wrap {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.meeting-container {
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 30px;
  justify-items: center;
}
</style>
