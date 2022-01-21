<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="关键字">
        <el-input v-model="form.name" placeholder="请输入关键字进行搜索" clearable></el-input>
      </iep-form-item>
      <iep-form-item label-name="订单状态">
        <el-select v-model="form.orderStatus" placeholder="请选择订单状态" clearable>
          <el-option v-for="(v,k) in dictsMap.orderStatus" :key="k" :label="v" :value="k"></el-option>
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
import { dictsMap } from "../options";
const initForm = () => {
  return {
    name: "",
    orderStatus: "",
  };
};
export default {
  name: "SearchFilter",
  data() {
    return {
      dictsMap,
      form: initForm(),
    };
  },
  methods: {
    clearSearchParam() {
      this.form = initForm();
    },
    searchPage() {
      this.$emit("search-page", this.form);
    },
  },
};
</script>