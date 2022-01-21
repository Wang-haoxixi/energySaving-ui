<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="考试名称：">
      <el-input v-model.trim="form.examName" placeholder="请输入考试名称" clearable></el-input>
    </el-form-item>
    <template v-if="isPlatform">
      <el-form-item label="开放范围：">
        <el-select v-model="form.openScope" placeholder="请选择开放范围">
          <el-option
            v-for="item in openScopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item label="考试分类：">
        <el-select v-model="form.kind" placeholder="请选择考试分类" clearable>
          <el-option
            v-for="item in dictOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
    <el-form-item label="排序方式：">
      <el-select v-model="form.sort" placeholder="请选择排序方式">
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
  </el-form>
</template>
<script>
import { getTestDictPage } from "@/api/qms/test_questions_library";
import { initSearchForm, sortOptions } from "./options";
import { customTree } from "@/util/util";
import { openScopeOptions } from "./options";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      openScopeOptions,
      sortOptions,
      dictOptions: [],
      form: initSearchForm(),
    };
  },
  created() {
    this.initDict();
  },
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    isPlatform() {
      return this.currentMenuGroup.id === 2;
    },
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
    async initDict() {
      const params = { category: 2 };
      const {
        data: { children: data },
      } = await getTestDictPage(params);
      this.dictOptions = customTree(data, { label: "label", value: "value" });
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
      getTestDictPage(params).then((res) => {
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
