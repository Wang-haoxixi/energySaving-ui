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
        <el-card shadow="never" v-for="item of pagedTable" :key="item.id" class="product-item">
          <iep-product-item isComplex :product="item"></iep-product-item>
          <div class="product-cost">
            <span v-if="item.isFree==='1'" class="iep-green">免费</span>
            <template v-else>
              <span :title="item.price+'贝'" class="iep-red iep-ellipsis-flex">{{item.price}}贝</span>
              <span :title="item.cash+'元'" class="iep-ellipsis-flex">{{item.cash}}元</span>
            </template>
          </div>
        </el-card>
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
import { getProductListPage } from "@/api/dms/product";
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
      iepPageSize: 5,
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
          tag: param.keyword,
        };
      }
      this.loading = true;
      this.$emit("loadSearchCount");
      await this.loadTable(params, getProductListPage);
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
  grid-template-columns: 1fr;
}
.product-item {
  ::v-deep .el-card__body {
    display: flex;
    justify-content: space-between;
    .product-cost {
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
