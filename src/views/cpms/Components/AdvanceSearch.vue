<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <iep-form-item label-name="产品名称">
      <el-input v-model.trim="form.name" placeholder="请输入产品名称" clearable></el-input>
    </iep-form-item>
    <iep-form-item v-if="isSearchOrg" label-name="所属组织">
      <el-input v-model.trim="form.orgName" placeholder="请输入组织所属" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="类型">
      <el-select v-model="form.type" placeholder="请选择类型" clearable>
        <el-option v-for="(v,k) in dictsMap.type" :key="k" :label="v" :value="k"></el-option>
      </el-select>
    </iep-form-item>
    <iep-form-item label-name="认证状态">
      <el-select v-model="form.certificationStatus" placeholder="请选择认证状态" clearable>
        <el-option v-for="(v,k) in dictsMap.certificationStatus" :key="k" :label="v" :value="k"></el-option>
      </el-select>
    </iep-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm, dictsMap } from "../options";
export default {
  props: {
    isSearchOrg: {
      type: Boolean,
      default: false,
    },
  },
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
