<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :isMutipleSelection="false"
        searchName="title"
        rowId="id"
        :loadFunction="getPage"
        @load-page="handleLoad"
      >
        <template #iep-crud-left>
          <span>
            共有
            <span style="color:red;">{{total}}</span>人对试题进行了反馈
          </span>
        </template>
        <template #iep-crud-advance-search>
          <!-- <AdvanceSearch @search-page="handleSearch"></AdvanceSearch> -->
        </template>
        <template #state="{scope}">{{dictsMap.state[scope.row.state]}}</template>
        <template #type="{scope}">{{dictsMap.type[scope.row.type]}}</template>
        <template
          #result="{scope}"
        >{{scope.row.result != '0' ? dictsMap.result[scope.row.result] : '暂无'}}</template>
      </iep-crud-table>
    </iep-basic-container>
    <Deal :record="editData" ref="deal" @loadPage="refreshPage"></Deal>
  </div>
</template>
<script>
import { dictsMap, columnsMap } from "../../const/feedbackOptions.ts";
import { getPage } from "@/api/qms/feedback";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import Deal from "./Deal";
export default {
  components: {
    Deal,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      editData: {
        methodName: "新增",
      },
      total: 0,
    };
  },
  mixins: [mixins, operationMixins],
  props: ["record"],
  computed: {
    operationOptions() {
      return [
        {
          name: "详情",
          func: this.handleDetail,
          hidden: false,
          disabled: false,
        },
      ];
    },
  },
  methods: {
    refreshPage() {
      this.$refs["CrudTable"].searchPage();
    },
    useGuide() {
      this.$emit("onGuide");
    },
    handleLoad(record) {
      this.total = record.total;
    },
    getPage,
    handleDetail(row) {
      this.editData = {
        id: row.id,
        edit: true,
      };
      this.$refs.deal.dialogShow = true;
      this.$refs.deal.open(this.editData);
    },
  },
};
</script>
<style scoped lang="scss">
.title-desc {
  font-size: 14px;
  color: gray;
}
</style>
