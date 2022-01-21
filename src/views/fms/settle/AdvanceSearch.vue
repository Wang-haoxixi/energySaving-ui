<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <iep-form-item label-name="订单号">
      <el-input v-model.trim="form.orderNumber" placeholder="请输入订单号" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="流水单号">
      <el-input v-model.trim="form.paymentNumber" placeholder="请输入流水单号" clearable></el-input>
    </iep-form-item>
    <iep-form-item v-if="isPlatform" label-name="所属组织">
      <el-input v-model.trim="form.orgName" placeholder="请输入所属组织" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="交易日期">
      <iep-date-picker v-model="form.订单交易时间" type="daterange" clearable></iep-date-picker>
    </iep-form-item>
    <iep-form-item label-name="发放日期">
      <iep-date-picker v-model="form.发放时间" type="daterange" clearable></iep-date-picker>
    </iep-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { initSearchForm } from "./options";
import { mapGetters } from "vuex";
export default {
  name: "AdvanceSearch",
  data() {
    return {
      form: initSearchForm(),
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
  },
  methods: {
    searchPage() {
      const form = { ...this.form };
      form.beginTime = form.订单交易时间[0];
      form.endTime = form.订单交易时间[1];
      delete form.订单交易时间;
      form.startTime = form.发放时间[0];
      form.stopTime = form.发放时间[1];
      delete form.发放时间;
      this.$emit("search-page", form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
  },
};
</script>
