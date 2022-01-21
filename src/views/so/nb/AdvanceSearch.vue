<template>
  <el-form label-position="top" class="iep-form-detail" :model="form" label-width="80px">
    <iep-form-item label-name="备注">
      <el-input v-model.trim="form.remarks" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="交易项">
      <IepDictSelect v-model="form.category" dictName="fms_block_chain_flow" clearable></IepDictSelect>
    </iep-form-item>
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
