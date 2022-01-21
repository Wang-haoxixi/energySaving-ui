<template>
  <OperationSearch
    width="350"
    prop="name"
    placeholder="请输入关键词"
    :paramForm="paramForm"
    :advance-search="true"
    @change-method="changeMethod"
    @search-page="searchPage"
  >
    <el-form
      :model="paramForm"
      label-width="120px"
      label-position="top"
      style="max-height: 400px; overflow-y: auto;overflow-x: hidden;"
    >
      <el-form-item label="关键词">
        <el-input v-model="paramForm.examName" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="难度级别">
        <el-radio-group v-model="paramForm.level">
          <el-radio v-for="(v, i) in dictsMap.level" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="paramForm.testStatus">
          <el-radio v-for="(v, i) in dictsMap.testStatus" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="select" label="收费状态">
        <el-radio-group v-model="paramForm.chargeStatus">
          <el-radio v-for="(v, i) in dictsMap.chargeStatus" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage()">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </OperationSearch>
</template>

<script>
import { initSearchForm, dictsMap } from "../const/option";
import OperationSearch from "./OperationSearch";

export default {
  components: {
    OperationSearch,
  },
  data() {
    return {
      dictsMap,
      sortBy: "",
      options: [],
      loading: false,
      paramForm: initSearchForm(),
      firstClass: [],
      secondClass: [],
      businessTypeChildren: [],
    };
  },
  // watch: {
  // sortBy(val) {
  //   this.$emit("changeSolt", {
  //     sortBy: val,
  //     current: 1, // 使用排序时理应希望从第一页看起
  //   });
  // },
  // },
  methods: {
    changeMethod(param) {
      this.$emit("change-method", param);
    },
    clearTime() {
      this.paramForm.signTimeBegin = "";
      this.paramForm.signTimeEnd = "";
    },
    searchPage(val) {
      const obj = val ? val : this.paramForm;
      obj.current = 1; //搜索时当前页参数置1
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.business-type {
  display: flex;
  justify-content: space-between;
  .half {
    width: 49%;
  }
}
.el-select {
  width: 100%;
  & ::v-deep .el-input__inner {
    cursor: text;
  }
}
</style>
