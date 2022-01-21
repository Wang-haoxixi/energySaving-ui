<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="考生姓名：">
      <el-input v-model.trim="form.realName" placeholder="请输入考试名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select v-model="form.sort" placeholder="请选择">
        <el-option
          v-for="item in sortOptions"
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
import { initSearchForm, sortOptions } from "./options";
export default {
  data() {
    return {
      sortOptions,
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
