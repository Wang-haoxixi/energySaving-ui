<template>
  <div class="search-header" :class="show?'show':'hide'">
    <Search ref="Search" class="search" @search="hanldeSearch"></Search>
  </div>
</template>
<script>
import Search from "./Components/Search";
export default {
  name: "SearchHeader",
  components: {
    Search,
  },
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.__vueClickOutside__ = document.addEventListener("click", e => {
      if (e.clientY > 266) {
        this.show = false;
      }
    });
  },
  destroyed() {
    document.removeEventListener("click", this.__vueClickOutside__);
    delete this.__vueClickOutside__;
  },
  methods: {
    hanldeSearch(form) {
      this.$router.push({
        path: "/channel/global_search",
        query: form,
      });
      this.close();
      this.$refs["Search"].focus();
    },
    close() {
      this.show = false;
    },
  },
  watch: {
    show(n) {
      if (n) {
        this.$refs["Search"].focus();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search-header {
  transition: height 0.3s;
  width: 100%;
  height: 150px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 3px 4px $--background-color;
  text-align: center;
  position: absolute;
  top: 64px;
  .search {
    margin: 30px 0;
    display: flow-root;
  }
}
.show {
  height: 200px;
}
.hide {
  height: 0;
}
</style>
