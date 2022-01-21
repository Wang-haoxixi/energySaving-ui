<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
      </template>
      <template slot="right">
        <iep-table-density></iep-table-density>
        <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
        <iep-operation-search placeholder="请输入关键词" prop="name" @search-page="searchPage"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      :isLoadTable="isLoadTable"
      border
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      is-mutiple-selection
    >
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import { getContactPage, delPageById } from "@/api/dms/custom_follow.ts";
import mixins from "@/mixins/mixins";
// import { pageOption } from "@/const/pageConfig";
import { columnsMap } from "../../FollowRecords/options";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins, mixins],
  data() {
    return {
      checked: true,
      columnsMap,
      pagedTable: [],
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
        {
          name: "删除",
          func: this.handleMoreDel,
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
    ...mapGetters(["dictGroup"]),
    dms_followup_status() {
      return this.dictGroup.get("dms_followup_status");
    },
    id() {
      return +this.$route.params.id;
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage(param = this.searchForm, fn = (m) => m) {
      this.isLoadTable = true;
      const { data } = await getContactPage({
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
      this.$openPage(
        `/crms/follow_records_edit/0?my=${"my"}&clientId=${this.id}`,
      );
    },
    handleEdit(row) {
      this.$openPage(
        `/crms/follow_records_edit/${row.recordId}?my=${"my"}&clientId=${
          this.id
        }`,
      );
    },
    handleDel(row) {
      this._handleComfirm(row.recordId, delPageById, "删除跟进记录");
    },
  },
};
</script>
