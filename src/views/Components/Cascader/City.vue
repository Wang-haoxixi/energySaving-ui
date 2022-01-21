<template>
  <el-cascader v-model="v" :options="cityTree" :props="props" separator=" - " filterable clearable></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepCascaderCity",
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
    ...mapGetters(["cityTree"]),
    v: {
      get: function () {
        return this.value.split("-");
      },
      set: function (value) {
        this.$emit("input", value.join("-"));
      },
    },
  },
};
</script>
