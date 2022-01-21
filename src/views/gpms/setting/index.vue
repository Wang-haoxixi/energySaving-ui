<template>
  <div>
    <iep-basic-container>
      <iep-page-header title="项目设置"></iep-page-header>
      <div class="wapper">
        <h3>项目团队</h3>
        <p>对项目角色进行配置</p>
        <el-button
          @click="handleAdd('dms_project_team')"
          icon="el-icon-plus"
          type="primary"
          class="button"
        >新增</el-button>
        <el-table :data="teamList" style="width: 100%" border>
          <el-table-column prop="label" label="团队名称"></el-table-column>
          <iep-operation-table-btn-group :options="operationOptions1"></iep-operation-table-btn-group>
        </el-table>
      </div>
      <div class="wapper">
        <h3>项目预算</h3>
        <p>对项目预算进行配置</p>
        <el-button
          @click="handleAdd('dms_project_budget')"
          icon="el-icon-plus"
          type="primary"
          class="button"
        >新增</el-button>
        <el-table :data="budgetList" style="width: 100%" border>
          <el-table-column prop="label" label="团队名称"></el-table-column>
          <iep-operation-table-btn-group :options="operationOptions2"></iep-operation-table-btn-group>
        </el-table>
      </div>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getDataList, addData, updateData, delData } from "@/api/gpms/setting";
import DialogForm from "./DialogForm";
export default {
  mixins: [operationMixins],
  components: { DialogForm },
  data() {
    return {
      teamList: [],
      budgetList: [],
      operationOptions1: [
        {
          name: "编辑",
          func: this.handleEdit1,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
      operationOptions2: [
        {
          name: "编辑",
          func: this.handleEdit1,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      getDataList("dms_project_team").then(res => {
        this.teamList = res.data;
      });
      getDataList("dms_project_budget").then(res => {
        this.budgetList = res.data;
      });
    },
    handleAdd(num) {
      this.$refs["DialogForm"].form.number = num;
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = addData;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit1(row) {
      this.$refs["DialogForm"].form = { ...row, number: "dms_project_team" };
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = updateData;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleEdit2(row) {
      this.$refs["DialogForm"].form = { ...row, number: "dms_project_budget" };
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = updateData;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, delData, "删除");
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  height: 36px;
  border-radius: 10px;
}
.wapper {
  margin-bottom: 40px;
  p {
    margin: 10px 0;
    font-size: 14px;
    color: $--color-text-secondary;
  }
}
.el-table {
  margin-top: 20px;
  border-top: 1px solid $--border-color;
}
.el-table ::v-deep th.is-leaf {
  background-color: rgb(242, 244, 245);
  color: rgb(0, 0, 0);
}
</style>
