<template>
  <div class="container">
    <IndexBanner></IndexBanner>
    <div class="content">
      <IndexSearchBox></IndexSearchBox>
      <div class="list-container">
        <ISBreadcrumb></ISBreadcrumb>
        <AllList v-if="showAll"></AllList>
        <TypeList v-else></TypeList>
      </div>
    </div>
  </div>
</template>

<script>
import IndexSearchBox from "./Component/IndexSearchBox";
import IndexBanner from "./Component/IndexBanner";
import ISBreadcrumb from "./Component/ISBreadcrumb";
import AllList from "./Component/AllList";
import TypeList from "./Component/TypeList";
import { isAll } from "./options";
export default {
  components: {
    IndexSearchBox,
    IndexBanner,
    ISBreadcrumb,
    AllList,
    TypeList,
  },

  computed: {
    showAll() {
      return isAll(this.$route.params.type);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  background: #fff;
  .list-container {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
