<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="代理商名称">
        <el-input v-model="form.objectName"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-operation-wrapper>
          <el-button type="primary" @click="searchPage">搜索</el-button>
          <iep-button @click="clearSearchParam">清空</iep-button>
        </iep-operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from "./option";
export default {
  data() {
    return {
      form: initSearchForm(),
    };
  },
  computed: {},
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created() {},
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
      this.$emit("clear-search-param");
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

