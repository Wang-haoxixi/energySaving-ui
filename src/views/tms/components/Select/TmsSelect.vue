<template>
  <el-select
    filterable
    remote
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="handleChange"
    clearable
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>
<script>
import { getResultList } from "@/api/tms/management";
export default {
  name: "TmsSelect",
  inheritAttrs: false,
  props: {
    satelliteWordName: {
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
  methods: {
    handleChange(v) {
      const value = this.options.find(m => m.id === v);
      this.$emit("relation-change", value);
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        try {
          const { data } = await getResultList({ name: query });
          this.options = data.map(m => {
            return {
              id: m.commonId,
              name: m.commonName,
            };
          });
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
    satelliteWordName: function(n) {
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
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>

