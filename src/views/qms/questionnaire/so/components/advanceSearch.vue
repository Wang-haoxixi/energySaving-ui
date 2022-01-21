<template>
  <el-form :model="form" label-width="120px" label-position="top">
    <iep-form-item label-name="问卷名称">
      <el-input placeholder="问卷名称" v-model.trim="form.name" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="创建人">
      <el-input placeholder="创建人" v-model.trim="form.userName" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="问卷范围" prop="range">
      <el-select v-model="form.scope" clearable placeholder="请选择" style="width: 100%;">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in rangeData"
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
import { statusDicAll } from "../../manage/const/const";
export default {
  data() {
    return {
      statusDic: statusDicAll,
      form: {
        name: "",
        userName: "",
        status: "",
        scope: "",
      },
      rangeData: [
        {
          label: "生态开放",
          value: 1,
        },
        {
          label: "组织内开放",
          value: 2,
        },
        // {
        //   label: "指定人群",
        //   value: "3",
        // },
      ],
    };
  },
  methods: {
    initSearchForm() {
      this.form.name = "";
      this.form.status = "";
      this.form.scope = "";
      this.form.userName = "";
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
