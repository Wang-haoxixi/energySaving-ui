<template>
  <iep-basic-container>
    <iep-operation-container class="operation-container">
      <template slot="left">
        <!-- <iep-button>批量删除</iep-button> -->
        <iep-page-header title="人才库"></iep-page-header>
      </template>
      <template slot="right">
        <div class="mark">
          <el-dropdown class="org-dropdown">
            <span class="el-dropdown-link">
              {{markName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in markList"
                :key="index"
                @click.native="handleMarkSeach(item)"
              >{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <SearchForm @searchPage="searchPage"></SearchForm>
      </template>
    </iep-operation-container>
    <div class="content">
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="ColumnsMaps"
        :pagedTable="pagedTable"
        :dictsMap="dictsMap"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <template slot="realName" slot-scope="scope">
          <div class="realName" @click="handleDetail(scope.scope.row)">{{scope.scope.row.realName}}</div>
        </template>
        <iep-operation-table-btn-group :width="140" :options="personalOperationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </div>
    <!-- 邮件 -->
    <EmailTpl ref="email"></EmailTpl>
    <DialogJob ref="dialogJob"></DialogJob>
  </iep-basic-container>
</template>

<script>
import operationMixins from "@/mixins/operationMixins";
import mixins from "@/mixins/mixins";
import { getTalentPage, markTalent } from "@/api/admin/talent_pool";
import { inviteUserSo } from "@/api/admin/org";
import { ColumnsMaps, markList, dictsMap } from "./options";
import { mapGetters } from "vuex";
import EmailTpl from "../components/email/index";
import SearchForm from "./searchForm";
import DialogJob from "./DialogJob";
export default {
  mixins: [operationMixins, mixins],
  components: { SearchForm, EmailTpl, DialogJob },
  data() {
    return {
      dictsMap,
      ColumnsMaps,
      markList,
      markName: markList[0].name,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    personalOperationOptions() {
      return [
        {
          name: "直聊",
          func: this.handleCommunicate,
          hidden: false,
        },
        {
          name: "发送通知",
          func: this.handleEmail,
          hidden: false,
        },
        {
          name: "邀请加入组织",
          func: this.handleInviteSoUsers,
          hidden: false,
        },
        // {
        //   name: "加入花名册",
        //   func: this.handleUpdate,
        //   hidden: false,
        // },
        {
          name: "标记",
          func: this.handleMark,
          hidden: (row) => {
            return row.isMark === 1;
          },
        },
        {
          name: "取消标记",
          func: this.handleMark,
          hidden: (row) => {
            return row.isMark === 0;
          },
        },
      ];
    },
  },
  methods: {
    handleSelectionChange() {},
    loadPage(params = this.queryForm) {
      this.isLoadTable = false;
      this.loadTable(params, getTalentPage);
    },
    // 直聊
    handleCommunicate(row) {
      this.$refs["dialogJob"].targetId = row.userId;
      this.$refs["dialogJob"].loadPage();
      this.$refs["dialogJob"].dialogShow = true;
    },
    // 发送通知
    handleEmail(row) {
      this.$refs.email.open({ userId: row.userId, realName: row.realName });
    },
    // 邀请加入组织
    handleInviteSoUsers(row) {
      inviteUserSo({
        userId: row.userId,
        orgId: this.userInfo.orgId,
      }).then(({ data }) => {
        if (data) this.$message.success("邀请成功！");
      });
    },
    // 标记
    handleMark(row) {
      markTalent(row.userId).then(({ data }) => {
        if (data) {
          this.$message.success("操作成功！");
          this.loadPage();
        }
      });
    },
    // 根据标记搜索
    handleMarkSeach(row) {
      this.markName = row.name;
      this.queryForm.isMark = row.value;
      this.searchPage();
    },
    handleDetail(row) {
      this.$openPage(`/channel/styles/user/${row.userId}/index`, 2);
    },
  },
  created() {
    this.queryForm.orgId = this.userInfo.orgId;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.mark {
  cursor: pointer;
}
.realName {
  cursor: pointer;
  text-decoration: underline;
}
.operation-container ::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>
