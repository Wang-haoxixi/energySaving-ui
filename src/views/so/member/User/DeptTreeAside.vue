<template>
  <div class="wrapper">
    <div class="title">部门</div>
    <el-tree :data="deptData" node-key="id" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more-outline el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="data.id!==0">查看</el-dropdown-item>
            <el-dropdown-item @click.native.stop="() => handleAdd(data)">添加</el-dropdown-item>
            <el-dropdown-item v-if="data.id!==0" @click.native.stop="() => handleEdit(data)">编辑</el-dropdown-item>
            <el-dropdown-item v-if="data.id!==0" @click.native.stop="() => handleDel(data)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>
    <dept-dialog-form ref="DeptDialogForm" @load-page="loadPage()"></dept-dialog-form>
  </div>
</template>
<script>
import {
  getDeptTree,
  postDept,
  putDept,
  delDeptById,
  getDeptById,
} from "@/api/admin/dept";
import DeptDialogForm from "./DeptDialogForm";
import { initDeptForm } from "./options";
import { convertTreeToList } from "@/util/util";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins],
  components: {
    DeptDialogForm,
  },
  data() {
    return {
      deptTreeData: [],
    };
  },
  computed: {
    deptData() {
      return [
        {
          id: 0,
          name: "全部",
          children: [...this.deptTreeData],
        },
      ];
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const { data } = await getDeptTree();
      this.deptTreeData = [...data];
    },
    handleAdd(row) {
      if (row) {
        this.$refs["DeptDialogForm"].form = initDeptForm();
        this.$refs["DeptDialogForm"].form.parentId = row.id;
      }
      this.$refs["DeptDialogForm"].formRequestFn = postDept;
      this.$refs["DeptDialogForm"].options = convertTreeToList(
        this.deptData[0],
      );
      this.$refs["DeptDialogForm"].dialogShow = true;
    },
    async handleEdit(row) {
      const { data } = await getDeptById(row.id);
      this.$refs["DeptDialogForm"].formRequestFn = putDept;
      this.$refs["DeptDialogForm"].form = this.$mergeByFirst(
        initDeptForm(),
        data,
      );
      this.$refs["DeptDialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.id, delDeptById, "删除部门");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  border: 1px solid $--border-color;
  margin-right: 20px;
  padding: 10px;
  .title {
    background-color: $--border-color;
    padding: 5px 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
