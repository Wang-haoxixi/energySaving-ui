<template>
  <div class="header">
    <SearchForm @change-method="changeMethod" @changeSolt="changeSolt" @searchPage="searchPage"></SearchForm>
  </div>
</template>

<script>
import { dictsMap } from "../const/option";
import SearchForm from "./searchForm";
import mixins from "@/mixins/mixins";
export default {
  data() {
    return {
      dictsMap,
    };
  },
  methods: {
    changeMethod(param) {
      this.$emit("change-method", param);
    },
    searchPage(param) {
      this.$emit("search-page", param);
    },
    changeSolt(param) {
      this.$emit("change-solt", param);
    },
  },
  mixins: [mixins],
  components: {
    SearchForm,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 25px auto 25px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 $--background-color;
  border-radius: $--border-radius-base;
  box-sizing: border-box;
}
.header ::v-deep .advance-search {
  display: flex;
  align-items: center;
  margin: 0;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  & > .el-input {
    width: 450px;
    margin-right: 0;
  }
  .el-input-group--append .el-input__inner,
  .el-input-group__append .el-button--default,
  .senior-btn {
    padding: 0;
    width: 36px;
    height: 36px;
    text-align: center;
    font-size: 16px;
  }
  .el-input-group--append .el-input__inner {
    text-indent: 25px;
    border-right: 0;
    border-radius: 10px 0 0 10px;
    border-color: $--border-color;
    &:hover,
    &:focus {
      box-shadow: 0 2px 12px 0 $--background-color;
      border-color: $--color-primary;
    }
  }
  .el-input-group__append {
    border: 0;
    .el-button--default {
      padding: 0 25px;
      text-align: center;
      border-radius: 0;
      border-color: $--color-primary;
      background-color: $--color-primary;
      color: #fff;
      &:hover {
        opacity: 0.7;
        border-color: $--color-primary;
        background-color: $--color-primary;
      }
    }
  }
  .el-input .el-input__icon {
    margin: 0 5px;
    font-size: 18px;
  }
}
</style>
