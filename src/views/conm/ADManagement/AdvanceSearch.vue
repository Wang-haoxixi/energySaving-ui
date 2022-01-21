<template>
  <div>
    <el-form :model="form" label-width="120px" label-position="top">
      <el-form-item label="关键字">
        <el-input v-model="form.name" placeholder="请输入关键字进行搜索" clearable></el-input>
      </el-form-item>
      <el-form-item label="广告位">
        <el-select v-model="form.adslotId" placeholder="请选择广告位" clearable>
          <el-option
            v-for="item in adslotOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
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
const initForm = () => {
  return {
    name: "",
    adslotId: "",
  };
};
export default {
  name: "SearchFilter",
  props: {
    adslotOptions: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      form: initForm(),
    };
  },
  methods: {
    clearSearchParam() {
      this.form = initForm();
    },
    searchPage() {
      this.$emit("search-page", this.form);
    },
  },
};
</script>