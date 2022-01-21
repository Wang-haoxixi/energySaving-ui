<template>
  <operation-search
    @search-page="searchPage"
    :paramForm="paramForm"
    prop="name"
    :advance-search="true"
    placeholder="请输入问卷名称"
    width="350"
  >
    <el-form
      :model="paramForm"
      label-width="120px"
      label-position="top"
      style="max-height: 400px; overflow-y: auto;overflow-x: hidden;"
    >
      <iep-form-item label-name="问卷名称">
        <el-input v-model="paramForm.name" placeholder="请输入问卷名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="问卷状态">
        <el-radio-group v-model="paramForm.status">
          <el-radio v-for="(v, i) in dictsMap.status1" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="参与状态">
        <el-radio-group v-model="paramForm.participate">
          <el-radio v-for="(v, i) in dictsMap.participate" :key="i" :label="i">{{ v }}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item class="select" label-name="排序方式">
        <el-select placeholder="排序方式" v-model="paramForm.sortBy" style="width: 100%;" clearable>
          <el-option
            v-for="(item, value) in dictsMap.sortBy"
            :key="value"
            :label="item"
            :value="value"
          ></el-option>
        </el-select>
      </iep-form-item>
      <iep-form-item label-name="标签">
        <el-select
          v-model="paramForm.tagName"
          default-first-option
          allow-create
          filterable
          remote
          placeholder="请输入关键词"
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
      </iep-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage()">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </operation-search>
</template>

<script>
import { initSearchForm, dictsMap } from "../const/option";
import operationSearch from "./Search";
import { getTagName } from "@/api/qms/questionnaire";

export default {
  components: {
    operationSearch,
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
    async remoteMethod(val) {
      this.loading = true;
      // const { data } = await getTagName({ name: val, size: 30 });
      const { data } = await getTagName({ typeId: val });
      this.options = data.records;
      if (!this.options.length) {
        this.options = [
          {
            name: val,
            tagId: new Date().getTime(),
          },
        ];
      }
      this.loading = false;
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
