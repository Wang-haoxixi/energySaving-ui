<template>
  <el-form :model="form" label-width="120px" label-position="top">
    <iep-form-item label-name="问卷名称">
      <el-input placeholder="问卷名称" v-model.trim="form.name" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="创建人">
      <el-input placeholder="创建人" v-model.trim="form.createUserName" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="所属组织">
      <el-input placeholder="所属组织" v-model.trim="form.orgName" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="问卷状态">
      <el-select v-model="form.status" clearable placeholder="请选择" style="width: 100%;">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in statusDic"
          :key="item.value"
        ></el-option>
      </el-select>
    </iep-form-item>
    <el-form-item>
      <iep-operation-wrapper>
        <el-button type="primary" @click="searchPage">搜索</el-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </iep-operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { statusDic } from "../const/const";
export default {
  data() {
    return {
      statusDic,
      form: {
        name: "",
        status: "",
        createUserName: "",
        orgName: "",
      },
    };
  },
  methods: {
    initSearchForm() {
      this.form.name = "";
      this.form.status = "";
      this.form.createUserName = "";
      this.form.orgName = "";
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
