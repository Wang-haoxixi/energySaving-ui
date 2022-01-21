<template>
  <el-form class="form" :model="form" label-width="120px" label-position="top">
    <div class="left-right">
      <div class="left">
        <iep-form-item label-name="姓名">
          <el-input v-model="form.name"></el-input>
        </iep-form-item>
        <iep-form-item label-name="性别">
          <el-select v-model="form.sex">
            <el-option v-for="(v,k) in dictsMap.sex" :key="k+v" :label="v" :value="+k"></el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="所属省">
          <el-select v-model="form.province">
            <el-option
              v-for="(item,index) in option"
              :key="index"
              :label="item.name"
              :value="+index"
            ></el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="所属市">
          <el-select v-model="form.city" :disabled="disabled">
            <el-option
              v-for="(v,k) in  kidOption[form.province]?kidOption[form.province].map(m=>m.name):''"
              :key="k+v"
              :label="v"
              :value="+k"
            ></el-option>
          </el-select>
        </iep-form-item>
      </div>
      <div>
        <iep-form-item label-name="联系电话">
          <el-input v-model="form.phone"></el-input>
        </iep-form-item>
        <iep-form-item label-name="毕业学校">
          <el-input v-model="form.university"></el-input>
        </iep-form-item>
        <iep-form-item label-name="状态">
          <el-select v-model="form.lockFlag">
            <el-option v-for="(v,k) in dictsMap.lockFlag" :key="k+v" :label="v" :value="+k"></el-option>
          </el-select>
        </iep-form-item>
      </div>
    </div>
    <el-form-item>
      <iep-operation-wrapper>
        <el-button type="primary" @click="searchPage">搜索</el-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </iep-operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap, initSearchForm } from "../options";
import { getCityTree } from "@/api/admin/city";
export default {
  data() {
    return {
      dictsMap,
      form: initSearchForm(),
      option: [],
      kidOption: [],
    };
  },
  created() {
    getCityTree().then(({ data }) => {
      this.option = data;
      this.kidOption = data.map(m => m.children);
    });
  },
  computed: {
    disabled() {
      return this.form.province === "" ? true : false;
    },
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
<style lang="scss" scoped>
.form >>> .el-select {
  width: 100%;
}
.form >>> .el-cascader {
  width: 100%;
}
.form .left-right {
  display: flex;
  justify-content: flex-start;
  .left {
    margin-right: 20px;
  }
}
</style>
