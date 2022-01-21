<template>
  <el-select
    filterable
    :loading="loading"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
import { getUserHadList } from "@/api/admin/org";
export default {
  name: "IepOrgSelect",
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      options: [],
      loading: false,
    };
  },
  async mounted() {
    const { data } = await getUserHadList();
    this.options = data.map(m => ({
      label: m.name,
      value: m.orgId,
    }));
  },
};
</script>
