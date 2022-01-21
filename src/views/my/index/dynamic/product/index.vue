<template>
  <div class="product">
    <iep-operation-container>
      <template slot="left">
        <el-radio-group v-model="searchForm.state" @change="handleSearch()">
          <el-radio-button
            :label="item.value"
            v-for="item of certificationStatus"
            :key="item.value"
          >{{item.label}}</el-radio-button>
        </el-radio-group>
      </template>
      <template slot="right">
        <iep-operation-search prop="orgName" placeholder="请输入组织名进行搜索" @search-page="handleSearch"></iep-operation-search>
      </template>
    </iep-operation-container>
    <div v-loading="isLoadTable">
      <div v-if="pagedTable.length" shadow="never" class="container">
        <product-row-item
          @changeOrg="handleChangeOrg"
          v-for="item of pagedTable"
          :key="item.id"
          :value="item"
        ></product-row-item>
      </div>
      <iep-no-data complex v-else></iep-no-data>
    </div>
    <iep-pagination
      @size-change="handlePaginationSizeChange"
      @current-change="handlePaginationCurrentChange"
      :pagination-option="pagination"
      :layout="layout"
      prev-text="上一页"
      next-text="下一页"
      background
    ></iep-pagination>
  </div>
</template>
<script>
import { commonDictsMap } from "@/views/cpms/util";
import mixins from "@/mixins/mixins";
import ProductRowItem from "./ProductRowItem";
import { mapGetters, mapActions } from "vuex";
import { productMyRelease } from "@/api/dms/product";
const initSearchForm = () => {
  return {
    orgName: "",
    state: "",
  };
};
export default {
  name: "product",
  mixins: [mixins],
  components: {
    ProductRowItem,
  },
  data() {
    return {
      searchForm: initSearchForm(),
      layout: "prev, pager, next",
      isRoute: true,
      iepPageSize: 4,
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup", "userInfo"]),
    certificationStatus() {
      const { certificationStatus } = commonDictsMap;
      return [
        { label: "全部", value: "" },
        ...Object.keys(certificationStatus).map(m => ({
          label: certificationStatus[m],
          value: m,
        })),
      ];
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async loadPage(param = { ...this.searchForm }) {
      this.loadTable(param, productMyRelease);
    },
    handleSearch(param) {
      this.searchPage({ ...this.searchForm, ...param });
    },
    async handleChangeOrg(id) {
      if (this.userInfo.orgId !== id) await this.orgChangeAction(id);
      this.$openPage(`/wel/${this.currentMenuGroup.path}`);
    },
  },
  created() {
    const newForm = this.$route.query;
    this.searchForm = this.$mergeByFirst(this.searchForm, newForm);
    this.loadPage();
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 20px;
}
</style>