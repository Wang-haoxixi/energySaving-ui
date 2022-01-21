<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="600px" @close="_close()">
    <div class="block">
      <el-button
        class="add-btn"
        icon="el-icon-plus"
        type="primary"
        size="mini"
        round
        @click="() => add()"
      >添加父分类</el-button>
      <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <CategoryTreeItem
            :node="node"
            :data="data"
            :dictId="dictId"
            :category="category"
            @update="load()"
          ></CategoryTreeItem>
        </span>
      </el-tree>
    </div>
  </iep-dialog>
</template>
<script>
import { initForm } from "./options";
import CategoryTreeItem from "./CategoryTreeItem";
import { getTestDictPage, addTestDict } from "@/api/qms/course_courseware";
export default {
  name: "CategoryDialog",
  components: {
    CategoryTreeItem,
  },
  data() {
    return {
      dialogShow: false,
      title: "分类管理",
      // 1是课件 2是课程
      dictId: 0,
      category: 2,
      data: [],
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    // 1是课件 2是课程
    open(category = 2) {
      this.category = category;
      this.dialogShow = true;
      this.load();
    },
    async load() {
      const { data } = await getTestDictPage({ category: this.category });
      this.dictId = data.id;
      this.data = data.children;
      this.$emit("update-data", this.data);
    },
    async add() {
      if (this.dictId) {
        const form = initForm(this.dictId, 0);
        const { data } = await addTestDict(form);
        if (data) {
          this.$message("操作成功");
          this.load();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
}
.add-btn {
  margin-bottom: 10px;
}
</style>
