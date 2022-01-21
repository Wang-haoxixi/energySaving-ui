<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <div class="search-box">
        <div></div>
        <iep-operation-search
          ref="operationSearch"
          @search-page="handleSearch"
          prop="courseName"
          placeholder="请输入关键词进行搜索"
        >
          <!-- <slot name="iep-crud-advance-search">
            <advance-search @search-page="handleSearch"></advance-search>
          </slot>-->
        </iep-operation-search>
      </div>
      <iep-no-data v-if="!pagedTable.length" complex></iep-no-data>
      <CardList :data="pagedTable"></CardList>
      <div class="page" v-if="pagedTable.length > 0">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
          background
        ></iep-pagination>
      </div>
    </iep-basic-container>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getCourseInfoListPage } from "@/api/qms/course_info";
import CardList from "./CardList";
export default {
  components: {
    CardList,
  },
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 12,
      layout: "prev, pager, next",
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    handleSearch(searchForm) {
      this.searchPage(searchForm);
    },
    async loadPage(param = { ...this.searchForm }) {
      await this.loadTable(param, getCourseInfoListPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search-box ::v-deep .input-wrapper {
  margin: 0;
}
.page {
  margin: 20px auto 40px;
  text-align: center;
}
.page ::v-deep .content-footer .el-pagination {
  text-align: center;
}
</style>
