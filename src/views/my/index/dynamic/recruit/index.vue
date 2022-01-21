<template>
  <div class="recruit">
    <iep-operation-container>
      <template slot="left">
        <el-radio-group v-model="searchForm.state" @change="handleSearch()">
          <el-radio-button
            v-for="item of state"
            :label="item.value"
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
        <recruit-row-item
          @changeOrg="handleChangeOrg"
          v-for="item of pagedTable"
          :key="item.id"
          :value="item"
        ></recruit-row-item>
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
// import { dictsMap } from "@/views/recruit/jobList/options";
import { recruitMyRelease } from "@/api/dms/recruit";
import { mapGetters, mapActions } from "vuex";
import mixins from "@/mixins/mixins";
import RecruitRowItem from "./RecruitRowItem";
const dictsMap = {
  state: {
    0: "招聘中",
    1: "已停止",
  },
};
const initSearchForm = () => {
  return {
    orgName: "",
    state: "",
  };
};
export default {
  name: "recruit",
  mixins: [mixins],
  components: {
    RecruitRowItem,
  },
  data() {
    return {
      searchForm: initSearchForm(),
      layout: "prev, pager, next",
      isRoute: true,
    };
  },
  computed: {
    ...mapGetters(["currentMenuGroup", "userInfo"]),
    state() {
      const { state } = dictsMap;
      return [
        { label: "全部", value: "" },
        ...Object.keys(state).map(m => ({
          label: state[m],
          value: m,
        })),
      ];
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async loadPage(param = { ...this.searchForm }) {
      this.loadTable(param, recruitMyRelease);
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);
  gap: 20px;
}
</style>