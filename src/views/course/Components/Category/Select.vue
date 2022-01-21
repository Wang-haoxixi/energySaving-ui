<template>
  <div class="category-select">
    <el-cascader
      v-model="kind"
      :options="dictOptions"
      :placeholder="placeholder"
      :props="{ checkStrictly: true }"
      filterable
      clearable
    ></el-cascader>
    <el-button class="add-btn" icon="el-icon-plus" @click="handleCategory()">添加</el-button>
    <CategoryDialog ref="CategoryDialog" @update-data="updateData"></CategoryDialog>
  </div>
</template>
<script>
import _ from "lodash";
import CategoryDialog from "./Dialog";
import { getTestDictPage } from "@/api/qms/course_courseware";
import { filterNodeNilChildren } from "@/util/tree";
import {
  //  CourseCategory,
  courseCategoryTextMap,
} from "../../options";
export default {
  name: "CategorySelect",
  props: ["value", "category"],
  components: {
    CategoryDialog,
  },
  data() {
    return {
      dictOptions: [],
    };
  },
  mounted() {
    this.initDict();
  },
  computed: {
    kind: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    placeholder() {
      const name = courseCategoryTextMap[this.category];
      return `请选择${name}分类`;
    },
  },
  methods: {
    async initDict() {
      const {
        data: { children: data },
      } = await getTestDictPage({ category: this.category });
      this.dictOptions = filterNodeNilChildren(data);
    },
    handleCategory() {
      this.$refs["CategoryDialog"].open(this.category);
    },
    updateData(data) {
      const originData = _.cloneDeep(data);
      this.dictOptions = filterNodeNilChildren(originData);
    },
  },
};
</script>
<style lang="scss" scoped>
.category-select {
  display: flex;
  width: 100%;
  align-items: center;
  .add-btn {
    margin-left: 10px;
  }
}
</style>
