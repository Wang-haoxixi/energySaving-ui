<template>
  <div class="list-box" v-loading="loading">
    <Nodata v-if="!pagedTable.length"></Nodata>
    <template v-else>
      <p>
        共
        <span>{{pagination.total}}</span>
        条数据
      </p>
      <div class="grid-box">
        <iep-activity-card v-for="item of pagedTable" :key="item.id" :activity="item"></iep-activity-card>
      </div>
      <div class="pages" v-if="pagedTable.length > 0">
        <iep-pagination
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          :pagination-option="pagination"
          :layout="layout"
          prev-text="上一页"
          next-text="下一页"
          background
        ></iep-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getActivitiePage } from "@/api/meetting/publish";
import Nodata from "./Nodata";
export default {
  components: {
    Nodata,
  },
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      layout: "prev,pager,next",
      loading: false,
      iepPageSize: 6,
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async loadPage(
      param = {
        keyword: this.$route.query.keyword,
        type: this.$route.query.type,
      },
    ) {
      let params;
      if (param.type === "1") {
        params = {
          name: param.keyword,
        };
      } else if (param.type === "2") {
        params = {
          label: param.keyword,
        };
      }
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(params, getActivitiePage);
      this.loading = false;
    },
  },
  watch: {
    $route: {
      handler: function() {
        this.loadPage();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.grid-box {
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 40px 0;
}
</style>
