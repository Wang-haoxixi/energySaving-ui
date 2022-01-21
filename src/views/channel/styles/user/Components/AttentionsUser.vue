<template>
  <div class="attentions-box">
    <div class="title">关注的人</div>
    <div class="attentions-container">
      <IepUserSimpleCard
        v-for="item in pagedTable"
        :user="item"
        :key="item.userId"
        @refresh="loadPage()"
      ></IepUserSimpleCard>
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
import { getFollowPageById } from "@/api/admin/follow";
export default {
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 24,
      layout: "prev, pager, next",
    };
  },
  computed: {
    getFollowPage() {
      return getFollowPageById(+this.$route.params.id);
    },
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = { ...this.searchForm }) {
      await this.loadTable(param, this.getFollowPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.attentions-box {
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
.attentions-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
</style>
