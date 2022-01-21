<template>
  <iep-basic-container class="table-list">
    <iep-page-header title="职位列表"></iep-page-header>
    <iep-operation-container>
      <template slot="left">
        <el-dropdown size="medium" class="button-box">
          <el-button type="primary" class="button">
            <i class="el-icon-woneng-jiahao"></i>
            新增
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleCreate('Job')">职位</el-dropdown-item>
            <el-dropdown-item @click.native="handleCreate('Partner')">合伙人</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <iep-button class="button" @click="handleRefresh">
          <!-- <i class="el-icon-woneng-shuaxin"></i> -->
          刷新
        </iep-button>
      </template>
      <template slot="right">
        <SearchForm @searchPage="searchPage"></SearchForm>
      </template>
    </iep-operation-container>
    <div class="content">
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        isMutipleSelection
        @selection-change="selectionChange"
      >
        <template slot="name" slot-scope="scope">
          <div>{{transformString(scope.scope.row.name)}}</div>
        </template>
        <template slot="deliveryNum" slot-scope="scope">
          <div
            class="deliveryNum"
            @click="handleDetailById(scope.scope.row)"
          >{{`共${scope.scope.row.deliveryNum}份，未读${scope.scope.row.notCheckNum}份`}}</div>
        </template>
        <IepOperationTableBtnGroup :options="operationOptions" label="操作" :width="140"></IepOperationTableBtnGroup>
      </iep-table>
    </div>
    <!-- 分享 -->
    <ShareDialog ref="share"></ShareDialog>
  </iep-basic-container>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
import { columnsMap, dictsMap, initSearchForm } from "./options";
import {
  getRecruitPageByOrgId,
  stopRecruitById,
  restartRecruitById,
  topRecruitById,
  refreshRecruitById,
} from "@/api/dms/recruit";
import ShareDialog from "../components/share/index";
import SearchForm from "./searchForm";
import { transformString } from "@/util/dataDeal";

export default {
  mixins: [mixins, operationMixins],
  components: { ShareDialog, SearchForm },
  data() {
    return {
      dictsMap,
      columnsMap,
      operationOptions: [
        {
          name: "停止",
          func: this.handleStopRecruit,
          hidden: row => {
            return !(row.state === "0");
          },
        },
        {
          name: "重启",
          func: this.handleRestartRecruit,
          hidden: row => {
            return !(row.state === "1");
          },
        },
        {
          name: "编辑",
          func: this.handleUpdate,
          hidden: row => {
            return !(row.state === "0");
          },
        },
        // {
        //   name: "分享",
        //   func: this.handleShare,
        //   hidden: false,
        // },
        {
          name: "置顶",
          func: this.handleTop,
          hidden: false,
        },
        // {
        //   name: "删除",
        //   func: this.handleDelete,
        //   hidden: false,
        // },
      ],
      selectList: [],
      searchForm: initSearchForm(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    transformString,
    searchPage(row = {}) {
      this.searchForm = row;
      this.loadPage();
    },
    loadPage(params = this.queryForm) {
      this.isLoadTable = false;
      this.loadTable(
        Object.assign({}, params, this.searchForm),
        getRecruitPageByOrgId,
      );
    },
    handleDelete() {
      this._handleComfirm({}, () => {}, "删除选中招聘");
    },
    handleDetail() {},
    handleCreate(type) {
      this.$emit("operate", type + "Form", "loadData");
    },
    // 停止招聘
    handleStopRecruit(row) {
      stopRecruitById({
        recruitId: row.recruitId,
      }).then(({ data }) => {
        if (data) this.loadPage();
      });
    },
    // 重启招聘
    handleRestartRecruit(row) {
      restartRecruitById({
        recruitId: row.recruitId,
      }).then(({ data }) => {
        if (data) this.loadPage();
      });
    },
    // 编辑
    handleUpdate(row = { type: 0 }) {
      const type = {
        0: "Job",
        1: "Partner",
      };
      this.$emit("operate", type[row.type] + "Form", "loadData", row);
    },
    // 置顶
    handleTop(row) {
      topRecruitById({
        recruitIds: [row.recruitId],
        type: "top",
      }).then(({ data }) => {
        if (data) this.loadPage();
      });
    },
    // 分享
    handleShare(row) {
      this.$refs.share.open(row);
    },
    selectionChange(val) {
      this.selectList = val;
    },
    // 刷新
    handleRefresh() {
      if (this.selectList.length === 0) {
        this.$message.warning("请先进行选择！");
        return;
      }
      refreshRecruitById({
        recruitIds: this.selectList.map(m => m.recruitId),
      }).then(({ data }) => {
        if (data) {
          this.loadPage();
          this.$message.success("刷新成功！");
        }
      });
    },
    handleDetailById(row) {
      this.$router.push({
        path: `/recruit/apply/${row.recruitId}`,
        query: {
          title: row.name,
          type: row.type === "0" ? "position" : "partner",
        },
      });
    },
  },
  created() {
    this.queryForm.orgId = this.userInfo.orgId;
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.table-list {
  .button-box {
    .button {
      background-color: $--color-primary;
      color: #fff;
    }
  }
  .content {
    .deliveryNum {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
