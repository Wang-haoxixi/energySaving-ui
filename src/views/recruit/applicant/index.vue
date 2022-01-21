<template>
  <iep-basic-container>
    <iep-page-header title="申请人管理"></iep-page-header>
    <iep-operation-container class="operation-container">
      <template slot="left">
        <iep-tabs v-model="tabName" :tab-list="tabList" @tab-click="tabClick"></iep-tabs>
      </template>
      <template slot="right">
        <SearchForm @searchPage="searchPage"></SearchForm>
      </template>
    </iep-operation-container>
    <div class="content">
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="getColumns"
        :pagedTable="pagedTable"
        :dictsMap="dictsMap"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        @selection-change="handleSelectionChange"
        is-mutiple-selection
      >
        <template slot="realName" slot-scope="scope">
          <div
            class="realName"
            @click="handleRealName(scope.scope.row)"
          >{{scope.scope.row.realName}}</div>
        </template>
        <template slot="name" slot-scope="scope">
          <div>{{transformString(scope.scope.row.name)}}</div>
        </template>
        <template slot="matchingDegree" slot-scope="scope">
          <div>{{`${scope.scope.row.matchingDegree}%`}}</div>
        </template>
        <template slot="isCheck" slot-scope="scope">
          <div v-if="scope.scope.row.status === '3'">不合适</div>
          <div v-else-if="scope.scope.row.isCheck === '0'">未查看</div>
          <div v-else>已查看</div>
        </template>
        <iep-operation-table-btn-group :width="140" :options="personalOperationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </div>
    <!-- 邮件 -->
    <EmailTpl ref="email"></EmailTpl>
    <!-- 申请信息 -->
    <PartnerDetailDialog ref="partnerInfo"></PartnerDetailDialog>
  </iep-basic-container>
</template>

<script>
import operationMixins from "@/mixins/operationMixins";
import mixins from "@/mixins/mixins";
import appMixins from "./appMixins";
import SearchForm from "./searchForm";
import { mapGetters } from "vuex";
import {
  tabList,
  positionTableColumns,
  partnerTableColumns,
  dictsMap,
} from "./options";
import { deleteByAdmin } from "@/api/dms/recruit_operation";
import { getSoApplyUserPage } from "@/api/dms/recruit_query";
import EmailTpl from "../components/email/index";
import PartnerDetailDialog from "./partnerDetailDialog";

export default {
  mixins: [operationMixins, mixins, appMixins],
  components: { SearchForm, EmailTpl, PartnerDetailDialog },
  data() {
    return {
      tabName: tabList[0].value,
      tabList,
      positionTableColumns, // 职位
      partnerTableColumns, // 合伙人
      dictsMap,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    loadPage(params = this.queryForm) {
      this.isLoadTable = false;
      this.loadTable(
        Object.assign({}, params, this.queryForm),
        getSoApplyUserPage,
      );
    },
    // 删除投递
    handleDelete(row) {
      const data = {
        applyObj: [
          {
            applyId: row.applyId,
            type: row.type,
          },
        ],
        orgId: this.userInfo.orgId,
      };
      this._handleComfirm(data, deleteByAdmin, "删除该申请");
    },
  },
  created() {
    this.queryForm.orgId = this.userInfo.orgId;
    this.queryForm.isCheck = "all";
    this.queryForm.recruitType = this.tabList[0].type;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.operation-container {
  margin-bottom: 0;
  &::v-deep > div {
    align-items: normal;
  }
}
.realName {
  text-decoration: underline;
  cursor: pointer;
}
</style>
