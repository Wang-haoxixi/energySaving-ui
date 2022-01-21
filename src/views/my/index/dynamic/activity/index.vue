<template>
  <div class="activity">
    <iep-operation-container>
      <template slot="left">
        <el-radio-group v-model="searchForm.state" @change="handleSearch()">
          <el-radio-button
            :label="item.value"
            v-for="item of statusFlag"
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
        <activity-row-item
          @changeOrg="handleChangeOrg"
          v-for="item of pagedTable"
          :key="item.id"
          :value="item"
        ></activity-row-item>
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
import { dictsMap } from "@/views/meetting/options";
import { activityMyRelease } from "@/api/meetting/publish";
import ActivityRowItem from "./ActivityRowItem";
import { mapGetters, mapActions } from "vuex";
import mixins from "@/mixins/mixins";
const initSearchForm = () => {
  return {
    orgName: "",
    state: "",
  };
};
export default {
  name: "activity",
  mixins: [mixins],
  components: {
    ActivityRowItem,
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
    statusFlag() {
      const { statusFlag } = dictsMap;
      return [
        { label: "全部", value: "" },
        ...Object.keys(statusFlag).map(m => ({
          label: statusFlag[m],
          value: m,
        })),
      ];
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async loadPage(param = { ...this.searchForm }) {
      this.loadTable(param, activityMyRelease);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
