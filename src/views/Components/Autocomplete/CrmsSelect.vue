<template>
  <div class="crms-select">
    <el-autocomplete
      class="inline-input"
      v-model="selectValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入客户名称"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import { getCommonPage } from "@/api/common";

export default {
  name: "IepCrmsSelect",
  data() {
    return {
      selectValue: "",
      restaurants: [],
      loading: false,
      params: {
        current: 1,
        size: 9999,
        clientName: "",
      },
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    async loadAll() {
      this.loading = true;
      const { data } = await getCommonPage(
        "crm/customer/all/list",
        this.params,
      );
      const restaurants = data.records;
      this.loading = false;
      return restaurants;
    },
    handleSelect() {},
  },
  async mounted() {
    this.restaurants = await this.loadAll();
  },
};
</script>

<style lang="scss" scoped>
.crms-select ::v-deep .el-autocomplete {
  width: 100%;
}
</style>
