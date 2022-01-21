<template>
  <el-cascader :options="industryTree" :props="props" filterable clearable v-bind="$attrs" v-on="$listeners"></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepSelectIndustry",
  inheritAttrs: false,
  data() {
    return {
      props: {
        label: "name",
        value: "id",
      },
    };
  },
  computed: {
    ...mapGetters(["industryTree"]),
  },
};
</script>
