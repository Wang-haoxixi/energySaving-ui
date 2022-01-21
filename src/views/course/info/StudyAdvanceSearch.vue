<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="学习状态：">
      <el-select v-model="form.progress" placeholder="请选择学习状态" clearable>
        <el-option v-for="(label, key) in progress" :label="label" :value="key" :key="key"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select v-model="form.sort" placeholder="请选择排序方式" clearable>
        <el-option v-for="(label, key) in sort" :label="label" :value="key" :key="key"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getTestDictPage } from "@/api/qms/course_courseware";
import { filterNodeNilChildren } from "@/util/tree";
import { CourseCategory } from "../options";
import { initStudySearchForm } from "./options";
export default {
  data() {
    return {
      progress: {
        1: "未学习",
        2: "学习中",
        3: "已学习",
      },
      sort: {
        1: "从高到低",
        2: "从低到高",
      },
      form: initStudySearchForm(),
      dictOptions: [],
    };
  },
  mounted() {
    this.initDict();
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initStudySearchForm();
    },
    async initDict() {
      const {
        data: { children: data },
      } = await getTestDictPage({ category: CourseCategory.INFO });
      this.dictOptions = filterNodeNilChildren(data);
    },
  },
};
</script>
