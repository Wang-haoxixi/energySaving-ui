<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name">
        <div v-if="isPlatform" class="rule-config">
          <!-- <span class="label">当前平台分成比例：{{paramForm.publicValue}}%</span> -->
          <el-link type="primary" @click="handleConfig()">规则配置</el-link>
        </div>
      </iep-page-header>

      <iep-operation-container>
        <template slot="left">
          <el-radio-group v-model="type" @change="handleChange">
            <el-radio-button label="1">宝贝交易</el-radio-button>
            <el-radio-button label="2">人民币交易</el-radio-button>
          </el-radio-group>
        </template>
      </iep-operation-container>

      <div class="data-statistics">
        <IepDataItem class="item" :value="statisticsForm.totalAmount" label="总交易数"></IepDataItem>
        <IepDataItem class="item" :value="statisticsForm.receivedAmount" label="已转入组织账户数 "></IepDataItem>
        <IepDataItem class="item" :value="statisticsForm.pendingAmount" label="待转入组织账户数 "></IepDataItem>
        <IepDataItem class="item" :value="statisticsForm.platformAmount" label="平台收取数"></IepDataItem>
        <IepDataItem v-if="type==2" class="item" :value="statisticsForm.freezeAmount" label="冻结金额"></IepDataItem>
      </div>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :loadFunction="getOrderCenterSettlePage"
        :isMutipleSelection="false"
        :isInitLoad="false"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <el-radio-group v-model="orderType" @change="handleChange">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="1">魔方</el-radio>
            <el-radio label="2">活动</el-radio>
          </el-radio-group>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <ParamDialogForm ref="ParamDialogForm" @load-page="onParamFinish()"></ParamDialogForm>
  </div>
</template>
<script>
import AdvanceSearch from "./AdvanceSearch";
import {
  mulColumnsMap,
  typeMap,
  dictsMap,
  initParamForm,
  initStatisticsForm,
} from "./options";
import {
  getOrderCenterSettlePageByType,
  getOrderCenterStatisticsByType,
  getFmsParamConfig,
} from "@/api/fms/order";
import { mapGetters } from "vuex";
import ParamDialogForm from "./ParamDialogForm";

export default {
  components: { ParamDialogForm, AdvanceSearch },
  data() {
    return {
      type: "1",
      orderType: null,
      commonOptions: [],
      operationOptions: [
        {
          name: "查看",
          func: this.handleShow,
        },
      ],
      dictsMap,
      paramForm: initParamForm(),
      statisticsForm: initStatisticsForm(),
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
      return mulColumnsMap(this.isPlatform, this.type);
    },
    getOrderCenterSettlePage() {
      const suffer = typeMap[this.currentMenuGroup.id];
      return getOrderCenterSettlePageByType(suffer);
    },
    getOrderCenterStatistics() {
      const suffer = typeMap[this.currentMenuGroup.id];
      return getOrderCenterStatisticsByType(suffer);
    },
  },
  created() {
    this.type = this.$route.query.type ?? "1";
    this.orderType = this.$route.query.orderType ?? null;
  },
  mounted() {
    this.loadParam();
    this.loadStatistic();
    this._setQueryForm();
    this.$refs["CrudTable"].searchPage();
    this.$refs["CrudTable"].clearSearch();
  },
  methods: {
    handleShow(row) {
      this.$openPage(`${this.prefixUrl}/order_detail/${row.orderId}`);
    },
    _setQueryForm() {
      this.$refs["CrudTable"].queryForm = {
        type: this.type,
        orderType: this.orderType,
      };
    },
    handleChange() {
      this._setQueryForm();
      this.$refs["CrudTable"].searchPage();
      this.$refs["CrudTable"].clearSearch();
      this.loadStatistic();
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    onParamFinish() {
      this.loadParam();
      this.loadPage();
    },
    async loadParam() {
      const { data } = await getFmsParamConfig();
      this.paramForm = this.$mergeByFirst(initParamForm(), data);
      // const { data } = await getParamById(8);
      // this.paramForm = this.$mergeByFirst(initParamForm(), data);
    },
    async loadStatistic() {
      const { data } = await this.getOrderCenterStatistics({
        type: this.type,
        orderType: this.orderType,
      });
      this.statisticsForm = this.$mergeByFirst(initStatisticsForm(), data);
    },
    handleConfig() {
      this.$refs["ParamDialogForm"].form = this.paramForm;
      this.$refs["ParamDialogForm"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.rule-config {
  font-size: 14px;
  display: flex;
  .label {
    font-size: 14px;
    margin-right: 20px;
  }
}
.data-statistics {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  margin-bottom: 20px;
  .item {
    width: 100%;
  }
}
</style>
