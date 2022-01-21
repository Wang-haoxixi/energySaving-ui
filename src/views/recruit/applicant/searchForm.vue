<template>
  <iep-operation-search
    @search-page="searchPage"
    :paramForm="paramForm"
    advance-search
    prop="name"
    placeholder="请输入岗位/合伙信息进行搜索"
  ></iep-operation-search>
</template>

<script>
import { initSearchForm } from "./options";

export default {
  data() {
    return {
      paramForm: initSearchForm(),
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
  },
  created() {},
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
