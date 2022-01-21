<template>
  <div class="grid-container">
    <div class="feature-box">
      <FeatureBox :isJoin="isJoin" />
    </div>
    <div class="product-box">
      <ProductBox :isJoin="isJoin" />
    </div>
    <!-- <div class="thought-box">
      <ThoughtBox :isJoin="isJoin" />
    </div>-->
    <div class="material-box">
      <MaterialBox :isJoin="isJoin" />
    </div>
  </div>
</template>
<script>
import FeatureBox from "./Components/FeatureBox";
import ProductBox from "./Components/ProductBox";
// import ThoughtBox from "./Components/ThoughtBox";
import MaterialBox from "./Components/MaterialBox";
export default {
  components: {
    FeatureBox,
    ProductBox,
    // ThoughtBox,
    MaterialBox,
  },
  props: ["isJoin"],
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 370px 325px 430px;
  gap: 20px;
  grid-template-areas: "feature-box" "product-box" "material-box";
}
[class$="-box"] {
  background: #fff;
  border-radius: $--border-radius-base;
  padding: 20px 20px 30px;
}
</style>
