<template>
  <div class="material">
    <iep-operation-container>
      <template slot="left">
        <el-radio-group v-model="searchForm.isOriginal" @change="handleSearch()">
          <el-radio-button
            :label="item.value"
            v-for="item of isOriginal"
            :key="item.value"
          >{{item.label}}</el-radio-button>
        </el-radio-group>
      </template>
      <template slot="right">
        <iep-operation-search @search-page="handleSearch"></iep-operation-search>
      </template>
    </iep-operation-container>
    <div v-loading="isLoadTable">
      <div v-if="pagedTable.length" shadow="never" class="container">
        <material-row-item
          @changeOrg="handleChangeOrg"
          v-for="item of pagedTable"
          :key="item.id"
          :value="item"
        ></material-row-item>
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
import mixins from "@/mixins/mixins";
import { mapGetters, mapActions } from "vuex";
import MaterialRowItem from "./MaterialRowItem";
import { fetchPage } from "@/api/dms/material";
const dictsMap = {
  isOriginal: {
    "0": "转载",
    "1": "原创",
  },
};
const initSearchForm = () => {
  return {
    name: "",
    isOriginal: "",
  };
};
export default {
  name: "material",
  mixins: [mixins],
  components: {
    MaterialRowItem,
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
    isOriginal() {
      const { isOriginal } = dictsMap;
      return [
        { label: "全部", value: "" },
        ...Object.keys(isOriginal).map(m => ({
          label: isOriginal[m],
          value: m,
        })),
      ];
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async loadPage(param = { ...this.searchForm }) {
      this.loadTable(param, fetchPage);
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