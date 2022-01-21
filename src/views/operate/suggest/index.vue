<template>
  <div class="opinion-box">
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        searchName="title"
        :loadFunction="getSuggestPage"
      >
        <template #createTime="{scope}">{{scope.row.createTime|parseToTimeMinutes}}</template>
        <template #iep-crud-advance-search>
          <advance-search @search-page="handleSearch"></advance-search>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import { getSuggestPage } from "@/api/admin/suggest";
import AdvanceSearch from "./AdvanceSearch";

export default {
  components: { AdvanceSearch },
  data() {
    return {
      commonOptions: [],
      operationOptions: [
        {
          name: "查看",
          func: this.handleDeal,
        },
      ],
      columnsMap: [
        {
          prop: "creatorName",
          label: "建议人",
          width: 150,
        },
        {
          prop: "title",
          label: "主题",
        },
        {
          prop: "status",
          label: "状态",
          width: 100,
          type: "dict",
        },
        {
          prop: "createTime",
          label: "建议时间",
          width: 150,
          type: "slot",
        },
      ],
      dictsMap: {
        status: {
          1: "待处理",
          2: "已处理",
          3: "已处理",
        },
      },
    };
  },
  methods: {
    getSuggestPage,
    handleDeal(row) {
      this.$openPage(`/operate/suggest_detail/${row.id}`);
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
