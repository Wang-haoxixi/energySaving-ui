<template>
  <el-cascader :options="positionTree" :props="props" filterable clearable v-bind="$attrs" v-on="$listeners"></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepSelectPosition",
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
    ...mapGetters(["positionTree"]),
  },
};
</script>
