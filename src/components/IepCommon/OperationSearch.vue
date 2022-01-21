<template>
  <div class="input-wrapper" :class="{'advance-search': advanceSearch}">
    <el-input
      class="iep-no-box-shadow"
      :placeholder="placeholder"
      @keyup.enter.native="handleSearch"
      v-model="input"
      :maxlength="120"
      clearable
    >
      <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch()"></i>
    </el-input>
    <el-popover v-if="advanceSearch" placement="bottom-end" width="350" trigger="click">
      <slot></slot>
      <el-button class="senior-btn-down el-icon-woneng-gengduo" slot="reference"></el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "IepOperationSearch",
  provide() {
    return {
      // hack 方式来取消 element el-form-item 带来的副作用
      elFormItem: "",
      elForm: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入关键字进行搜索",
    },
    prop: {
      type: String,
      default: "name",
    },
  },
  data() {
    return {
      input: "",
      form: {},
      advanceSearch: false,
    };
  },
  created() {
    if (this.$route.query[this.prop]) {
      this.input = this.$route.query[this.prop];
    }
    this.advanceSearch = this.$slots.default ? true : false;
  },
  methods: {
    clear() {
      this.input = "";
    },
    handleSearch() {
      this.form[this.prop] = this.input;
      this.$emit("search-page", this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  max-width: 350px;
  margin: 0 auto;
}
.input-wrapper > * {
  margin-right: 5px;
}
.advance-search ::v-deep .el-input-group__append {
  border-radius: 0;
}
.input-wrapper ::v-deep .senior-btn {
  margin-left: -2px;
  padding: 9px 5px;
  border-radius: 0 $--border-radius-base $--border-radius-base 0;
}
.input-wrapper ::v-deep .el-input-group {
  width: inherit;
  margin-right: 0;
}
.iep-no-box-shadow ::v-deep {
  .el-input__icon {
    font-size: 18px;
    line-height: 34px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.iep-no-box-shadow {
  position: relative;
  margin-right: 0;
  height: 36px;
  ::v-deep .el-input-group__append {
    position: absolute;
    top: 1px;
    right: 10px;
    padding: 0;
    height: 36px;
    line-height: 36px;
    background: none;
  }
  ::v-deep .el-input__inner {
    height: 36px;
    padding: 0 55px 0 10px;
    width: 260px;
    text-indent: 0 !important;
    border-radius: 10px;
  }
}
.senior-btn-down {
  margin-left: 10px;
  margin-right: -5px;
  padding: 0;
  width: 36px;
  height: 36px;
  font-size: 18px;
  line-height: 16px;
  text-align: center;
  border-radius: 10px;
  border-color: #eff0f1;
  color: $--color-text-secondary;
  &:hover,
  &:focus {
    border-color: $--custom-menu-background-color !important;
    background-color: $--custom-menu-background-color;
    color: $--color-primary;
  }
}
</style>
