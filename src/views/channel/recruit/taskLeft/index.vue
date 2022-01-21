<template>
  <div class="body">
    <!-- tab -->
    <div class="tab-list">
      <div class="tab-head">
        <iep-tabs
          class="tab-item"
          v-model="tabName"
          :tab-list="tabList"
          @tab-click="handleTabClick"
        ></iep-tabs>
        <div class="tab-search">
          <iep-operation-search
            @search-page="searchPage"
            :paramForm="paramForm"
            advance-search
            prop="name"
          ></iep-operation-search>
        </div>
      </div>
      <SearchForm ref="search" @searchPage="searchPage" :tab="tabName"></SearchForm>
      <component v-bind:is="tabName" ref="list"></component>
    </div>
  </div>
</template>
<script>
import { tabList } from "./options";
import job from "./job";
import partner from "./partner";
import SearchForm from "./searchForm";

export default {
  components: { job, partner, SearchForm },
  data() {
    return {
      tabList,
      tabName: tabList[0].value,
      paramForm: {},
    };
  },
  methods: {
    loadPage(row = {}) {
      this.$refs.list.loadPage(row);
    },
    searchPage(row) {
      this.$refs.list.searchPage(row);
    },
    handleTabClick(val) {
      this.$router.push({ query: { tab: val.name } });
      this.$refs.search.initSearch();
      this.$nextTick(() => {
        this.loadPage();
      });
    },
  },
  mounted() {
    this.loadPage(this.$route.query);
  },
  created() {
    const query = this.$route.query;
    if (query.tab) this.tabName = query.tab;
  },
};
</script>
<style lang="scss" scoped>
.body {
  width: 100%;
  .tab-list {
    margin: 0 auto 10px;
    .tab-head {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
