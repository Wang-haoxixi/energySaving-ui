<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item in options"
      :key="item[prop]"
      :label="省略Label(item[label])"
      :value="item[prop]"
    ></el-option>
  </el-select>
</template>
<script>
import { getCommonList } from "@/api/common";
export default {
  name: "IepSelect",
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
    label: {
      default: "label",
    },
    prop: {
      default: "value",
    },
    labelMaxLength: {
      type: Number,
      default: 10,
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
    省略Label(label) {
      return label.slice(0, this.labelMaxLength);
    },
    load() {
      getCommonList(this.prefixUrl).then(({ data }) => {
        data && (this.options = data);
      });
    },
  },
  watch: {
    prefixUrl: function () {
      this.load();
    },
  },
};
</script>
