<template>
  <div class="talent-pool-list">
    <SearchTpl class="search" @search="handleSearch"></SearchTpl>
    <ListTpl class="list" ref="list" :orgId="orgId"></ListTpl>
  </div>
</template>

<script>
import SearchTpl from "./search";
import ListTpl from "./list";
export default {
  props: ["orgId"],
  components: { SearchTpl, ListTpl },
  methods: {
    handleSearch(row) {
      this.$refs.list.searchData(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.talent-pool-list {
  background-color: $--background-color;
  .search {
    margin-bottom: 20px;
  }
}
</style>