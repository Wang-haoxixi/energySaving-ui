<template>
  <iep-operation-search @search-page="searchPage" :paramForm="paramForm" prop="question">
    <el-form :model="paramForm" label-width="120px" label-position="top">
      <iep-form-item label-name="关键字">
        <el-input v-model="paramForm.question"></el-input>
      </iep-form-item>
    </el-form>
  </iep-operation-search>
</template>

<script>
import { initSearchForm } from "./options";

export default {
  data() {
    return {
      paramForm: initSearchForm(),
      firstClass: [],
      secondClass: [],
    };
  },
  methods: {
    searchPage(val) {
      this.$emit("searchPage", val);
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
