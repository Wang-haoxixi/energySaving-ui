<template>
  <iep-basic-container class="router-box">
    <iep-wrapper title="订单">
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :loadFunction="getMyOrderPage"
        :isMutipleSelection="false"
        :isInitLoad="false"
        style="width:100%;"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch :orderType="orderType" @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <el-radio-group v-model="orderType" @change="handleChange">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="1">魔方</el-radio>
            <el-radio label="2">活动</el-radio>
            <el-radio label="3">课程</el-radio>
          </el-radio-group>
        </template>
        <!-- 实付款 -->
        <template #discount="{scope}">{{_templateDiscount(scope.row)}}</template>
        <!-- 应付款 -->
        <template #shouldPay="{scope}">{{_templateShouldPay(scope.row)}}</template>
        <!-- 原价 -->
        <template #price="{scope}">{{_templatePrice(scope.row)}}</template>
      </iep-crud-table>
    </iep-wrapper>
  </iep-basic-container>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import AdvanceSearch from "./Components/AdvanceSearch";
import {
  columnsMap,
  dictsMap,
  _templateDiscount,
  _templatePrice,
  _templateShouldPay,
} from "./options";
import { getMyOrderPage, cancelMyOrder, deleteMyOrder } from "@/api/fms/order";
export default {
  mixins: [operationMixins],
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      orderType: null,
      commonOptions: [],
      operationOptions: [
        {
          name: "详情",
          func: this.handleShow,
        },
        {
          name: "立即付款",
          func: this.handlePay,
          hidden: (row) => {
            return row.status !== "0";
          },
        },
        {
          name: "取消订单",
          func: this.handleCancel,
          hidden: (row) => {
            return !["0", "4"].includes(row.status);
          },
        },
        {
          name: "删除订单",
          func: this.handleDel,
          hidden: (row) => {
            return row.status !== "2";
          },
        },
      ],
      columnsMap,
      dictsMap,
    };
  },
  mounted() {
    this._setQueryForm();
    this.loadPage();
  },
  methods: {
    _templateDiscount,
    _templatePrice,
    _templateShouldPay,
    getMyOrderPage,
    handleDel(row) {
      this._handleComfirm(row.orderNumber, deleteMyOrder, "删除订单");
    },
    handleCancel(row) {
      this._handleComfirm(row.orderNumber, cancelMyOrder, "取消订单");
    },
    handleShow(row) {
      this.$openPage(`/my/index/order/${row.orderNumber}`);
    },
    handlePay(row) {
      this.$openPage(`/channel/order/${row.orderNumber}/pay`);
    },
    _setQueryForm() {
      this.$refs["CrudTable"].queryForm = {
        orderType: this.orderType,
      };
    },
    handleChange() {
      this._setQueryForm();
      this.$refs["CrudTable"].searchPage();
      this.$refs["CrudTable"].clearSearch();
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../router-box";
</style>
