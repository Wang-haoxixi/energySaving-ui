<template>
  <el-tree
    class="tree-box"
    ref="tree"
    :check-strictly="false"
    node-key="id"
    highlight-current
    :props="defaultProps"
    :show-checkbox="showCheckbox"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="custom-tree-node" slot-scope="{ node,data }">
      <span class="iep-ellipsis" :title="node.label">{{ node.label }}</span>
      <span v-if="data.code" class="iep-tag iep-green">权限</span>
      <span v-else-if="data.hidden" class="iep-tag iep-red">隐藏菜单</span>
      <span v-else class="iep-tag iep-blue">菜单</span>
    </div>
  </el-tree>
</template>
<script>
export default {
  name: "IepRoleTree",
  props: {
    showCheckbox: {
      type: Boolean,
      default: true,
    },
  },
  inheritAttrs: false,
  data() {
    return {
      defaultProps: {
        label: "name",
        value: "id",
      },
    };
  },
  methods: {
    filter(...arg) {
      return this.$refs.tree.filter(...arg);
    },
    getCheckedKeys(...arg) {
      return this.$refs.tree.getCheckedKeys(...arg);
    },
    getHalfCheckedKeys(...arg) {
      return this.$refs.tree.getHalfCheckedKeys(...arg);
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-tree-node {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:first-child {
    max-width: 350px;
  }
}
.tree-box ::v-deep .el-tree-node__content {
  margin: 5px 0;
  height: 30px;
  border-radius: 5px;
  & > label.el-checkbox {
    line-height: inherit;
  }
}
.iep-tag {
  padding: 0 10px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
}
.iep-green,
.iep-blue,
.iep-red {
  background: rgb(240, 240, 240);
}
</style>
