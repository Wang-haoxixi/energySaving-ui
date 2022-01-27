<template>
  <div class="picList">
    <div class="banner">
      <div class="proxy-top">
        <div class="content-text">
          <div class="title">
            <div>
              节能宝
              <strong>魔方</strong>
              <i>●</i>
              <span>遇见节能宝 预购未来</span>
            </div>
          </div>
          <div class="describe">争做节能宝合伙人，千万宝贝大赠送</div>
        </div>
      </div>
    </div>
    <search-filter
      @search-page="handleSearch"
      name="产品"
      :total="pagination.total"
      :categoryOption="categoryOption"
    ></search-filter>
    <div class="content-wrapper">
      <iep-no-data v-if="!pagedTable.length" complex></iep-no-data>
      <product-card :itemList="pagedTable"></product-card>
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
  </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getProductListPage } from "@/api/dms/product";
import SearchFilter from "./Components/SearchFilter";
import ProductCard from "./Components/ProductCard";
import { categoryOption } from "./options";

export default {
  mixins: [mixins],
  data() {
    return {
      isRoute: true,
      iepPageSize: 18,
      layout: "prev, pager, next",
    };
  },
  computed: {
    categoryOption() {
      return categoryOption();
    },
  },
  components: {
    SearchFilter,
    ProductCard,
  },
  methods: {
    handleSearch(searchForm) {
      this.searchPage(searchForm);
    },
    async loadPage(param = { ...this.searchForm }) {
      await this.loadTable(param, getProductListPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.picList {
  .banner {
    .proxy-top {
      height: 280px;
      background-image: url("/img/product/mfbg.png");
      background-position-x: center;
      background-size: cover;
      background-repeat: no-repeat;
      .content-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0 auto;
        width: 1050px;
        height: 240px;
        background: url("/img/product/mft.png");
        background-position-x: right;
        background-position-y: bottom;
        background-repeat: no-repeat;
        background-size: auto 90%;
      }
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        & > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 5px;
          margin-bottom: 5px;
          font-size: 40px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
        strong {
          font-weight: 400;
          color: $--color-primary;
        }
        i {
          margin: 0 5px;
          font-size: 18px;
          color: $--color-primary;
        }
        span {
          display: inline-block;
          margin-left: 10px;
          font-size: 22px;
          font-weight: 300;
          color: $--color-text-regular;
        }
      }
      .describe {
        margin-top: 10px;
        font-size: 18px;
        color: $--color-text-regular;
      }
    }
  }
  .content-wrapper {
    margin: 0 auto;
    width: 1200px;
  }
}
.page {
  margin: 20px auto 40px;
  text-align: center;
}
.page ::v-deep .content-footer .el-pagination {
  text-align: center;
}
</style>
