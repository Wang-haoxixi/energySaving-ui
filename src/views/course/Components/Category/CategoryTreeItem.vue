<template>
  <div class="tree-item">
    <el-input v-if="isEdit" v-model="value" size="mini"></el-input>
    <span v-else>{{ node.label }}</span>
    <span>
      <template v-if="data.parentId!==-1">
        <template v-if="isEdit">
          <el-button size="mini" @click="() => check(data)" icon="el-icon-check" round></el-button>
          <el-button size="mini" @click="() => close(data)" icon="el-icon-close" round></el-button>
        </template>
        <template v-else-if="node.level<3">
          <el-button size="mini" @click="() => append(data)" icon="el-icon-plus" round></el-button>
          <el-button size="mini" @click="() => edit(data)" icon="el-icon-edit" round></el-button>
          <el-button size="mini" @click="() => remove(data)" icon="el-icon-delete" round></el-button>
        </template>
        <template v-else>
          <el-button size="mini" @click="() => edit(data)" icon="el-icon-edit" round></el-button>
          <el-button size="mini" @click="() => remove(data)" icon="el-icon-delete" round></el-button>
        </template>
      </template>
    </span>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { initForm, updateForm } from "./options";
import {
  addTestDict,
  updateTestDict,
  delDictByIdByCategory,
} from "@/api/qms/course_courseware";
export default {
  mixins: [operationMixins],
  props: ["node", "data", "dictId", "category"],
  data() {
    return {
      isEdit: false,
      value: "",
    };
  },
  computed: {
    delDictById() {
      return delDictByIdByCategory(this.category);
    },
  },
  methods: {
    async append(row) {
      if (this.dictId) {
        const form = initForm(this.dictId, row.id);
        const { data } = await addTestDict(form);
        if (data) {
          this.$message("操作成功");
          this.loadPage();
        }
      }
    },
    edit(row) {
      this.isEdit = true;
      this.value = row.label;
    },
    async check(row) {
      console.log(row);
      if (this.dictId) {
        const form = updateForm(row.id, this.dictId, row.parentId, this.value);
        const { data } = await updateTestDict(form);
        if (data) {
          this.isEdit = false;
          this.$message("操作成功");
          this.loadPage();
        }
      }
    },
    close() {
      this.isEdit = false;
      this.$emit("update");
    },
    async remove(row) {
      this._handleComfirm(row.id, this.delDictById, "删除");
    },
    loadPage() {
      this.$emit("update");
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree-item ::v-deep .el-input__inner {
  height: 28px !important;
}
.tree-item ::v-deep .el-input {
  margin-right: 20px !important;
}
</style>
