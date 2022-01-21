<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :loadFunction="getOrderCenterPage"
        :isMutipleSelection="false"
        :isInitLoad="false"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch :orderType="orderType" @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <el-radio-group v-model="orderType" @change="handleChange">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="1">魔方</el-radio>
            <el-radio label="2">活动</el-radio>
          </el-radio-group>
        </template>
        <template #secondType="{scope}">
          <div>{{ calculateDict(scope)}}</div>
        </template>
        <!-- 原价 -->
        <template #price="{scope}">{{_templatePrice(scope.row)}}</template>
        <!-- 打折 -->
        <template #discount="{scope}">{{_templateDiscount(scope.row)}}</template>
        <!-- 实付 -->
        <template #shouldPay="{scope}">{{_templateShouldPay(scope.row)}}</template>
      </iep-crud-table>
    </iep-basic-container>
    <RemarkDialogForm ref="RemarkDialogForm" @load-page="loadPage()"></RemarkDialogForm>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import AdvanceSearch from "./AdvanceSearch";
import { mulColumnsMap, typeMap, dictsMap, calculateDict } from "./options";
import {
  _templateDiscount,
  _templatePrice,
  _templateShouldPay,
} from "@/views/my/index/order/options";
import {
  getOrderCenterPageByType,
  cancelOrder,
  confirmStatusOrder,
  revertStatusOrder,
} from "@/api/fms/order";
import { mapGetters } from "vuex";
import RemarkDialogForm from "./RemarkDialogForm";
export default {
  mixins: [operationMixins],
  components: {
    RemarkDialogForm,
    AdvanceSearch,
  },
  data() {
    return {
      calculateDict,
      orderType: null,
      dictsMap,
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
    prefixUrl() {
      return this.isPlatform ? "/fms" : "/so_fms";
    },
    columnsMap() {
      return mulColumnsMap(this.isPlatform);
    },
    getOrderCenterPage() {
      const suffer = typeMap[this.currentMenuGroup.id];
      return getOrderCenterPageByType(suffer);
    },
    operationOptions() {
      return [
        {
          name: "查看",
          func: this.handleShow,
        },
        {
          name: "备注",
          func: this.handleRemark,
        },
        {
          name: "关闭订单",
          func: this.handleCancel,
          hidden: (row) => {
            return !this.isPlatform || row.status !== "0";
          },
        },
        {
          name: "确认收款",
          func: this.handleConfirm,
          hidden: (row) => {
            return !(
              this.isPlatform &&
              row.status === "4" &&
              row.paymentMethod === "9"
            );
          },
        },
        {
          name: "撤销收款",
          func: this.handleCancelConfirm,
          hidden: (row) => {
            return !(
              this.isPlatform &&
              row.status === "1" &&
              row.paymentMethod === "9"
            );
          },
        },
      ];
    },
  },
  created() {
    this.orderType = this.$route.query.orderType ?? null;
  },
  mounted() {
    this._setQueryForm();
    this.$refs["CrudTable"].searchPage();
    this.$refs["CrudTable"].clearSearch();
  },
  methods: {
    _templateDiscount,
    _templatePrice,
    _templateShouldPay,
    handleCancel(row) {
      this._handleComfirm(row.orderNumber, cancelOrder, "关闭订单");
    },
    handleConfirm(row) {
      this._handleComfirm(row.orderNumber, confirmStatusOrder, "确认收款");
    },
    handleCancelConfirm(row) {
      this._handleComfirm(row.orderNumber, revertStatusOrder, "撤销收款");
    },
    handleRemark(row) {
      this.$refs["RemarkDialogForm"].orderNumber = row.orderNumber;
      this.$refs["RemarkDialogForm"].form.remarks = row.remarks;
      this.$refs["RemarkDialogForm"].dialogShow = true;
    },
    handleShow(row) {
      this.$openPage(`${this.prefixUrl}/order_detail/${row.orderId}`);
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
