<template>
  <div class="file">
    <div class="all" @click="handleGetAll">全部材料</div>
    <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick">
      <div class="tree-node" slot-scope="{ node, data }">
        <div
          class="label"
          :class="activeId === data.id ? 'select' : ''"
          :title="data.levelName"
        >{{ data.levelName }}</div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import { getLevelTree } from "@/api/dms/materialLevel";
import operationMixins from "@/mixins/operationMixins";

export default {
  mixins: [operationMixins],
  components: {},
  props: {
    orgId: {
      Number,
      default: 0,
    },
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "childrens",
        label: "levelName",
      },
      activeId: -1,
    };
  },
  methods: {
    loadPage() {
      getLevelTree({ orgId: this.orgId }).then(({ data }) => {
        this.data = data;
        this.$emit("load-data", "");
      });
    },
    handleNodeClick(data) {
      this.$emit("load-data", data.id);
      this.activeId = data.id;
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
.file {
  width: 190px;
  .all {
    padding: 4px 20px 10px 5px;
    height: 14px;
    line-height: 14px;
    border: 0;
    font-size: 14px;
    cursor: pointer;
  }
  .tree-node {
    padding: 0 25px 0 5px;
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
.file ::v-deep .el-tree-node__expand-icon {
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
.file ::v-deep .el-card__body {
  padding: 0;
}
.file ::v-deep .el-tree-node__expand-icon.expanded {
  transform: rotate(180deg);
}

.file ::v-deep .el-tree-node__children .el-tree-node__content {
  padding: 0 25px !important;
  .tree-node {
    padding: 0;
  }
}
.file ::v-deep .el-tree-node__content {
  position: relative;
  margin: 0;
  height: 30px;
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
  .el-dropdown {
    height: 18px;
    line-height: 20px;
    font-size: 18px;
    color: $--second-color-primary;
  }
}
</style>
