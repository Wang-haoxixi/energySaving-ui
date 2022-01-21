<template>
  <div class="input-wrapper" :class="{'advance-search': advanceSearch}">
    <el-input
      :placeholder="placeholder"
      prefix-icon="el-icon-search"
      @keyup.enter.native="handleSearch"
      v-model="paramForm.name"
      :maxlength="120"
      clearable
    ></el-input>
    <div class="btn-box" slot="append">
      <el-button class="search-btn" type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <el-popover v-if="advanceSearch" placement="bottom-end" :width="width" trigger="click">
      <slot></slot>
      <el-button class="senior-btn el-icon-woneng-gengduo" slot="reference"></el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "OperationSearch",
  props: {
    placeholder: {
      type: String,
      default: "请输入关键字进行搜索",
    },
    prop: {
      type: String,
      default: "name",
    },
    advanceSearch: {
      type: Boolean,
      default: false,
    },
    params: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "350",
    },
    paramForm: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      input: "",
      form: {},
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search-page", {
        name: this.paramForm.name,
        participate: "",
        status: "",
        tagName: [],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.input-wrapper {
  // display: flex;
  max-width: 350px;
  margin: 0 auto;
  // height: 50px;
  // align-items: center;
  .btn-box {
    display: flex;
    margin-left: 10px;
  }
}
.input-wrapper > * {
  margin-right: 5px;
}
.input-wrapper ::v-deep .el-input.is-active .el-input__inner {
  border-color: #eff0f1;
}
.advance-search ::v-deep .el-input-group__append {
  border-radius: 0;
  padding: 0;
  background-color: #fff;
}
.advance-search ::v-deep .el-input--prefix .el-input__inner {
  width: 630px;
}
.input-wrapper ::v-deep .el-input__inner:focus {
  border-color: #eff0f1;
}
.input-wrapper .el-input .btn-box ::v-deep .el-button--default.senior-btn {
  margin: 0px;
  padding: 9px 5px;
  width: 36px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #eff0f1;
  background-color: #fff;
  color: $--color-text-secondary;
}
.input-wrapper ::v-deep .el-input-group {
  width: inherit;
  margin-right: 0;
}
.input-wrapper .search-btn {
  margin: 0px;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  &:focus,
  &:hover {
    opacity: 0.8;
  }
}
</style>
