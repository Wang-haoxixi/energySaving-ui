<template>
  <div class="product-wapper box-wrapper">
    <div class="title">产品与服务</div>
    <template v-if="data.length">
      <div class="product-main" v-loading="loading">
        <iep-product-item v-for="item of data" :key="item.id" :product="item"></iep-product-item>
      </div>
      <join-more v-if="data.length>=3" path="products" v-bind="$attrs"></join-more>
    </template>
    <iep-no-data v-else complex style="width:100%;"></iep-no-data>
  </div>
</template>
<script>
import { getNewestList } from "@/api/dms/product";
import JoinMore from "./JoinMore";

export default {
  components: {
    JoinMore,
  },
  data() {
    return {
      data: [],
      loading: false,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    async load() {
      this.loading = true;
      const { data } = await getNewestList(this.id);
      if (data) {
        this.data = data;
      }
      this.loading = false;
    },
  },
  created() {
    this.load();
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.product-wapper {
  justify-content: flex-start;
  .product-main {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 375px 375px;
    gap: 20px 40px;
    margin-bottom: 30px;
  }
}
</style>
