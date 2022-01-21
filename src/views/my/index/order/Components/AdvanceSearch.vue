<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <iep-form-item label-name="商品名称">
      <el-input v-model.trim="form.goods" placeholder="请输入商品名称" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="订单号">
      <el-input v-model.trim="form.orderNumber" placeholder="请输入订单号" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="类型" v-if="orderType">
      <IepDictSelect v-model="form.secondType" :dictName="secondTypeDictName"></IepDictSelect>
    </iep-form-item>
    <iep-form-item label-name="订单状态">
      <el-select v-model="form.status" placeholder="请选择订单状态" clearable>
        <el-option v-for="(v,k) in dictsMap.searchStatus" :key="k" :label="v" :value="k"></el-option>
      </el-select>
    </iep-form-item>
    <iep-form-item label-name="创建时间">
      <iep-date-picker v-model="form.dateRange" type="daterange" clearable></iep-date-picker>
    </iep-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage()">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap, valueMapChild } from "@/views/fms/order/options";
import { initSearchForm } from "../options";
export default {
  name: "AdvanceSearch",
  props: ["orderType"],
  data() {
    return {
      dictsMap,
      form: initSearchForm(),
    };
  },
  computed: {
    secondTypeDictName() {
      return valueMapChild[this.orderType];
    },
  },
  methods: {
    searchPage() {
      const form = { ...this.form };
      form.beginTime = form.dateRange[0];
      form.endTime = form.dateRange[1];
      delete form.dateRange;
      this.$emit("search-page", form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
  },
};
</script>
