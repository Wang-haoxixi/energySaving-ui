<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="考生姓名：">
      <el-input v-model.trim="form.name" placeholder="请输入考生姓名" clearable></el-input>
    </el-form-item>
    <el-form-item label="成绩状态：">
      <el-select v-model="form.result" placeholder="请选择成绩状态" clearable>
        <el-option
          v-for="item in resultOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select v-model="form.sort" placeholder="请选择排序方式" clearable>
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="人员选择：">
      <el-select v-model="form.isSo" placeholder="请选择人员选择" clearable>
        <el-option
          v-for="item in isSoOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage()">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  initSearchForm,
  resultOptions,
  sortOptions,
  isSoOptions,
} from "./options";
export default {
  data() {
    return {
      resultOptions,
      sortOptions,
      isSoOptions,
      propTreeMenu: {},
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
