<template>
  <div>
    <iep-page-header class="sub-title" title="广告管理"></iep-page-header>
    <iep-crud-table
      ref="CrudTable"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :loadFunction="getInfoAdPage(siteId)"
      :operationOptions="operationOptions"
    >
      <template #imageUrl="{scope}">
        <iep-img
          style="height:40px;"
          :src="scope.row.imageUrl"
          :previewSrcList="[scope.row.imageUrl]"
          :resizeOpt="{h:40}"
        ></iep-img>
      </template>
      <template #iep-crud-left>
        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
      </template>
      <template #iep-crud-advance-search>
        <advance-search :adslot-options="adslot" @search-page="handleSearch"></advance-search>
      </template>
      <template #beginDate="{scope}">{{ scope.row.beginDate | parseToTimeSeconds }}</template>
      <template #endDate="{scope}">{{ scope.row.endDate | parseToTimeSeconds }}</template>
    </iep-crud-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import {
  getInfoAdPage,
  postInfoAdPage,
  updateInfoAdPage,
  deleteADById,
} from "@/api/conm/ad_controller.ts";
import { getCommonList } from "@/api/common";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { columnsMap, dictsMap } from "./options.ts";
import DialogForm from "./DialogForm";
import AdvanceSearch from "./AdvanceSearch";
// import { mapGetters } from "vuex";
export default {
  mixins: [mixins, operationMixins],
  components: { DialogForm, AdvanceSearch },
  data() {
    return {
      dictsMap,
      columnsMap,
      siteId: "",
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDelete,
        },
      ],
      adslot: [],
      searchForm: { siteId: this.siteId },
    };
  },
  created() {
    this.siteId = this.$route.params.id;
    this.addDictsMap();
  },
  methods: {
    getInfoAdPage,
    handleAdd() {
      this.$refs["DialogForm"].siteId = this.siteId;
      this.$refs["DialogForm"].formRequestFn = postInfoAdPage;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
    },
    handleEdit(row) {
      console.log('edit_row..', row);
      this.$refs["DialogForm"].siteId = this.siteId;
      this.$refs["DialogForm"].id = row.adId;
      this.$refs["DialogForm"].formRequestFn = updateInfoAdPage;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].loadTypeList();
      this.$refs["DialogForm"].methodName = "编辑";
    },
    handleDelete(row) {
      this._handleComfirm(row.adId, deleteADById, "删除广告");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    async addDictsMap() {
      const { data } = await getCommonList(`cms/info_adslot/${this.siteId}`);
      if (data) {
        this.adslot = data;
        data.forEach(m => {
          this.$set(this.dictsMap.adslotId, m.value, m.label);
        });
      }
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
</style>
