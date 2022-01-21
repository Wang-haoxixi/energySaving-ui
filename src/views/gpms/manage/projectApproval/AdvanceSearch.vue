<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="审批状态">
        <el-select v-model="form.projectStatus" placeholder="请选择审批状态" clearable>
          <el-option v-for="(v,k) in dictsMap.projectStatus" :key="k" :label="v" :value="+k"></el-option>
        </el-select>
      </iep-form-item>
      <el-form-item>
        <iep-operation-wrapper>
          <el-button type="primary" @click="searchPage">搜索</el-button>
          <iep-button @click="clearSearchParam">清空</iep-button>
        </iep-operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm, dictsMap } from "./option.ts";
export default {
  data() {
    return {
      form: initSearchForm(),
      dictsMap,
    };
  },
  computed: {},
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created() {},
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
      this.$emit("clear-search-param");
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

