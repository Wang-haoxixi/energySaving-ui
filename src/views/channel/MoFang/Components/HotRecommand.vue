<template>
  <div class="mo-fang-tabs">
    <Tabs
      v-model="activeTab"
      :tabList="tabList"
      title="推荐产品"
      listUrl="/channel/mo_fang/list"
      @tab-click="handleSelect"
    ></Tabs>
    <ProductCard :itemList="productList"></ProductCard>
  </div>
</template>
<script>
import { tabList } from "../options";
import Tabs from "./Tabs";
import ProductCard from "./ProductCard";
import { getHotRecommandList } from "@/api/dms/product";
export default {
  components: { Tabs, ProductCard },
  data() {
    return {
      tabList,
      activeTab: "10",
      productList: [],
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    handleSelect() {
      this.loadList();
    },
    async loadList() {
      const { data } = await getHotRecommandList(this.activeTab);
      this.productList = data.slice(0, 6);
    },
  },
};
</script>
<style lang="scss" scoped>
.mo-fang-tabs {
  margin: 30px auto 40px;
  width: 1200px;
}
</style>
