<template>
  <div class="search-box">
    <Search ref="Search" @search="hanldeSearch"></Search>
  </div>
</template>
<script>
import Search from "./Components/Search";
export default {
  components: {
    Search,
  },
  mounted() {
    this.loadTypeKeyword();
  },
  methods: {
    hanldeSearch(form) {
      // this.$router.push({
      //   path: "/channel/global_search",
      //   query: form,
      // });
      this.$router.replace({
        query: { ...form, random: Math.random() },
      });
    },
    loadTypeKeyword() {
      this.$refs["Search"].keyword = this.$route.query.keyword || "";
      this.$refs["Search"].type = this.$route.query.type || "";
    },
  },
  watch: {
    $route: {
      handler: function() {
        this.loadTypeKeyword();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.search-box {
  margin: 30px auto;
  text-align: center;
}
</style>
