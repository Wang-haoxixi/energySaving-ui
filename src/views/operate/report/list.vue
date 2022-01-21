<template>
  <iep-basic-container>
    <iep-page-header :title="$route.meta.name"></iep-page-header>
    <iep-crud-table
      class="report-management"
      ref="CrudTable"
      :operationOptions="operationOptions"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      row-id="id"
      searchName="tipOffReasonDetailsPartKey"
      placeholder="请输入举报内容进行搜索"
      :loadFunction="fetchPage"
    >
      <template #iep-crud-advance-search>
        <SearchForm @searchPage="searchPage"></SearchForm>
      </template>
      <template #handleStatus="{scope}">
        <div
          :class="scope.row.handleStatus === 0 ? 'iep-red' : 'iep-grey'"
        >{{dictsMap.handleStatus[scope.row.handleStatus]}}</div>
      </template>
    </iep-crud-table>
  </iep-basic-container>
</template>

<script>
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { tableOption, dictsMap } from "./options";
import { fetchPage, deleteByIds } from "@/api/dms/tip_off_manage";
import { mapGetters } from "vuex";
import SearchForm from "./search";

export default {
  mixins: [mixins, operationMixins],
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
  },
  components: { SearchForm },
  data() {
    return {
      isRoute: true,
      dictsMap,
      columnsMap: tableOption,
      operationOptions: [
        {
          name: "审核",
          func: this.handleExamine,
          disabled: row => {
            return row.handleStatus !== 0;
          },
        },
        {
          name: "删除",
          func: this.handleDeleteById,
        },
      ],
    };
  },
  methods: {
    fetchPage,
    loadPage(params = this.params) {
      this.$refs["CrudTable"].loadPage(params);
    },
    // 审核
    handleExamine(row) {
      // this.$emit("examine", row);
      this.$router.push(`/operate/report/detail/${row.id}`);
    },
    // 删除
    handleDeleteById(row) {
      this._handleComfirm([row.id], deleteByIds, "删除");
    },
  },
};
</script>

<style lang="scss" scoped>
.iep-grey {
  color: #c0c4cc;
}
.report-management ::v-deep .title-wrapper {
  margin-bottom: 0;
}
</style>
