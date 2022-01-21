<template>
  <el-select :placeholder="placeholder" :disabled="disabled" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item[id]" :label="item.name" :value="item[id]"></el-option>
  </el-select>
</template>
<script>
import { getCommonPage } from "@/api/common";
export default {
  name: "IepCommonSelect",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    prefixUrl: {
      type: String,
      required: true,
    },
    optId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      options: [],
      parmas: {
        clientId: "",
      },
      disabled: true,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (this.optId) {
        this.parmas.clientId = this.optId;
      }
      if (this.optId || this.id === "clientId") {
        this.disabled = false;
      }
      getCommonPage(this.prefixUrl, this.parmas).then(data => {
        this.options = data.data.records;
      });
    },
  },
  watch: {
    optId() {
      this.load();
    },
  },
};
</script>
