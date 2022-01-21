<template>
  <el-cascader
    v-model="v"
    :options="industryTree"
    :props="props"
    separator=" - "
    filterable
    clearable
  ></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepCascaderIndustry",
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
    ...mapGetters(["industryTree"]),
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
