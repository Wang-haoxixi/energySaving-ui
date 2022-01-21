<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :loadFunction="getRefundPage"
        :isMutipleSelection="false"
        :isInitLoad="false"
        searchName="orderNumber"
        placeholder="请输入订单编号进行搜索"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch :orderType="orderType" @search-page="handleSearch"></AdvanceSearch>
        </template>
        <!-- 原价 -->
        <template #originalPrice="{scope}">{{scope.row.originalPrice}}{{_templateUnit(scope.row)}}</template>
        <!-- 实付 -->
        <template #finalPrice="{scope}">{{scope.row.finalPrice}}{{_templateUnit(scope.row)}}</template>
        <!-- 扣取手续费 -->
        <template #deductedAmount="{scope}">{{scope.row.deductedAmount}}{{_templateUnit(scope.row)}}</template>
        <!-- 退款金额 -->
        <template #refundAmount="{scope}">{{scope.row.refundAmount}}{{_templateUnit(scope.row)}}</template>
        <template #iep-crud-left>
          <el-radio-group v-model="orderType" @change="handleChange">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="1">魔方</el-radio>
            <el-radio label="2">活动</el-radio>
          </el-radio-group>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import AdvanceSearch from "../order/AdvanceSearch";
import { mulColumnsMap, typeMap, dictsMap } from "./options";
import { getRefundPageByType } from "@/api/fms/refund";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  components: {
    AdvanceSearch,
  },
  data() {
    return {
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
    getRefundPage() {
      const suffer = typeMap[this.currentMenuGroup.id];
      return getRefundPageByType(suffer);
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
    _templateUnit(row) {
      if (row.refundType == 1) {
        return "贝";
      } else {
        return "元";
      }
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
