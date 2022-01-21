<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictMap"
      :columnsMap="columnsMap"
      rowId="projectId"
      :loadFunction="changeLoad"
      :searchName="'projectName'"
      :operationWidth="120"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
      </template>
      <template #iep-crud-right>
        <el-checkbox
          class="responsible"
          v-model="onlyResponsible"
          @change="changeResponsible()"
        >查看我发起的</el-checkbox>
      </template>
      <template #projectName="{scope}">
        <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
          <el-tag size="mini" type="danger" class="grade" v-show="scope.row.projectLevel==1">重要</el-tag>
          <el-tag size="mini" type="danger" class="grade" v-show="scope.row.projectLevel==2">中级</el-tag>
          <el-tag size="mini" type="danger" class="grade" v-show="scope.row.projectLevel==3">一般</el-tag>
          <el-tag
            type="info"
            size="mini"
            class="stage"
          >{{dictMap.projectStage[scope.row.projectStage]?dictMap.projectStage[scope.row.projectStage].label:"暂无"}}</el-tag>
          <span>{{ scope.row.projectName }}</span>
        </div>
      </template>
      <template #signingTime="{scope}">
        <!-- <span v-if="scope.row.projectStatus=='3'">{{ scope.row.approvalTime | parseToDay }}（审核）</span> -->
        <!-- <span v-else>{{ scope.row.signingTime | parseToDay }}（预计）</span> -->
        <span>{{ scope.row.signingTime | parseToDay }}</span>
      </template>
    </iep-crud-table>

    <review-confirm is-inverse ref="ReviewForm" @load-page="loadPage"></review-confirm>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
// import { getDataDetail } from '@/api/gpms/index'
import { columnsMap, dictMap } from "./option";
import {
  getPageCarryon,
  getSendPage,
  approvalById,
  deleteOnlinecon,
  revokeOnlinecon,
  verifyOnlinecon,
} from "@/api/gpms/manage";
import ReviewConfirm from "./ReviewConfirm";
import AdvanceSearch from "./AdvanceSearch";

export default {
  mixins: [mixins],
  components: { ReviewConfirm, AdvanceSearch },
  data() {
    return {
      columnsMap,
      dictMap,
      announcementSelection: [],
      onlyResponsible: false,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleCreate,
        },
      ],
      operationOptions: [
        // {
        //   name: "立项审核",
        //   func: this.handleReviewDialog,
        //   hidden: false,
        //   disabled: false,
        // },
        {
          name: "签订",
          func: this.verifyOnlinecon,
          hidden: this.hideVerifyOnlinecon,
          disabled: false,
        },
        {
          name: "撤回",
          func: this.revokeOnlinecon,
          hidden: this.hideRevokeOnlinecon,
          disabled: false,
        },
        {
          name: "编辑",
          func: this.handleUpdate,
          hidden: false,
          disabled: false,
        },
        {
          name: "删除",
          func: this.handleDelete,
          hidden: false,
          disabled: false,
        },
      ],
      changeLoad: getPageCarryon,
    };
  },
  created() {},
  computed: {
    // changeLoad() {
    //   if (this.onlyResponsible) {
    //     return getSendPage;
    //   } else {
    //     return getPageCarryon;
    //   }
    // },
  },
  methods: {
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    close() {
      this.$router.history.go(-1);
    },
    handleDetail(row) {
      this.$router.push({
        path: `/gpms/project/detail/${row.onlineConId}`,
        query: {
          isApprove: true,
        },
      });
    },
    handleCreate() {
      this.$router.push("/gpms/project/add_sign/0");
    },
    handleUpdate(row) {
      this.$router.push(`/gpms/project/add_sign/${row.onlineConId}`);
    },
    //审核
    handleReviewDialog(row) {
      this.$refs["ReviewForm"].id = row.onlineConId;
      this.$refs["ReviewForm"].title = "审核";
      this.$refs["ReviewForm"].formRequestFn = approvalById;
      this.$refs["ReviewForm"].dialogShow = true;
      this.$refs["ReviewForm"].projectInformation = row;
      this.$refs[
        "ReviewForm"
      ].announcementSelection = this.announcementSelection;
    },
    //锁定启用
    lockingEnable(id, val, name) {
      this.$confirm(`此操作将${name}该项目 , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        approvalById({
          ids: [id],
          projectStatus: val, // 用来变更状态
        }).then(res => {
          if (res.data) {
            this.$message({
              message: `${name}成功`,
              type: "success",
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
          this.loadPage();
        });
      });
    },
    hideVerifyOnlinecon(row) {
      this.onlyResponsible || row.signStatus == 2;
    },
    //签订
    verifyOnlinecon(val) {
      this.$confirm("此操作将签订该项目 , 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        verifyOnlinecon({
          onlineConId: val.onlineConId,
          signStatus: 2,
        }).then(res => {
          if (res.data) {
            this.$message({
              message: "签订成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
          this.loadPage();
        });
      });
    },
    hideRevokeOnlinecon(row) {
      if (row.signStatus != 0) {
        return false;
      } else {
        return true;
      }
    },
    //撤回
    revokeOnlinecon(val) {
      this.$confirm("此操作将撤回该项目 , 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        revokeOnlinecon({
          onlineConId: val.onlineConId,
          signStatus: 0,
        }).then(res => {
          if (res.data) {
            this.$message({
              message: "撤回成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          }
          this.loadPage();
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(m => m.id);
      this.announcementSelection = val;
    },
    changeResponsible() {
      this.onlyResponsible != this.onlyResponsible;
      if (this.onlyResponsible) {
        this.changeLoad = getSendPage;
      } else {
        this.changeLoad = getPageCarryon;
      }
      this.$nextTick(() => {
        this.$refs["CrudTable"].loadPage();
      });
    },
    handleDelete(row) {
      this._handleComfirm(row.onlineConId, deleteOnlinecon, "删除");
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  margin-bottom: 20px;
  display: flex;
  .item {
    font-size: 18px;
    cursor: pointer;
  }
  .item-select {
    color: $--color-primary;
  }
  .middle {
    width: 30px;
    text-align: center;
    font-size: 18px;
  }
}
.grade {
  margin-right: 5px;
}
.stage {
  margin-right: 10px;
}
.responsible {
  margin-left: 15px;
}
</style>
