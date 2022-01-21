<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="难度选择：">
      <iep-dict-select v-model="form.level" placeholder="请选择" :dict-name="'exam_difficulty'"></iep-dict-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm, dictsMap } from "../../../../const/options";
export default {
  name: "AdvanceSearch",
  data() {
    return {
      dictsMap,
      form: initSearchForm(),
    };
  },
  computed: {},
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
