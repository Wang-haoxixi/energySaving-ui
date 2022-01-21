<template>
  <div class="search">
    <IepDropdown class="official" v-model="paramForm.isOfficial" :list="isOfficialList"></IepDropdown>
    <iep-operation-search
      @search-page="searchPage"
      :paramForm="paramForm"
      prop="name"
      advance-search
      class="search"
    ></iep-operation-search>
  </div>
</template>

<script>
import { initSearchForm, isOfficialList } from "./options";

export default {
  components: {},
  data() {
    return {
      isOfficial: "",
      isOfficialList,
      paramForm: initSearchForm(),
    };
  },
  methods: {
    searchPage(val) {
      const obj = val ? val : this.paramForm;
      obj.isOfficial = this.paramForm.isOfficial;
      this.$emit("searchPage", obj);
    },
    clearSearchParam() {
      this.paramForm = initSearchForm();
    },
  },
  watch: {
    "paramForm.isOfficial"() {
      this.$emit("searchPage", this.paramForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item__label {
  line-height: 40px;
}
.search {
  display: flex;
  .official {
    cursor: pointer;
    line-height: 36px;
    margin-right: 15px;
  }
}
</style>
