<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="考试范围">
        <el-select v-model="form.openScope" clearable>
          <el-option :key="1" label="组织内发布" :value="1"></el-option>
          <el-option :key="2" label="生态发布" :value="2"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="审核状态">
        <el-select v-model="form.audit" clearable>
          <el-option :key="1" label="已通过" :value="1"></el-option>
          <el-option :key="2" label="被下架" :value="2"></el-option>
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
export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {},
  created() {},
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = {};
      this.$emit("clear-search-param");
    },
    clear() {},
  },
};
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

