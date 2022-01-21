<template>
  <div class="styles-wrap" v-loading="loading">
    <div class="title">问卷</div>
    <div class="questionnaires-container">
      <iep-ques-grid-item v-for="item of pagedTable" :key="item.id" :value="item"></iep-ques-grid-item>
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
import { getPage } from "@/api/qms/questionnaire";
export default {
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 14,
      layout: "prev, pager, next",
      loading: false,
    };
  },
  computed: {
    getQuesPage() {
      return getPage(1);
    },
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      const params = {
        orgId: this.$route.params.id,
        status: 1,
        scope: 1,
      };
      this.loading = true;
      await this.loadTable({ ...param, ...params }, this.getQuesPage);
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
.questionnaires-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  // grid-template-rows: repeat(7, 1fr);
  gap: 20px;
}
</style>
