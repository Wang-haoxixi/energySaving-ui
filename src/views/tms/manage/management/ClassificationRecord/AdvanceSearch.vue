<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="标签名称">
        <el-input v-model="form.name" clearable></el-input>
      </iep-form-item>
      <iep-form-item label-name="标签属性">
        <el-select v-model="form.type" clearable placeholder="请选择">
          <el-option key="0" label="游离词" :value="'游离词'"></el-option>
          <el-option key="1" label="中心词" :value="'中心词'"></el-option>
          <el-option key="2" label="卫星词" :value="'卫星词'"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="归入标签">
        <el-input v-model="form.fallName" clearable></el-input>
      </iep-form-item>
      <iep-form-item label-name="合并标签">
        <el-input v-model="form.mergeName" clearable></el-input>
      </iep-form-item>
      <!-- <el-form-item label="记录时间：">
        <el-date-picker v-model="form.createTime" type="date" placeholder="请选择记录时间"   value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label>
        <el-button type="primary" @click="searchPage">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export const initSearchForm = () => {
  return {
    tagName: "",
    type: "",
    fallName: "",
    mergeName: "",
  };
};
export default {
  data() {
    return {
      form: {
        tagName: "",
        type: "",
        fallName: "",
        mergeName: "",
      },
      isLoading: true,
    };
  },
  computed: {},
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
::v-deep .el-select {
  width: 100%;
}
</style>

