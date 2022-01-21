<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="课程分类：">
      <el-cascader
        v-model="form.kind"
        :options="dictOptions"
        placeholder="请选择课件分类"
        :props="{ checkStrictly: true }"
        filterable
        clearable
      ></el-cascader>
    </el-form-item>
    <el-form-item label="课程状态：">
      <el-select v-model="form.state" placeholder="请选择课程状态" clearable>
        <el-option v-for="(label, key) in state" :label="label" :value="key" :key="key"></el-option>
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
import { initSearchForm } from "./options";
import { filterNodeNilChildren } from "@/util/tree";
import { CourseCategory } from "../options";
import { dictsMap } from "./options";
import { formToDto } from "../courseware/options";
export default {
  data() {
    return {
      state: dictsMap.state,
      form: initSearchForm(),
      dictOptions: [],
    };
  },
  mounted() {
    this.initDict();
  },
  methods: {
    searchPage() {
      this.$emit("search-page", formToDto(this.form));
    },
    clearSearchParam() {
      this.form = initSearchForm();
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
