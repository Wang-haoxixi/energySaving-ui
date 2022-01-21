<template>
  <div class="search-input">
    <el-input placeholder="查找人" suffix-icon="el-icon-search" v-model="searchText" clearable></el-input>
    <div v-if="searchText" class="label">搜索结果如下：</div>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      visable: false,
      searchText: "",
    };
  },
  created() {
    this.$watch(
      "searchText",
      debounce(newQuery => {
        this.$emit("on-search", newQuery);
      }, 200),
    );
  },
};
</script>
<style lang="scss" scoped>
.search-input {
  padding: 8px 0;
}
.label {
  margin-top: 10px;
  color: #72767b;
}
</style>
