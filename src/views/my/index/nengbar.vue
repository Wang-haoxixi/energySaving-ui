<template>
  <iep-basic-container class="router-box">
    <iep-wrapper title="宝贝">
      <div class="table-wrapper">
        <iep-crud-table
          ref="CrudTable"
          :dictsMap="dictsMap"
          :columnsMap="columnsMap"
          :loadFunction="getPersonFlowPage"
          :is-mutiple-selection="false"
          :isCrudSearch="false"
        >
          <template #iep-crud-left>
            <div>
              账户余额：
              <span class="num">{{account}}</span>
              <el-button class="btn" type="primary" icon="el-icon-sort" @click="handleTransfer()">转账</el-button>
              <el-button class="btn" @click="$openPage('/channel/valuation')">估值</el-button>
            </div>
          </template>
        </iep-crud-table>
      </div>
      <IepDialogTransferNb ref="IepDialogTransferNb" @load-page="loadPage()"></IepDialogTransferNb>
    </iep-wrapper>
  </iep-basic-container>
</template>
<script>
import { dictsMap, columnsMap } from "@/views/so/nb/options";
import { getPersonFlowPage } from "@/api/fms/flow";
import { getAccountBalance, transactionAmount } from "@/api/fms/account";
export default {
  data() {
    return {
      account: 0,
      dictsMap,
      columnsMap,
    };
  },
  created() {
    this.loadAccount();
  },
  methods: {
    getPersonFlowPage,
    handleTransfer() {
      this.$refs["IepDialogTransferNb"].个人转账个人();
      this.$refs["IepDialogTransferNb"].formRequestFn = transactionAmount;
      this.$refs["IepDialogTransferNb"].dialogShow = true;
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
      this.loadAccount();
    },
    async loadAccount() {
      const { data } = await getAccountBalance();
      this.account = data ?? 0;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./router-box";
.num {
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  font-size: 18px;
  color: $--color-primary;
}
.table-wrapper {
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
}
.router-box ::v-deep .title-wrapper {
  padding-bottom: 0;
}
.btn {
  height: 36px;
}
</style>
