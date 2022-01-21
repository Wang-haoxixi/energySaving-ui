<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <iep-operation-common-group
          :options="commonOptions"
          :multiple-selection="multipleSelection"
          :usePrimary="usePrimary"
        ></iep-operation-common-group>
        <slot name="iep-crud-left"></slot>
      </template>
      <template slot="right">
        <slot name="operation-container"></slot>
        <iep-table-density></iep-table-density>
        <iep-table-header-setting v-model="tableColumnsMap"></iep-table-header-setting>
        <iep-operation-search
          v-if="isCrudSearch"
          ref="operationSearch"
          @search-page="searchPage"
          :prop="searchName"
          :placeholder="placeholder"
        >
          <slot name="iep-crud-advance-search"></slot>
        </iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      ref="CrudTable"
      :size="tableSize"
      :border="border"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="tableColumnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
      @selection-change="handleSelectionChange"
      :is-mutiple-selection="isMutipleSelection"
      :is-expand="isExpand"
      :default-expand="defaultExpand"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot name="iepCrudTableExpend" slot="iepTableExpend" slot-scope="scope" :scope="scope.scope"></slot>
      <template v-for="item in tableColumnsMap" v-slot:[item.prop]="{ scope }">
        <div class="slot-cell" :key="item.prop">
          <slot :name="item.prop" :scope="scope"></slot>
        </div>
      </template>
      <iep-operation-table-btn-group :options="operationOptions" :width="operationWidth"></iep-operation-table-btn-group>
    </iep-table>
  </div>
</template>
<script>
import { pageOption } from "@/const/pageConfig";
import mixins from "@/mixins/mixins";
import { mapGetters } from "vuex";
export default {
  name: "IepCrudTable",
  inheritAttrs: false,
  mixins: [mixins],
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    useRoutePage: {
      type: Boolean,
      default: true,
    },
    isMutipleSelection: {
      type: Boolean,
      default: true,
    },
    isExpand: {
      type: Boolean,
      default: false,
    },
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    rowId: {
      type: String,
      default: "id",
    },
    searchName: {
      type: String,
      default: "name",
    },
    loadFunction: {
      type: Function,
      required: true,
    },
    commonOptions: {
      type: Array,
      default: () => [],
    },
    operationOptions: {
      type: Array,
      default: () => [],
    },
    columnsMap: {
      type: Array,
      default: () => [],
    },
    dictsMap: {
      type: Object,
      default: () => {},
    },
    operationWidth: {
      type: Number,
      default: 120,
    },
    isInitLoad: {
      type: Boolean,
      default: true,
    },
    isCrudSearch: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "请输入关键字进行搜索",
    },
    usePrimary: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isRoute: this.useRoutePage,
      tableColumnsMap: [],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
  },
  created() {
    this.pagination = this._pageOption();
    this.pageOption = this._pageOption();
    this.tableColumnsMap = this.columnsMap;
    if (this.isInitLoad) this.loadPage();
  },
  methods: {
    clearSearch() {
      this.$refs["operationSearch"].clear();
    },
    async loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      const data = await this.loadTable(param, this.loadFunction);
      this.$emit("load-page", data);
    },
    toggleRowSelection(selectOption, records) {
      this.$refs["CrudTable"].toggleRowSelection(selectOption, records);
    },
    // 批量必须加上
    handleSelectionChange(val) {
      this.multipleSelection = val.map((m) => m[this.rowId]);
    },
    _pageOption(isRoute = true) {
      if (isRoute) {
        const page = {
          current: +this.$route.query.current || 0,
          size: +this.$route.query.size || 0,
        };
        if (page.current && page.size) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { current, size, ...sfForm } = this.$route.query;
          this.searchForm = { ...sfForm };
          this.query = { ...sfForm };
          return page;
        } else {
          return pageOption(this.$attrs.pageOptionSize);
        }
      } else {
        return pageOption(this.$attrs.pageOptionSize);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.slot-cell {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}
</style>
