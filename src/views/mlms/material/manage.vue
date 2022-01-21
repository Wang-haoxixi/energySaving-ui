<template>
  <div class="material">
    <!-- 列表 -->
    <iep-basic-container class="list" v-show="pageState === 'list'">
      <iep-page-header title="材料"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <iep-button plain @click="handleDelete">删除</iep-button>
        </template>
        <template slot="right">
          <SearchForm @searchPage="searchPage"></SearchForm>
        </template>
      </iep-operation-container>
      <div class="content">
        <table-tpl
          class="table"
          ref="table"
          @mlms-update="handleUpdate"
          @handle-detail="handleDetail"
        ></table-tpl>
      </div>
    </iep-basic-container>
    <!-- 表单 -->
    <form-tpl v-if="pageState === 'form'" ref="form" @load-page="backPage" :fileData="fileData"></form-tpl>
    <!-- 详情 -->
    <detail-tpl v-if="pageState === 'detail'" ref="detail" @load-page="backPage"></detail-tpl>
  </div>
</template>

<script>
import TableTpl from "./table";
import FormTpl from "./form";
import DetailTpl from "./detail";
import operationMixins from "@/mixins/operationMixins";
import { deleteDataByIds } from "@/api/dms/material";
import { getLevelTree } from "@/api/dms/materialLevel";
// import { getLevelIds } from "./option";
import SearchForm from "./searchForm";

export default {
  mixins: [operationMixins],
  components: {
    TableTpl,
    FormTpl,
    DetailTpl,
    SearchForm,
  },
  data() {
    return {
      subTitle: [0],
      pageState: "list",
      fileData: [],
    };
  },
  methods: {
    searchPage(inputSearchForm = undefined) {
      this.$refs.table.searchPage(inputSearchForm);
    },
    handleUpdate(row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].loadData("update", row);
      });
    },
    handleDelete() {
      const ids = this.$refs["table"].selectList.map(m => m.id);
      if (ids.length === 0) {
        this.$message.error("请至少选择一条材料进行删除！");
      } else {
        this._handleComfirm(ids, deleteDataByIds, "删除选中材料");
      }
    },
    handleDetail(row) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs["detail"].getDataById(row);
      });
    },
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    loadPage() {
      this.$refs["table"].loadPage();
    },
    getFileList() {
      getLevelTree().then(({ data }) => {
        this.fileData = data;
      });
    },
  },
  created() {
    this.getFileList();
  },
};
</script>

<style lang="scss" scoped>
</style>
