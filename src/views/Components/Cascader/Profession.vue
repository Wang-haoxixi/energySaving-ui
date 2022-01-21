<template>
  <el-cascader
    v-model="v"
    :options="professionTree"
    :props="props"
    separator="-"
    :show-all-levels="false"
    filterable
    clearable
  ></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepCascaderProfession",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      props: {
        label: "name",
        value: "name",
      },
    };
  },
  computed: {
    ...mapGetters(["professionTree"]),
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
