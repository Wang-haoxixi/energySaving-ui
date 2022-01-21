<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <el-form-item label="课件类型：">
      <IepDictSelect v-model="form.type" dictName="course_ware_type" clearable></IepDictSelect>
    </el-form-item>
    <el-form-item label="排序方式：">
      <el-select v-model="form.sort" placeholder="请选择排序方式" clearable>
        <el-option
          v-for="item in sortOptions"
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
import { initSearchForm } from "./options";
export default {
  data() {
    return {
      form: initSearchForm(),
      sortOptions: [
        {
          label: "文件大小(升序)",
          value: "1",
        },
        {
          label: "上传时间(降序)",
          value: "2",
        },
      ],
    };
  },

  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
    },
  },
};
</script>
