<template>
  <el-form class="form el-form--label-top iep-form-detail" :model="form">
    <iep-form-item label-name="机构分类">
      <el-select v-model="form.type">
        <el-option v-for="(v,k) in dictsMap.type" :key="k+v" :label="v" :value="+k"></el-option>
      </el-select>
    </iep-form-item>
    <iep-form-item label-name="所属省">
      <el-select v-model="form.province">
        <el-option v-for="(item,index) in option" :key="index" :label="item.name" :value="+index"></el-option>
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
    <iep-form-item label-name="认证状态">
      <el-select v-model="form.claimStatus">
        <el-option v-for="(v,k) in dictsMap.claimStatus" :key="k+v" :label="v" :value="+k"></el-option>
      </el-select>
    </iep-form-item>
    <iep-form-item label-name="状态">
      <el-select v-model="form.isForbidden">
        <el-option v-for="(v,k) in dictsMap.isForbidden" :key="k+v" :label="v" :value="+k"></el-option>
      </el-select>
    </iep-form-item>
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
// import { mapGetters } from "vuex";
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
  computed: {
    // ...mapGetters(["dictGroup"]),
    disabled() {
      return this.form.province === "" ? true : false;
    },
  },
  created() {
    getCityTree().then(({ data }) => {
      this.option = data;
      this.kidOption = data.map(m => m.children);
    });
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
<style scoped>
.form >>> .el-select {
  width: 100%;
}
.form >>> .el-cascader {
  width: 100%;
}
</style>

