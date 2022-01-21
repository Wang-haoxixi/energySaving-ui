<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="日志详情：">
      <el-input v-model.trim="form.title" placeholder="请输入日志详情" clearable></el-input>
    </el-form-item>
    <el-form-item label="事件类型：">
      <IepDictSelect v-model="form.type" dictName="so_log_event_type" clearable></IepDictSelect>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage()">搜索</el-button>
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
