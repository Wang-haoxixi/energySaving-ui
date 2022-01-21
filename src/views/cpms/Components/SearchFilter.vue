<template>
  <el-form class="search-wrapper" @submit.native.prevent>
    <el-form-item class="select-wrapper">
      <el-select
        class="select"
        v-model="searchForm.type"
        @change="handleSearch('category')"
        placeholder="请选择类型"
      >
        <el-option v-for="item in typeList" :key="item.key" :label="item.name" :value="item.key"></el-option>
      </el-select>
      <IepDictSelect
        v-if="searchForm.type"
        v-model="searchForm.category"
        :dictName="categoryNameMap"
        @change="handleSearch()"
        placeholder="请选择类别"
      ></IepDictSelect>
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="请输入关键词"
        v-model="searchForm.name"
        @keyup.enter.native="handleSearch()"
        class="input-search"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { categoryDictNameMap } from "../options";
import { mapGetters } from "vuex";
class ProductSearchDTO {
  type = null;
  category = null;
  name = "";
}
export default {
  name: "SearchFilter",
  data() {
    return {
      options2: [],
      searchForm: new ProductSearchDTO(),
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    noPlanTypesMap() {
      const productTypeList = this.dictGroup
        .get("dms_product_type")
        ?.map(m => ({
          key: m.value,
          name: m.label,
        }));
      return productTypeList ? productTypeList.filter(m => m.key !== "0") : [];
    },
    typeList() {
      const typeList = [
        {
          key: null,
          name: "全部",
        },
        ...this.noPlanTypesMap,
      ];
      return typeList;
    },
    categoryNameMap() {
      return categoryDictNameMap[this.searchForm.type];
    },
  },

  methods: {
    handleSearch(prop) {
      prop && (this.searchForm[prop] = null);
      this.$emit("search-page", this.searchForm);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  justify-content: space-between;
  .select-wrapper {
    .select {
      margin-right: 10px;
    }
  }
  .input-search {
    max-width: 300px;
  }
}
</style>
