<template>
  <div>
    <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="标签名称">
        <el-input placeholder="请输入标签名称" v-model="form.name" clearable></el-input>
      </iep-form-item>
      <iep-form-item label-name="标签属性">
        <el-select v-model="form.isFree" clearable placeholder="请选择">
          <el-option key="0" label="游离词" :value="0"></el-option>
          <el-option key="1" label="中心词" :value="1"></el-option>
          <el-option key="2" label="卫星词" :value="2"></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="标签分类">
        <el-select v-model="form.typeId" clearable placeholder="请选择">
          <el-option
            v-for="item in typeNameOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="标签级别">
        <el-select v-model="form.levelId" clearable placeholder="请选择">
          <el-option
            v-for="item in levelNameOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="状态">
        <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option key="0" label="废除" :value="0"></el-option>
          <el-option key="1" label="启用" :value="1"></el-option>
        </el-select>
      </iep-form-item>
      <el-form-item>
        <iep-operation-wrapper>
          <el-button type="primary" @click="searchPage">搜索</el-button>
          <iep-button @click="clearSearchParam">清空</iep-button>
        </iep-operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from "./option";
import { getTagTypeList } from "@/api/tms/tag-type";
import { getTagLevelList } from "@/api/tms/tag-level";
export default {
  data() {
    return {
      form: initSearchForm(),
      typeNameOpts: [],
      levelNameOpts: [],
    };
  },
  created() {
    this.loadTagProp();
    this.loadTagLevel();
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
      this.$emit("clear-search-param");
    },
    async loadTagLevel() {
      const data = await getTagLevelList();
      this.levelNameOpts = data.map(m => {
        return {
          label: m.name,
          value: m.levelId,
        };
      });
    },
    async loadTagProp() {
      const data = await getTagTypeList();
      this.typeNameOpts = data.map(m => {
        return {
          label: m.name,
          value: m.typeId,
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

