<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
          <el-checkbox v-if="client_contact_all" v-model="isMine">查看全部</el-checkbox>
        </template>
        <template slot="right">
          <iep-table-density></iep-table-density>
          <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
          <iep-operation-search placeholder="请输入关键词" prop="name" @search-page="searchPage"></iep-operation-search>
        </template>
      </iep-operation-container>
      <iep-table
        :size="tableSize"
        :isLoadTable="isLoadTable"
        border
        :pagination="pagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
        @selection-change="handleSelectionChange"
        is-mutiple-selection
      >
        <template #name="{scope}">
          <span class="name" @click="handleDetail(scope.row)">{{scope.row.name|| "暂无"}}</span>
        </template>
        <template #area="{scope}">
          <span>{{ dms_district_type.map(m => m.label)[scope.row.area] || "暂无" }}</span>
        </template>
        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>
    </iep-basic-container>
    <transfer ref="transfer" @save="loadPage"></transfer>
    <apply-contact ref="ApplyContact" @save="loadPage"></apply-contact>
    <deal-contact ref="DealContact" @save="loadPage"></deal-contact>
  </div>
</template>
<script>
import Transfer from "../Customer/Components/Transfer";
import ApplyContact from "./Components/ApplyContact";
import DealContact from "./Components/DealContact";
import {
  getAllPage,
  getPage,
  createApplyPage,
  getTransfer,
} from "@/api/dms/custom_contact";
import { columnsMap } from "./options";
import operationMixins from "@/mixins/operationMixins";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
import { hasPermissions } from "@/util/menu";
export default {
  components: {
    Transfer,
    ApplyContact,
    DealContact,
  },
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
          hidden: true,
          disabled: true,
        },
        {
          name: "转移",
          func: this.handleTransfer,
        },
        {
          name: "申请联系人",
          func: this.handleApplyLinker,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        // {
        //   name: "删除",
        //   func: this.handleDel,
        //   hidden: true,
        //   disabled: false,
        // },
        {
          name: "申请处理",
          func: this.handleDeal,
          hidden: (row) =>
            (row.applyCount ? false : true) || !this.client_apply_deal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["dictGroup", "tableSize"]),
    dms_district_type() {
      return this.dictGroup.get("dms_district_type");
    },
    client_contact_all: () => hasPermissions("client_contact_all"),
    client_apply_deal: () => hasPermissions("client_apply_deal"),
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
    handleSelectionChange(val) {
      this.mutipleSelection = val.map((m) => m.contactId);
    },
    handleTransfer() {
      if (this.mutipleSelection.length === 1) {
        this.$refs["transfer"].dialogShow = true;
        this.$refs["transfer"].fnRequest = getTransfer;
        this.$refs["transfer"].ids = this.mutipleSelection;
      } else {
        this.$message("请选择一条要传的信息");
      }
    },
    handleDeal(row) {
      this.$refs["DealContact"].dialogShow = true;
      this.$refs["DealContact"].contactId = row.contactId;
      this.$refs["DealContact"].name = row.name;
      this.$refs["DealContact"].loadDetail();
    },
    handleApplyLinker() {
      this.$refs["ApplyContact"].dialogShow = true;
      this.$refs["ApplyContact"].fnRequest = createApplyPage;
    },
    handleAdd() {
      this.$openPage("/crms/linker_edit/0");
    },
    handleEdit(row) {
      this.$openPage(`/crms/linker_edit/${row.contactId}`);
    },
    handleDetail(row) {
      this.$openPage(
        `/crms/linker_detail/${row.contactId}?clientId=${row.clientId}`,
      );
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
