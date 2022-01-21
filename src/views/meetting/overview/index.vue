<template>
  <div class="activity-common">
    <iep-basic-container>
      <iep-crud-table
        ref="CrudTable"
        searchName="name"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :loadFunction="getActivityPagePC"
        :is-expand="true"
        :default-expand="true"
        :isMutipleSelection="false"
        :layout="layout"
      >
        <template #iep-crud-left>
          <iep-page-header :title="$route.meta.name"></iep-page-header>
        </template>
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
        <template #iepCrudTableExpend="{scope}">
          <TimeAndCreator :scope="scope"></TimeAndCreator>
        </template>
        <template #poster="{scope}">
          <ActivityImgColumn :scope="scope"></ActivityImgColumn>
        </template>
        <template #detail="{scope}">
          <ActivityInfoColumn :scope="scope"></ActivityInfoColumn>
        </template>
        <template #statusFlag="{scope}">
          <ActivityStatusColumn :scope="scope"></ActivityStatusColumn>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>

<script>
// SO活动管理
import { getActivityPagePC } from "@/api/meetting/publish";
import { columnsListMap, dictsMap } from "./options";
import TimeAndCreator from "../Components/TimeAndCreator";
import ActivityInfoColumn from "../Components/ActivityInfoColumn";
import ActivityImgColumn from "../Components/ActivityImgColumn";
import ActivityStatusColumn from "../Components/ActivityStatusColumn";
import AdvanceSearch from "./AdvanceSearch";

export default {
  components: {
    TimeAndCreator,
    ActivityInfoColumn,
    ActivityImgColumn,
    ActivityStatusColumn,
    AdvanceSearch,
  },
  data() {
    return {
      dictsMap,
      columnsMap: columnsListMap,
      layout: "total, prev, pager, next",
    };
  },
  methods: {
    getActivityPagePC,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      for (const key in form) {
        form[key] || delete form[key];
      }
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./common.scss";
.tabs ::v-deep .el-tabs__header {
  margin-bottom: 0;
}
.activity-common ::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>
