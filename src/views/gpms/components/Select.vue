<template>
  <el-select filterable remote placeholder="请输入项目关键词" :remote-method="remoteMethod" :loading="loading" @change="handleChange" clearable v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.id" :label="(serialNo && item.serialNo) ? `${item.projectName} - ${item.serialNo}` : item.projectName" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getProjectList } from "@/api/gpms/index";
export default {
  name: "IepProjectSelect",
  inheritAttrs: false,
  props: {
    serialNo: {
      type: Boolean,
      default: false,
    },
    projectName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      options: [],
      loading: false,
    };
  },
  created() {},
  methods: {
    handleChange(v) {
      const value = this.options.find(m => m.id === v);
      this.$emit("relation-change", value.relationList, value.name, value);
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        try {
          const res = await getProjectList({ projectName: query });
          this.options = res.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.options = [];
      }
    },
  },
  watch: {
    projectName: function (n) {
      this.options = [
        {
          id: this.$attrs.value,
          name: n,
        },
      ];
    },
  },
};
</script>
