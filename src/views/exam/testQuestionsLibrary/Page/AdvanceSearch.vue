<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="分类：">
      <el-select v-model="form.kind" placeholder="请选择分类" clearable>
        <el-option
          v-for="item in dictOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="题型：">
      <IepDictSelect v-model="form.type" dictName="exam_question_type" clearable></IepDictSelect>
    </el-form-item>
    <el-form-item label="难度：">
      <IepDictSelect v-model="form.level" dictName="exam_difficulty" clearable></IepDictSelect>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getTestDictPage } from "@/api/qms/test_questions_library";
import { initSearchForm } from "./option";
import { customTree } from "@/util/util";
export default {
  data() {
    return {
      form: initSearchForm(),
      dictOptions: [],
    };
  },

  created() {
    this.initDict();
  },

  methods: {
    async initDict() {
      const params = { category: 1 };
      const {
        data: { children: data },
      } = await getTestDictPage(params);
      this.dictOptions = customTree(data, { label: "label", value: "value" });
    },
    handleChange() {},
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
  },
};
</script>
