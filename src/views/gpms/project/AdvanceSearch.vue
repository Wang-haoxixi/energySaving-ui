<template>
  <div>
    <el-form :model="form" label-width="120px">
      <iep-form-item label-name="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </iep-form-item>
      <iep-form-item label-name="所属组织">
        <el-input v-model="form.orgId"></el-input>
      </iep-form-item>
      <iep-form-item label-name="项目等级">
        <iep-dict-select
          v-model="form.projectLevel"
          dict-name="prms_project_level"
          style="width: 100%"
        ></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="是否产品关联">
        <el-radio-group v-model="form.isRelevanceProduct">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="项目经理">
        <el-input v-model="form.manager"></el-input>
      </iep-form-item>
      <el-form-item label>
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm, dictMap, rules } from "./option";
// import { getContactAssociate } from '@/api/crms/contact'
// import { getPageData } from '@/api/crms/customer'
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      form: initSearchForm(),
      clientList: [],
      isLoading: true,
      dictMap,
      rules,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "dictGroup"]),
    ...mapState({
      orgId: state => state.user.userInfo.orgIds,
    }),
  },
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created() {},
  methods: {
    searchPage() {
      this.$emit("search-page", this.form);
    },
    clearSearchParam() {
      this.form = initSearchForm();
      this.$emit("clear-search-param");
    },
  },
};
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

