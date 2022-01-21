<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="考试名称：">
      <el-input v-model.trim="form.examName" placeholder="请输入考试名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="考试分类：">
      <el-input @focus="handleFocus" v-model="form.kind" clearable placeholder="请输入考试分类"></el-input>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select v-model="form.sort" placeholder="请选择">
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage()">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
    <dialogType
      ref="dialogType"
      @save="handleActive"
      :checkTreeMenu="propTreeMenu"
      :dialogTitle="`试卷分类`"
    ></dialogType>
  </el-form>
</template>
<script>
import { getTestDictPage } from "@/api/qms/test_questions_library";
import { initSearchForm, sortOptions } from "./options";
import dialogType from "@/views/exam/testQuestionsLibrary/Page/dialogType";
export default {
  components: {
    dialogType,
  },
  data() {
    return {
      sortOptions,
      propTreeMenu: {},
      form: initSearchForm(),
    };
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
    handleActive(val) {
      this.$nextTick(() => {
        this.propTreeMenu = val;
        this.$set(this.form, "qTypeString", val.selectString);
        this.$set(this.form, "kind", val.selectCn);
        this.searchPage();
      });
    },
    handleFocus() {
      this.$refs["dialogType"].dialogShow = true;
      this.$refs["dialogType"].btnDisabled = false;
      const type = 2;
      const params = {};
      params.category = type;
      getTestDictPage(params).then(res => {
        const data = res.data.children;
        data.children ? data.children : [];
        this.$refs["dialogType"].data = data;
        this.$refs["dialogType"].dictId = res.data.id;
        this.$refs["dialogType"].category = type;
        this.$refs["dialogType"].defalutArray = [res.data.children[0].id];
        if (this.propTreeMenu.selectCn) {
          this.$refs["dialogType"].defalutArray = this.propTreeMenu.selectArray;
        }
      });
    },
  },
};
</script>
