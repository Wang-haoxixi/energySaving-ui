<template>
  <div>
    <div class="cascader-button" @click="handleShow">
      城市：{{v.join("-") || "不限"}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <div class="cascader-input">
      <el-cascader
        ref="cascader"
        v-model="v"
        :options="cityTree"
        :props="props"
        separator="-"
        filterable
        clearable
        :placeholder="placeholder"
      ></el-cascader>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cityTree = require("./city.json");
export default {
  name: "CascaderCity",
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      cityTree: cityTree.data,
      props: {
        label: "name",
        value: "name",
      },
    };
  },
  computed: {
    v: {
      get: function() {
        return this.value.split("-");
      },
      set: function(value) {
        this.$emit("input", value.join("-"));
      },
    },
  },
  methods: {
    handleShow() {
      this.$refs.cascader.$refs.input.$el.click();
    },
  },
};
</script>
<style lang="scss" scoped>
.cascader-button {
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
}
.cascader-input {
  width: 0;
  height: 0;
  overflow: hidden;
  &::v-deep input,
  &::v-deep .el-input,
  &::v-deep .el-cascader {
    height: 0 !important;
  }
}
</style>
