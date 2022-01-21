<template>
  <el-card class="wrapper" shadow="never">
    <div class="title">菜单组</div>
    <el-tree
      :data="groupData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="true"
      @node-click="hanldeSelect"
    >
      <span class="custom-tree-node" slot-scope="{ data }">
        <span :class="{active:data.id===currentId}">{{ data.name }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more-outline el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item v-if="data.id!==0">查看</el-dropdown-item> -->
            <el-dropdown-item v-if="data.id===0" @click.native.stop="() => handleAdd()">添加</el-dropdown-item>
            <el-dropdown-item v-if="data.id!==0" @click.native.stop="() => handleEdit(data)">编辑</el-dropdown-item>
            <el-dropdown-item v-if="data.id!==0" @click.native.stop="() => handleDel(data)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>
    <GroupDialogForm ref="GroupDialogForm" @load-page="loadPage()"></GroupDialogForm>
  </el-card>
</template>
<script>
import { getMenuGroupList, delMenuGroupById } from "@/api/admin/menu_group";
import GroupDialogForm from "./GroupDialogForm";
import operationMixins from "@/mixins/operationMixins";
export default {
  mixins: [operationMixins],
  components: {
    GroupDialogForm,
  },
  data() {
    return {
      groupTreeData: [],
      currentId: 0,
    };
  },
  computed: {
    groupData() {
      return [
        {
          id: 0,
          name: "全部",
          menuIds: [],
          children: [...this.groupTreeData],
        },
      ];
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleDel(data) {
      this._handleComfirm(data.id, delMenuGroupById, "删除菜单组");
    },
    handleAdd() {
      this.$refs["GroupDialogForm"].add();
    },
    handleEdit(row) {
      this.$refs["GroupDialogForm"].edit(row);
    },
    async loadPage() {
      const { data } = await getMenuGroupList();
      this.groupTreeData = data;
      this.$emit("active-menu", data[0].menuIds);
    },
    hanldeSelect(data) {
      this.currentId = data.id;
      this.$emit("active-menu", data.menuIds);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid $--border-color;
  margin-right: 20px;
  width: 245px;
  min-width: 245px;
  // padding: 10px;
  .title {
    padding: 4px 20px;
    height: 40px;
    line-height: 40px;
    border: 0;
  }
}
.wrapper ::v-deep .el-card__body {
  padding: 0;
}
.wrapper ::v-deep .el-card__body .el-tree-node__content {
  padding: 0 13px;
  height: 40px;
  line-height: 40px;
  &:hover {
    background-color: $--background-color;
  }
}
.custom-tree-node {
  padding: 0 25px 0 13px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.wrapper ::v-deep .el-tree-node__expand-icon {
  position: absolute;
  right: 20px;
  padding: 0;
  &::before {
    display: none;
  }
  &::after {
    content: "";
  }
}
.wrapper ::v-deep .el-card__body {
  padding: 0;
}
.wrapper ::v-deep .el-tree-node__expand-icon.expanded {
  transform: rotate(180deg);
}

.wrapper ::v-deep .el-tree-node__children .el-tree-node__content {
  padding: 0 40px !important;
  height: 20px;
  line-height: 20px;
  .tree-node {
    padding: 0;
  }
}
.wrapper ::v-deep .el-tree-node__children.el-tree-node__children .el-tree-node {
  position: relative;
  margin: 0;
  .el-tree-node__content {
    &:hover::after,
    &:focus::after {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: rgba(247, 67, 55, 1);
      border-radius: 2px;
      content: "";
    }
  }
  &:first-child {
    margin-top: -13px;
  }
  &:last-child {
    margin-bottom: -13px;
  }
  .custom-tree-node {
    &:hover::after,
    &:focus::after {
      display: none;
    }

    .active {
      color: rgba(247, 67, 55, 1);
    }
  }
}
.wrapper ::v-deep .el-tree-node__content {
  position: relative;
  margin: 13px 0;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  background: none !important;
  box-sizing: border-box;
  .el-dropdown {
    height: 18px;
    line-height: 20px;
  }
  &:focus {
    background: none;
  }
  &:hover,
  &:focus {
    background: none;
    color: $--second-color-primary;
  }
  .custom-tree-node {
    position: relative;
    &:hover::after,
    &:focus::after {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: rgba(247, 67, 55, 1);
      border-radius: 2px;
      content: "";
    }
  }
  &:hover .el-dropdown {
    color: $--second-color-primary;
  }
}
.custom-tree-node span {
  padding-left: 8px;
  width: 80%;
  max-width: 160px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wrapper ::v-deep .el-tree-node__children .custom-tree-node span,
.wrapper ::v-deep .el-tree-node__children .custom-tree-node {
  padding-left: 0;
}
</style>
