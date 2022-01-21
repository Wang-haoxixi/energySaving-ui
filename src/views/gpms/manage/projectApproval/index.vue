<template>
  <div>
    <iep-crud-table
      ref="CrudTable"
      :commonOptions="commonOptions"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      rowId="id"
      :loadFunction="getApprovalList"
      :searchName="'projectName'"
    >
      <template #iep-crud-advance-search>
        <advance-search @search-page="handleSearch"></advance-search>
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
          >{{dictsMap.projectStage[scope.row.projectStage]?dictsMap.projectStage[scope.row.projectStage].label:"暂无"}}</el-tag>
          <span>{{ scope.row.projectName }}</span>
        </div>
      </template>
      <template #projectTime="{scope}">{{ scope.row.projectTime | parseToDay }}</template>
    </iep-crud-table>
    <review-confirm is-inverse ref="ReviewForm" @load-page="loadPage"></review-confirm>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
// import { getDataDetail } from '@/api/gpms/index'
import { columnsMap, dictsMap } from "./option";
import { getApprovalList, approvalById } from "@/api/gpms/manage";
import ReviewConfirm from "./ReviewConfirm";
import AdvanceSearch from "./AdvanceSearch";

export default {
  mixins: [mixins],
  components: { ReviewConfirm, AdvanceSearch },
  data() {
    return {
      columnsMap,
      dictsMap,
      announcementSelection: [],
      commonOptions: [
        {
          name: "批量审核",
          func: this.handleReviewDialog,
        },
      ],
      operationOptions: [
        {
          name: "立项审核",
          func: this.handleReviewDialog,
          hidden: this.hideReviewDialog,
          disabled: false,
        },
        {
          name: "锁定",
          func: this.handleLocking,
          hidden: this.hideLocking,
          disabled: false,
        },
        {
          name: "启用",
          func: this.handleEnable,
          hidden: this.hideEnable,
          disabled: false,
        },
      ],
    };
  },
  created() {},
  methods: {
    getApprovalList,
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    close() {
      this.$router.history.go(-1);
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleDetail(row) {
      this.$router.push({
        path: `/gpms/project/detail/${row.id}`,
        query: {
          isApprove: true,
        },
      });
    },
    //审核
    hideReviewDialog(row) {
      if (row.projectStatus == 2) {
        return false;
      } else {
        return true;
      }
    },
    handleReviewDialog(row) {
      if (row.id) {
        this.$refs["ReviewForm"].id = row.id;
      } else {
        // TODO: 是否多选提醒
        if (!this.multipleSelection.length) {
          this.$message("请先选择需要的选项");
          return;
        }
        this.$refs["ReviewForm"].ids = this.multipleSelection;
      }
      this.$refs["ReviewForm"].title = "审核";
      this.$refs["ReviewForm"].formRequestFn = approvalById;
      this.$refs["ReviewForm"].dialogShow = true;
      this.$refs["ReviewForm"].projectInformation = row;
      this.$refs[
        "ReviewForm"
      ].announcementSelection = this.announcementSelection;
    },
    //锁定启用
    hideLocking(row) {
      if (row.projectStatus == 3) {
        return false;
      } else {
        return true;
      }
    },
    hideEnable(row) {
      if (row.projectStatus == 5) {
        return false;
      } else {
        return true;
      }
    },
    handleLocking(row) {
      this.lockingEnable(row, "5", "锁定");
    },
    handleEnable(row) {
      this.lockingEnable(row, "3", "启用");
    },
    lockingEnable(row, val, name) {
      this.$confirm(`此操作将${name}该项目 , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        approvalById({
          ids: [row.id],
          projectStatus: val, // 用来变更状态
        }).then(res => {
          if (res.data) {
            this.$message({
              message: `${name}成功`,
              type: "success",
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
</style>
