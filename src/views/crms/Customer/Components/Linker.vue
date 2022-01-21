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
      <template #name="{scope}">
        <span>{{scope.row.name}}</span>
      </template>
      <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
    </iep-table>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import mixins from "@/mixins/mixins";
// import { pageOption } from "@/const/pageConfig";
import { getClientPage } from "@/api/dms/custom_contact.ts";
import { columnsMap } from "../../Linker/options";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins, mixins],
  data() {
    return {
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
          hidden: true,
        },
      ],
    };
  },
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    dms_district_type() {
      return this.dictGroup.get("dms_district_type");
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
      const { data } = await getClientPage({
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
        `/crms/linker_edit/0?my=${"my"}&clientId=${this.id}&title=${
          this.title
        }`,
      );
    },
    handleEdit(row) {
      this.$openPage(
        `/crms/linker_edit/${row.contactId}?my=${"my"}&clientId=${
          this.id
        }&title=${this.title}`,
      );
    },
  },
};
</script>
