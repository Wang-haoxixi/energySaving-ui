<template>
  <div class="product-card">
    <ProductItem v-for="(item) in itemList" :key="item.id" :product="item"></ProductItem>
  </div>
</template>
<script>
import ProductItem from "./ProductItem";
export default {
  props: {
    itemList: {
      type: Array,
      required: true,
    },
  },
  components: { ProductItem },
};
</script>
<style lang="scss" scoped>
.product-card {
  display: grid;
  grid-auto-flow: row dense;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
