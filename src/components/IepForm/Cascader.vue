<template>
  <el-cascader :placeholder="placeholder" :options="options" @change="handleChange" v-bind="$attrs" v-on="$listeners">
  </el-cascader>
</template>
<script>
import { getCommonList } from "@/api/common";
export default {
  name: "IepCascader",
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    prefixUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  created() {
    getCommonList(this.prefixUrl).then(({ data }) => {
      this.options = data.data;
    });
  },
  methods: {
    handleChange(item) {
      this.$emit("change", item, this.options);
    },
  },
};
</script>
