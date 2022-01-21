<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictMap"
        :columnsMap="columnsMap"
        rowId="id"
        :loadFunction="getTableData"
        :searchName="'projectName'"
      >
        <template #iep-crud-right>
          <el-checkbox v-model="onlyResponsible" @change="changeResponsible()">查看我参与的项目</el-checkbox>
        </template>
        <template #projectName="{scope}">
          <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
            <el-tag size="mini" type="danger" class="grade" v-show="scope.row.projectLevel==1">重要</el-tag>
            <el-tag size="mini" type="danger" class="grade" v-show="scope.row.projectLevel==2">中级</el-tag>
            <el-tag size="mini" type="danger" class="grade" v-show="scope.row.projectLevel==3">一般</el-tag>
            <el-tag
              type="info"
              class="stage"
              size="mini"
            >{{dictMap.projectStage[scope.row.projectStage]?dictMap.projectStage[scope.row.projectStage].label:"暂无"}}</el-tag>
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
        <template #projectAmount="{scope}">
          <span v-if="scope.row.contractAmount">{{ scope.row.contractAmount }}（合同）</span>
          <span v-else>{{ scope.row.projectAmount }}（预算）</span>
        </template>
        <template #projectTime="{scope}">
          <!-- <span v-if="scope.row.projectStatus=='3'">{{ scope.row.approvalTime | parseToDay }}（审核）</span> -->
          <!-- <span v-else>{{ scope.row.projectTime | parseToDay }}（预计）</span> -->
          <span>{{ scope.row.projectTime | parseToDay }}</span>
        </template>
        <template #projectStatus="{scope}">{{dictMap.projectStatus[scope.row.projectStatus]}}</template>
      </iep-crud-table>
    </iep-basic-container>

    <transfer-dialog-form ref="TransferDialogForm" @load-page="loadPage"></transfer-dialog-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { getTableData, deleteData, withdrawById } from "@/api/gpms/index";
import { dictMap, columnsMap } from "./option";
// import AdvanceSearch from "./AdvanceSearch";
import TransferDialogForm from "./TransferDialogForm";
export default {
  components: { TransferDialogForm },
  mixins: [mixins, operationMixins],
  data() {
    return {
      dictMap,
      columnsMap,
      listType: 1,
      onlyResponsible: false,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleCreate,
        },
        // {
        //   name: "批量删除",
        //   func: this.handleDeleteAll,
        //   // hidden: onlyResponsible == true,
        // },
        {
          name: "项目移交",
          func: this.transferMentor,
          // hidden: onlyResponsible == true,
        },
      ],
      operationOptions: [
        // {
        //   name: "项目核算",
        //   func: this.handleAccounting,
        //   hidden: this.hideAccounting,
        //   disabled: row => {
        //     return row.id == 174;
        //   },
        // },
        {
          name: "撤回",
          func: this.handleWithdraw,
          hidden: this.hideWithdraw,
          disabled: false,
        },
        {
          name: "立项",
          func: this.handleBuild,
          hidden: this.hideBuild,
          disabled: false,
        },
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: this.hideEdit,
          disabled: false,
        },
        {
          name: "删除",
          func: this.handleDelete,
          hidden: this.hideDelete,
          disabled: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
  },
  methods: {
    getTableData,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleDetail(row) {
      this.$router.push({
        path: `/gpms/project/detail/${row.id}`,
      });
    },
    handleCreate() {
      this.$router.push("/gpms/project/add/0");
    },
    handleEdit(row) {
      this.$router.push(`/gpms/project/add/${row.id}`);
    },
    handleDelete(row) {
      this._handleComfirm(row.id, deleteData, "删除");
    },
    handleDeleteAll() {
      this._handleGlobalAll(deleteData);
    },
    handleWithdraw(row) {
      this.operating(row.id, 1, "撤回");
    },
    handleBuild(row) {
      this.operating(row.id, 2, "立项");
    },
    // 撤回/立项
    operating(ids, val, name) {
      this.$confirm(`此操作将${name}该数据, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        withdrawById({ ids: [ids], projectStatus: val }).then(res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: `${name}成功!`,
            });
          } else {
            this.$message({
              type: "info",
              message: `${name}失败，${res.message}`,
            });
          }
          this.loadPage();
        });
      });
    },
    //移交
    transferMentor() {
      if (
        this.$refs["CrudTable"].multipleSelection === undefined ||
        this.$refs["CrudTable"].multipleSelection.length === 0
      ) {
        this.$message("请先选择需要移交的选项");
        return;
      }
      this.$refs["TransferDialogForm"].methodName = "项目经理";
      this.$refs["TransferDialogForm"].ids = this.$refs[
        "CrudTable"
      ].multipleSelection;
      this.$refs["TransferDialogForm"].dialogShow = true;
    },
    changeResponsible() {
      if (this.onlyResponsible) {
        this.$refs["CrudTable"].queryForm = {
          listType: 2,
        };
        this.loadPage();
      } else {
        this.$refs["CrudTable"].queryForm = {
          listType: 1,
        };
        this.loadPage();
      }
      this.onlyResponsible != this.onlyResponsible;
      return false;
    },
    handleAccounting(row) {
      this.$router.push(`/fams_spa/project_accounting/${row.id}`);
    },
    // judgeValue(value, key) {
    //   return value ? value[key] : "暂无";
    // },
    //项目核算显隐
    hideAccounting(row) {
      if (row.projectStatus == "3") {
        return false;
      } else {
        return true;
      }
    },
    //项目撤回显隐
    hideWithdraw(row) {
      if (
        this.userInfo.userId == row.projectManager &&
        row.projectStatus == "2"
      ) {
        return false;
      } else {
        return true;
      }
    },
    //项目立项显隐
    hideBuild(row) {
      if (
        (this.userInfo.userId == row.projectManager &&
          row.projectStatus == "1") ||
        row.projectStatus == "4"
      ) {
        return false;
      } else {
        return true;
      }
    },
    //项目编辑显隐
    hideEdit(row) {
      if (
        this.userInfo.userId == row.projectManager &&
        row.projectStatus !== "5"
      ) {
        return false;
      } else {
        return true;
      }
    },
    //项目删除显隐
    hideDelete(row) {
      if (
        (this.userInfo.userId == row.projectManager &&
          row.projectStatus == "1") ||
        row.projectStatus == "4"
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: 35px;
  line-height: 26px;
  color: $--color-text-regular;
  font-weight: 900;
  font-size: 17px;
  border-bottom: 1px solid #cdcdcd;
  margin-bottom: 20px;
}
.searchbot {
  margin-right: 20px !important;
}
.num {
  width: 47%;
}
.smallcol {
  width: 110px !important;
}
.blackColor {
  color: $--color-text-regular;
}
.cell {
  padding: 0;
}
.cell .el-button {
  margin-left: 0;
  display: inline;
}
.el-button {
  padding: 8px 10px;
}
.grade {
  margin-right: 5px;
}
.stage {
  margin-right: 10px;
}
</style>
