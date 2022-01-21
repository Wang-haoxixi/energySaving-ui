<template>
  <el-select
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { getOrgPage } from "@/api/admin/org";
export default {
  name: "IepSelectSearchAllOrg",
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
  methods: {
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const { data } = await getOrgPage({ name: query });
        console.log(data);
        this.loading = false;
        this.options = data.records.map(item => {
          return {
            label: item.name,
            value: item.orgId,
          };
        });
      } else {
        this.options = [];
      }
    },
  },
};
</script>
