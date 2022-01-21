<template>
  <div class="styles-wrap" v-loading="loading">
    <div class="title">产品与服务</div>
    <div class="products-container">
      <template v-for="item of pagedTable">
        <div :key="item.id" class="product-wrap">
          <iep-product-item isComplex :product="item"></iep-product-item>
          <div class="product-cost">
            <span v-if="item.isFree==='1'" class="green">免费</span>
            <template v-else>
              <span :title="item.price+'贝'" class="red iep-ellipsis-flex">{{item.price}}贝</span>
              <span :title="item.cash+'元'" class="iep-ellipsis-flex">{{item.cash}}元</span>
            </template>
          </div>
        </div>
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
import { getProductPageByOrgId } from "@/api/dms/product";
export default {
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 9,
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
      await this.loadTable({ ...param, ...params }, getProductPageByOrgId);
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
.products-container {
  .product-wrap {
    display: flex;
    justify-content: space-between;
    .product-item {
      flex: 1;
    }
    .product-cost {
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
.red {
  color: $--color-primary;
}
.green {
  color: $--color-third;
}
</style>
