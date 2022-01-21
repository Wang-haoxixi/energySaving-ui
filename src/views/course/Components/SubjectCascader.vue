<template>
  <el-cascader
    :placeholder="placeholder"
    :options="options"
    :props="props"
    @change="handleChange"
    v-bind="$attrs"
    v-on="$listeners"
  ></el-cascader>
</template>
<script>
import { recursiveTraverse } from "@/util/util";
import { getCategoryTreeByNumber } from "@/api/admin/category";
export default {
  name: "SubjectCascader",
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      options: [],
      props: {
        value: "number",
        label: "name",
      },
    };
  },
  created() {
    getCategoryTreeByNumber("COURSE_SUBJECT").then(({ data }) => {
      data.forEach((m) => {
        recursiveTraverse(m);
      });
      this.options = data;
    });
  },
  methods: {
    handleChange(item) {
      this.$emit("change", item, this.options);
    },
  },
};
</script>
