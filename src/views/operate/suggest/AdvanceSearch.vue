<template>
  <el-form class="iep-form-detail" :model="form" label-width="120px" label-position="top">
    <iep-form-item label-name="关键字">
      <el-input placeholder="请输入关键字进行搜索" v-model="form.title" clearable></el-input>
    </iep-form-item>
    <iep-form-item label-name="状态">
      <el-select v-model="form.status" placeholder="请选择状态进行搜索">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </iep-form-item>
    <iep-form-item label-name="开始时间">
      <IepDatePicker v-model="form.startTime" type="datetime" placeholder="请输入开始时间"></IepDatePicker>
    </iep-form-item>
    <iep-form-item label-name="结束时间">
      <IepDatePicker v-model="form.endTime" type="datetime" placeholder="请输入结束时间"></IepDatePicker>
    </iep-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
const initSearchForm = () => {
  return {
    title: "",
    status: "",
    startTime: "",
    endTime: "",
  };
};
const options = [
  {
    label: "待处理",
    value: "1",
  },
  {
    label: "已处理",
    value: "9", //  包括2和3 采纳和驳回的
  },
];
export default {
  data() {
    return {
      form: initSearchForm(),
      options,
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
