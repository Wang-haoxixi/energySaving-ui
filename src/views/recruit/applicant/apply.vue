<template>
  <iep-basic-container>
    <iep-page-header :title="title" :backOption="backOption"></iep-page-header>
    <iep-operation-container class="operation-container">
      <template slot="left"></template>
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
import { positionTableColumns, partnerTableColumns, dictsMap } from "./options";
import { deleteByAdmin } from "@/api/dms/recruit_operation";
import { getApplyUserPage } from "@/api/dms/recruit_query";
import EmailTpl from "../components/email/index";
import PartnerDetailDialog from "./partnerDetailDialog";

export default {
  mixins: [operationMixins, mixins, appMixins],
  components: { SearchForm, EmailTpl, PartnerDetailDialog },
  data() {
    return {
      title: "",
      tabName: "position",
      positionTableColumns, // 职位
      partnerTableColumns, // 合伙人
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1);
        },
      },
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
        getApplyUserPage,
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
    const route = this.$route;
    this.queryForm.recruitId = route.params.id;
    this.title = route.query.title;
    this.tabName = route.query.type;
    this.queryForm.isCheck = "all";
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.operation-container {
  &::v-deep > div {
    align-items: normal;
  }
}
.realName {
  text-decoration: underline;
  cursor: pointer;
}
</style>
