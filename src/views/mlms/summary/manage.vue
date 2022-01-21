<template>
  <div class="summary">
    <iep-basic-container v-show="pageState === 'list'">
      <iep-page-header title="纪要"></iep-page-header>
      <iep-operation-container>
        <template slot="left">
          <iep-button @click="handleDeleteByIds" class="button">删除</iep-button>
        </template>
        <template slot="right">
          <SearchTpl @searchPage="loadPage"></SearchTpl>
        </template>
      </iep-operation-container>

      <tableTemplate
        ref="tableTpl"
        @selectionChange="handleSelectionChange"
        @handleDetail="handleDetail"
        @handleUpdate="handleUpdate"
        :paramForm="paramForm"
        tabName="manage"
      ></tableTemplate>
    </iep-basic-container>

    <!-- 表单 -->
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage" isAdmin></form-tpl>
    <!-- 详情 -->
    <detail-page
      ref="detailPage"
      v-if="pageState === 'detail'"
      @backPage="pageState = 'list'"
      :detailState="true"
    ></detail-page>
  </div>
</template>
<script>
// import { getWeekStartAndEnd } from "./options";
import mixins from "@/mixins/mixins";
import operationMixins from "@/mixins/operationMixins";
import { mapGetters } from "vuex";
import { deleteData } from "@/api/dms/meeting_summary";
import DetailPage from "./detail";
import tableTemplate from "./tableTpl";
import FormTpl from "./form";
import { hasPermissions } from "@/util/menu";
import SearchTpl from "./searchForm";

export default {
  mixins: [mixins, operationMixins],
  components: { tableTemplate, DetailPage, FormTpl, SearchTpl },
  data() {
    return {
      data: [0, 0], // 头部
      paramForm: {},
      selectList: [],
      pageState: "list",
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    meeting_summary_add: () => hasPermissions("meeting_summary_add"),
    meeting_summary_delete: () => hasPermissions("meeting_summary_delete"),
  },
  methods: {
    loadPage(params = {}) {
      let obj = { current: 1, size: 10 };
      obj = Object.assign({}, obj, params);
      this.$refs["tableTpl"].loadPage(obj);
    },
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    handleSelectionChange(val) {
      this.selectList = val;
      this.multipleSelection = val.map(m => m.id);
    },
    // 批量删除
    handleDeleteByIds() {
      if (this.multipleSelection.length > 0) {
        this._handleComfirm(
          this.multipleSelection,
          deleteData,
          "确认删除选中数据",
          "",
          "删除成功",
        );
      } else {
        this.$message.warning("请至少选择一项数据进行操作！");
      }
    },
    handleDetail(row) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs["detailPage"].open(row.id);
      });
    },
    handleUpdate(row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].loadData("update", row);
      });
    },
  },
  created() {},
};
</script>
<style scoped>
.button {
  height: 36px;
  border-radius: 10px;
}
</style>
