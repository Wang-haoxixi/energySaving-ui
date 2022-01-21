<template>
  <iep-operation-search
    @search-page="searchPage"
    :paramForm="paramForm"
    advance-search
    prop="materialName"
    placeholder="材料名"
  >
    <el-form :model="paramForm" label-width="80px" label-position="top">
      <el-form-item label="材料名称：">
        <el-input v-model="paramForm.materialName"></el-input>
      </el-form-item>
      <el-form-item label="上传者：">
        <el-input v-model="paramForm.uploaderName"></el-input>
      </el-form-item>
      <el-form-item label="标签：">
        <el-select
          v-model="paramForm.tagName"
          filterable
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.tagId"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage(paramForm)">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </iep-operation-search>
</template>

<script>
import { initSearchForm } from "./options";
import { getTagPage } from "@/api/tms/tag";

export default {
  data() {
    return {
      paramForm: initSearchForm(),
      options: [],
      loading: false,
    };
  },
  methods: {
    searchPage(val) {
      const obj = val ? val : this.paramForm;
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
    remoteMethod(query = "") {
      this.loading = true;
      getTagPage({
        name: query,
      }).then(({ data }) => {
        this.options = data.records;
        this.loading = false;
      });
    },
  },
  created() {
    this.remoteMethod();
  },
};
</script>

<style lang="scss" scoped>
.Classes {
  display: flex;
  justify-content: space-between;
  .first,
  .second {
    width: 49%;
  }
}
</style>
