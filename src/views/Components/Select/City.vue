<template>
  <el-cascader :options="cityTree" :props="props" filterable clearable v-bind="$attrs" v-on="$listeners"></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepSelectCity",
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
    ...mapGetters(["cityTree"]),
  },
};
</script>
