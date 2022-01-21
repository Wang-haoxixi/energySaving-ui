<template>
  <div class="questionnaire">
    <iep-operation-container>
      <template slot="left">
        <el-radio-group v-model="searchForm.state" @change="handleSearch()">
          <el-radio-button
            :label="item.value"
            v-for="item of state"
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
        <questionnaire-row-item
          @changeOrg="handleChangeOrg"
          v-for="item of pagedTable"
          :key="item.id"
          :value="item"
        ></questionnaire-row-item>
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
import { dictsMap } from "@/views/channel/questionnaire/const/option";
import { mapGetters, mapActions } from "vuex";
import { questionnaireMyPublish } from "@/api/qms/questionnaire";
import mixins from "@/mixins/mixins";
import QuestionnaireRowItem from "./QuestionnaireRowItem";

const initSearchForm = () => {
  return {
    orgName: "",
    state: "",
  };
};
export default {
  name: "questionnaire",
  mixins: [mixins],
  components: {
    QuestionnaireRowItem,
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
      const { status } = dictsMap;
      return [
        { label: "全部", value: "" },
        ...Object.keys(status).map(m => ({
          label: status[m],
          value: m,
        })),
      ];
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async loadPage(param = { ...this.searchForm }) {
      this.loadTable(param, questionnaireMyPublish);
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