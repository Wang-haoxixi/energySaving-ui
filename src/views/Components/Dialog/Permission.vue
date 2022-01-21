<template>
  <iep-dialog
    :title="`<${title}>分配权限`"
    :dialog-show="dialogShow"
    width="520px"
    @close="_close()"
    @mounted="handleMounted()"
  >
    <IepSelectCommonList
      v-model="value"
      prefixUrl="admin/menu/group"
      :props="props"
      @value-change="handleChange"
      placeholder="请选择菜单组"
    ></IepSelectCommonList>
    <IepRoleTree
      ref="menuTree"
      :data="treeData"
      :default-checked-keys="checkedKeys"
      :show-checkbox="!disabled"
      :filter-node-method="filterNode"
    ></IepRoleTree>
    <div slot="footer">
      <el-button v-if="!disabled" type="primary" @click="updatePermession()">更 新</el-button>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  name: "IepDialogPermission",
  data() {
    return {
      value: 1,
      props: {
        label: "name",
        value: "id",
      },
      disabled: false,
      title: "",
      dialogShow: false,
      treeData: [],
      checkedKeys: [],
      roleId: null, //父组件赋值
      formRequestFn: () => {},
      filterMenuIds: [],
    };
  },
  methods: {
    handleMounted() {
      this.value = 1;
    },
    filterNode(value, data, node) {
      const loop = loopNode => {
        if (loopNode.level <= 1) {
          return value.includes(loopNode.data.id);
        } else {
          return loop(loopNode.parent);
        }
      };
      return loop(node);
    },
    handleChange(v) {
      this.$refs["menuTree"].filter(v.menuIds);
    },
    async updatePermession() {
      const menuTree = this.$refs.menuTree;
      await this.formRequestFn(
        this.roleId,
        menuTree
          .getCheckedKeys()
          .join(",")
          .concat(",")
          .concat(menuTree.getHalfCheckedKeys().join(",")),
      );
      this.$message.success("操作成功");
      this.close();
    },
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
  },
};
</script>
