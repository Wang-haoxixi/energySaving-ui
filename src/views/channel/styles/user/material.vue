<template>
  <div class="styles-wrap" v-loading="loading">
    <div class="title">TA的材料</div>
    <div class="material-container">
      <template v-for="item of pagedTable">
        <iep-material-item isComplex noCreator :key="item.id" :value="item"></iep-material-item>
        <el-divider :key="item.id"></el-divider>
      </template>
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
import { fetchPage } from "@/api/dms/material";
export default {
  mixins: [mixins],
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
        createBy: this.$route.params.id,
      };
      this.loading = true;
      await this.loadTable({ ...param, ...params }, fetchPage);
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
</style>
