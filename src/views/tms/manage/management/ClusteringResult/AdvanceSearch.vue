<template>
  <div>
    <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
      <iep-form-item label-name="中心词名称">
        <el-input v-model="form.name"></el-input>
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
      <iep-form-item label-name="所属分类">
        <el-select v-model="form.typeId" clearable placeholder="请选择">
          <el-option
            v-for="item in typeNameOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <el-form-item label>
        <el-button type="primary" @click="searchPage">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getTagTypeList } from "@/api/tms/tag-type";
import { getTagLevelList } from "@/api/tms/tag-level";
export default {
  data() {
    return {
      form: {
        name: "",
        levelId: [],
        typeId: [],
      },
      isLoading: true,
      typeNameOpts: [],
      levelNameOpts: [],
    };
  },
  computed: {},
  created() {
    this.loadTagType();
    this.loadTagLevel();
  },
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = {};
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
    async loadTagType() {
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

