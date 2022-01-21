<template>
  <div class="proxy">
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in routerMatch"
          :key="item.path"
          :to="{ path: item.path }"
        >{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div
      class="proxy-content"
      v-loading="visible"
      element-loading-text="您要查看的产品尚未认证，无法查看"
      element-loading-spinner="el-icon-lock"
    >
      <ProductDetail v-if="!visible" :productInfo="productInfo" @updateData="loadPage()"></ProductDetail>
    </div>
  </div>
</template>
<script>
import { getProductShopById } from "@/api/dms/product";
import { ProductDTO } from "@/views/cpms/util";
import ProductDetail from "./Components/ProductDetail.vue";
export default {
  props: ["id"],
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    this.loadPage(to.params.id);
    next();
  },
  data() {
    return {
      loadText: "产品加载中",
      loadIcon: "el-icon-loading",
      visible: true,
      productInfo: new ProductDTO(),
    };
  },
  components: {
    ProductDetail,
  },
  computed: {
    routerMatch() {
      return [
        { path: "/", name: "首页" },
        { path: "/channel/mo_fang", name: "魔方" },
        { path: "/channel/mo_fang/list", name: "产品列表" },
        { name: "产品详情" },
      ];
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    updateData(star) {
      this.productInfo.star = star;
    },
    async loadPage(id = this.id) {
      const res = await getProductShopById(id);
      if (res.code === 1) {
        this.visible = true;
        this.loadIcon = "el-icon-lock";
        this.loadText = "您要查看的产品尚未认证，无法查看";
      } else {
        this.productInfo = this.$mergeByFirst(new ProductDTO(), res.data);
        this.visible = false;
        this.loadIcon = "el-icon-loading";
        this.loadText = "产品加载中";
      }
    },
  },
};
</script>
>
<style lang="scss" scoped>
.breadcrumb-wrapper {
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  display: flex;
  align-items: center;
  font-size: 14px;
  span {
    margin-left: 3px;
  }
  .breadcrumb-item {
    display: flex;
    align-items: center;
    padding: 0;
    line-height: inherit;
  }
}
.proxy {
  width: 100%;
  background-color: #fff;
}
.proxy-content {
  width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 210px);
}
</style>
