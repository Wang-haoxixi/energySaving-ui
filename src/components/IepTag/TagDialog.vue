<template>
  <iep-dialog :dialog-show="dialogShow" title="添加标签" width="520px" @close="cancel">
    <iep-operation-container>
      <template slot="right">
        <iep-operation-search @search-page="searchPage"></iep-operation-search>
      </template>
    </iep-operation-container>
    <div class="tag-list" v-loading="isLoadTable">
      <el-tag
        v-for="tag in pagedTable"
        :key="tag.tagId"
        @click="handleSelect(tag.name)"
      >{{tag.name}}</el-tag>
    </div>
    <iep-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :pagination-option="pagination"
      :page-sizes="[10, 20, 30, 40]"
      layout="prev, pager, next"
      :pager-count="5"
      prev-text="上一页"
      next-text="下一页"
      background
    ></iep-pagination>
  </iep-dialog>
</template>
<script>
import { getTagPage } from "@/api/tms/tag";
function pageOption() {
  return {
    page: 1,
    limit: 10,
  };
}
export default {
  data() {
    return {
      dialogShow: false,
      selectedTags: [],
      pagedTable: [],
      multipleSelection: [],
      isLoadTable: true,
      pagination: pageOption(),
      pageOption: pageOption(),
      searchForm: {},
    };
  },
  methods: {
    searchPage(param) {
      this.pageOption = pageOption();
      this.searchForm = param;
      this.loadPage(param);
    },
    handleSelect(name) {
      this.dialogShow = false;
      this.$emit("select-one", name);
    },
    loadPage(param = this.searchForm) {
      this.loadTable(param, getTagPage);
    },
    loadTable(param, requestFn) {
      this.isLoadTable = true;
      requestFn({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, limit, total, page } = data;
        const isBug = total / limit + 1 === page;
        if (isBug && total !== 0) {
          this.searchPage(); // 防止分页为空页的情况
        } else {
          this.pagination = { page, limit, total };
        }
        this.pagedTable = records.filter(m => {
          return !this.selectedTags.includes(m.name);
        });
        this.isLoadTable = false;
      });
    },
    handleSizeChange(val) {
      this.pageOption.limit = val;
      this.loadPage();
    },
    handleCurrentChange(val) {
      this.pageOption.page = val;
      this.loadPage();
    },
    cancel() {
      this.dialogShow = false;
      this.$emit("load-page");
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-list {
  margin: 20px;
}
</style>
