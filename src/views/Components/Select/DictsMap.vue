<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="(item,key) in dictsMap" :key="key" :label="item" :value="key">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "IepDictsMapSelect",
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    dictsMap: {
      type: Object,
      required: true,
    },
  },
};
</script>
