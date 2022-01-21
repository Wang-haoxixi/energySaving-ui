<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
          <el-checkbox v-if="client_record_all" v-model="isMine">查看全部</el-checkbox>
        </template>
        <template slot="right">
          <iep-table-density></iep-table-density>
          <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
          <iep-operation-search placeholder="请输入关键词" prop="theme" @search-page="searchPage"></iep-operation-search>
        </template>
      </iep-operation-container>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        border
        :pagination="pagination"
        :columnsMap="columnsMap"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        :pagedTable="pagedTable"
        is-mutiple-selection
      >
        <template #contactName="{scope}">
          <span class="name" @click="handleDetail(scope.row)">{{scope.row.contactName}}</span>
        </template>
        <template #followStatus="{scope}">
          <span>
            {{
            dms_followup_status.map(m => m.label)[scope.row.followStatus] || "暂无"
            }}
          </span>
        </template>
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </iep-basic-container>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getAllPage, delPageById, getPage } from "@/api/dms/custom_follow.ts";
// import { pageOption } from "@/const/pageConfig";
import mixins from "@/mixins/mixins";
import { columnsMap } from "./options";
import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
export default {
  mixins: [operationMixins, mixins],
  data() {
    return {
      isMine: false,
      columnsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "删除",
          func: this.handleMoreDel,
          disabled: true,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "tableSize"]),
    dms_followup_status() {
      return this.dictGroup.get("dms_followup_status");
    },
    client_record_all: () => hasPermissions("client_record_all"),
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = this.searchForm, fn = (m) => m) {
      const fnRequest = this.isMine ? getAllPage : getPage;
      this.isLoadTable = true;
      const { data } = await fnRequest({
        ...param,
        ...this.pageOption,
        clientId: this.id,
      });
      const { records, size, total, current } = data;
      const isBug = total / size + 1 === current;
      if (isBug && total !== 0) {
        this.searchPage(); // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total };
      }
      this.pagedTable = records.map(fn);
      this.isLoadTable = false;
    },
    handleAdd() {
      this.$openPage("/crms/follow_records_edit/0");
    },
    handleEdit(row) {
      this.$openPage(`/crms/follow_records_edit/${row.recordId}`);
    },
    handleDel(row) {
      this._handleComfirm(row.recordId, delPageById, "删除跟进记录");
    },
    handleDetail(row) {
      this.$openPage(`/crms/follow_records_detail/${row.recordId}`);
    },
  },
  watch: {
    isMine() {
      this.loadPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.name {
  cursor: pointer;
}
</style>
