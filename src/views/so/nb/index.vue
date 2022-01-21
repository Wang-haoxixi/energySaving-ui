<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :loadFunction="getOrgFlowPage"
        :is-mutiple-selection="false"
        searchName="remarks"
        placeholder="请输入备注进行搜索"
      >
        <template #iep-crud-left>
          <div>
            账户余额：
            <span class="num">{{account}}贝</span>
            <el-button
              v-if="hasSoNbZhuanzhang"
              class="btn"
              type="primary"
              icon="el-icon-sort"
              @click="handleTransfer()"
            >转账</el-button>
          </div>
        </template>
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <IepDialogTransferNb ref="IepDialogTransferNb" @load-page="refresh()"></IepDialogTransferNb>
  </div>
</template>
<script>
import { getOrgBalanceValuation } from "@/api/admin/org";
import AdvanceSearch from "./AdvanceSearch";
import { dictsMap, columnsMap } from "./options";
import { getOrgFlowPage } from "@/api/fms/flow";
import { mapGetters } from "vuex";
import { transactionSoAmount } from "@/api/fms/account";
import { hasPermissions } from "@/util/menu";
export default {
  components: {
    AdvanceSearch,
  },
  data() {
    return {
      account: 0,
      dictsMap,
      columnsMap,
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
    hasSoNbZhuanzhang() {
      return hasPermissions("so_nb_zhuanzhang");
    },
  },
  created() {
    this.loadAccount();
  },
  methods: {
    refresh() {
      this.loadAccount();
      this.loadPage();
    },
    getOrgFlowPage,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    async loadAccount() {
      const params = { type: 3, id: this.userInfo.orgId };
      const { data } = await getOrgBalanceValuation(params);
      this.account = data.balance;
    },
    handleTransfer() {
      this.$refs["IepDialogTransferNb"].组织转账个人();
      this.$refs["IepDialogTransferNb"].formRequestFn = transactionSoAmount;
      this.$refs["IepDialogTransferNb"].dialogShow = true;
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.num {
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  font-size: 18px;
  color: $--color-primary;
}
.btn {
  height: 36px;
}
</style>
