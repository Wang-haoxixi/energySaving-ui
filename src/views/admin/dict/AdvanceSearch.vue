<template>
  <el-form class="iep-form-detail" :model="form" label-width="85px" label-position="top">
    <el-form-item label="字典名称：">
      <el-input v-model.trim="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="字典编码：">
      <el-input v-model.trim="form.code" clearable></el-input>
    </el-form-item>
    <el-form-item label="系统名称：">
      <el-input v-model.trim="form.system" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm } from "./options";
export default {
  data() {
    return {
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
