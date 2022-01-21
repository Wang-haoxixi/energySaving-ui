<template>
  <el-form :model="form" label-width="120px" label-position="top">
    <el-form-item label="参数名称：">
      <el-input v-model.trim="form.publicName" clearable></el-input>
    </el-form-item>
    <el-form-item label="作用：" prop="system">
      <IepDictsMapSelect v-model="form.system" :dictsMap="dictsMap.system"></IepDictsMapSelect>
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
