<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="关键字：">
      <el-input v-model="form.title" placeholder="请输入关键字"></el-input>
    </el-form-item>
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
    <el-form-item label="组卷方式：">
      <el-select v-model="form.generateType" placeholder="请选择组卷方式" clearable>
        <el-option
          v-for="item in generateTypeDictOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      generateTypeDictOptions: [
        {
          label: "固定试卷",
          value: "1",
        },
        {
          label: "随机试卷",
          value: "2",
        },
      ],
    };
  },

  created() {
    this.initDict();
  },

  methods: {
    async initDict() {
      const params = { category: 2 };
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
