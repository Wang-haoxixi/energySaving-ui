<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="关键词：">
      <el-input v-model.trim="form.name" placeholder="请输入关键词进行搜索" clearable></el-input>
    </el-form-item>
    <el-form-item label="订单状态：">
      <el-select v-model="form.orderStatus" placeholder="请选择订单状态进行搜索">
        <el-option
          v-for="item in orderStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm, orderStatus } from "../options";

export default {
  data() {
    return {
      form: initSearchForm(),
      orderStatus,
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
