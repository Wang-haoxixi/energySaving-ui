<template>
  <el-card class="card" shadow="never">
    <div class="all" @click="handleGetAll">所有分类</div>
    <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick">
      <div
        class="tree-node"
        slot-scope="{ node, data }"
        v-on:mouseover="settingIndex = data.id"
        v-on:mouseout="settingIndex = -1"
      >
        <div
          class="label"
          :class="activeId === data.id ? 'select' : ''"
          :title="data.levelName"
        >{{ data.levelName }}</div>
        <el-dropdown size="medium" v-show="settingIndex === data.id">
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="handleCreate(data)">添加子分类</div>
            </el-dropdown-item>
            <el-dropdown-item v-if="material_level_update">
              <div @click="handleUpdate(data)">重命名</div>
            </el-dropdown-item>
            <el-dropdown-item v-if="material_level_delete">
              <div @click="handleDelete(data)">删除</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-tree>
  </el-card>
</template>

<script>
import { getLevelTree, deleteDataByIds } from "@/api/dms/materialLevel";
import operationMixins from "@/mixins/operationMixins";
import { hasPermissions } from "@/util/menu";
import { mapGetters } from "vuex";

export default {
  mixins: [operationMixins],
  components: {},
  data() {
    return {
      data: [],
      defaultProps: {
        children: "childrens",
        label: "levelName",
      },
      settingIndex: -1,
      activeId: -1,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    material_level_update: () => hasPermissions("material_level_update"),
    material_level_delete: () => hasPermissions("material_level_delete"),
  },
  methods: {
    loadPage() {
      getLevelTree().then(({ data }) => {
        this.data = data;
        this.$emit("get-level-tree", data);
      });
    },
    handleNodeClick(data) {
      this.$emit("load-data", data.id);
      this.activeId = data.id;
    },
    handleCreate(row) {
      this.$emit("file-operat", "create", row);
    },
    handleUpdate(row) {
      this.$emit("file-update", { ...row });
    },
    handleDelete(row) {
      this._handleComfirm([row.id], deleteDataByIds, "删除此分类");
    },
    handleGetAll() {
      this.$emit("load-data", "");
      this.activeId = -1;
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 300px;
  width: 245px;
  min-width: 245px;
  .all {
    padding: 4px 20px;
    height: 40px;
    line-height: 40px;
    border: 0;
  }
  .tree-node {
    padding: 0 25px 0 20px;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .label {
      height: 20px;
      line-height: 20px;
      flex: 1;
      width: 80%;
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .select {
      color: $--color-primary;
    }
  }
}
.card ::v-deep .el-tree-node__expand-icon {
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
.card ::v-deep .el-card__body {
  padding: 0;
}
.card ::v-deep .el-tree-node__expand-icon.expanded {
  transform: rotate(180deg);
}

.card ::v-deep .el-tree-node__content {
  position: relative;
  margin: 13px 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  background: none !important;
  box-sizing: border-box;
  &:focus {
    background: none;
  }
  &:hover .tree-node,
  &:focus .tree-node {
    background: none;
    color: $--second-color-primary;
  }
  &:hover::after,
  &:focus::after,
  .el-tree-node__children:hover::after,
  .el-tree-node__children:focus::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    // background: rgba(247, 67, 55, 1);
    background: $--color-primary;
    border-radius: 2px;
    content: "";
  }
  .el-dropdown {
    height: 18px;
    line-height: 20px;
    font-size: 18px;
    color: $--second-color-primary;
  }
}
.el-tree ::v-deep .el-tree-node {
  display: flex;
  flex-direction: column;
}
.el-tree ::v-deep .el-tree-node.is-expanded {
  &:first-child .el-tree-node__children {
    margin: 0;
  }
}
</style>
