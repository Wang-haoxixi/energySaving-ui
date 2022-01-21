<template>
  <el-form :model="form" label-width="120px" label-position="top">
    <el-form-item label="问卷名称:">
      <el-input placeholder="问卷名称" v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="问卷状态:">
      <el-select v-model="form.status" clearable placeholder="请选择" style="width: 100%;">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in statusDic"
          :key="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-operation-wrapper style="    text-align: center;">
        <el-button type="primary" @click="searchPage">搜索</el-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </iep-operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { statusDic } from "../const/options";
export default {
  data() {
    return {
      statusDic,
      form: {
        name: "",
        status: "",
      },
    };
  },
  methods: {
    initSearchForm() {
      this.form.name = "";
      this.form.status = "";
    },
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.initSearchForm();
      this.$emit("clear-search-param");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
