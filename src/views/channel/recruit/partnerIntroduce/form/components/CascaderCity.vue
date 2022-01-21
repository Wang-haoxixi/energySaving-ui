<template>
  <el-cascader
    v-model="v"
    :options="cityTree"
    :props="props"
    separator="-"
    filterable
    clearable
    :placeholder="placeholder"
  ></el-cascader>
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
};
</script>
