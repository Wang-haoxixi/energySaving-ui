<template>
  <el-cascader
    v-model="v"
    ref="cascader"
    :options="positionTree"
    :props="props"
    separator="-"
    :show-all-levels="false"
    filterable
    clearable
    @change="change"
  ></el-cascader>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "IepCascaderPosition",
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
    ...mapGetters(["positionTree"]),
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
    change() {
      const row = this.$refs.cascader.getCheckedNodes()[0];
      this.$emit("GetChange", row);
    },
  },
};
</script>
