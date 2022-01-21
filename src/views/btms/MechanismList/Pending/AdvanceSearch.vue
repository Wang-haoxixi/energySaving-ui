<template>
  <el-form class="form" :model="form" label-width="120px" label-position="top">
    <el-form-item label="申请对象：">
      <el-input v-model="form.applyUserId"></el-input>
    </el-form-item>
    <el-form-item label="机构分类：">
      <el-select v-model="form.type">
        <el-option v-for="(v,k) in dictsMap.type" :key="k+v" :label="v" :value="+k"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-operation-wrapper>
        <el-button type="primary" @click="searchPage">搜索</el-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </iep-operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap, initSearchForm } from "../options";
export default {
  data() {
    return {
      dictsMap,
      form: initSearchForm(),
    };
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
  },
};
</script>
<style scoped>
.form >>> .el-select {
  width: 100%;
}
.form >>> .el-cascader {
  width: 100%;
}
</style>

