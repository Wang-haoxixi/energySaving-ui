<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="类型：">
      <el-select v-model="form.searchType" placeholder="请选择类型" clearable>
        <el-option v-for="(v,k) in dictsMap.searchType" :key="k" :label="v" :value="k"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm, dictsMap } from "./options";
export default {
  name: "AdvanceSearch",
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
