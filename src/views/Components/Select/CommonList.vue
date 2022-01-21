<template>
  <el-select :placeholder="placeholder" @change="change" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item in options"
      :key="item[props.value]"
      :label="item[props.label]"
      :value="item[props.value]"
    ></el-option>
  </el-select>
</template>
<script>
import { getCommonList } from "@/api/common";
export default {
  name: "IepSelectCommonList",
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
    props: {
      type: Object,
      default: () => ({
        label: "label",
        value: "value",
      }),
    },
  },
  data() {
    return {
      options: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      const { data } = await getCommonList(this.prefixUrl);
      this.options = data;
    },
    change(value) {
      const item = this.options.find(m => m[this.props.value] === value);
      this.$emit("value-change", item);
    },
  },
  watch: {
    prefixUrl: function() {
      this.load();
    },
  },
};
</script>
