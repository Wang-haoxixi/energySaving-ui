<template>
  <div class="summary">
    <iep-basic-container v-show="pageState === 'list'">
      <!-- <iep-page-header title="纪要" :replaceText="replaceText" :data="data"></iep-page-header> -->
      <iep-page-header title="纪要"></iep-page-header>
      <iep-tabs class="backstage-tabs" v-model="tabName" :tab-list="tabList" @tab-click="tabClick"></iep-tabs>
      <iep-operation-container>
        <template slot="left">
          <el-button
            @click="handleCreate"
            type="primary"
            icon="el-icon-plus"
            v-if="meeting_summary_add"
            class="button"
          >新增</el-button>
          <el-dropdown size="medium" class="button-box">
            <iep-button type="default" class="button">
              更多操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="handleDeleteByIds"
                v-if="tabName ==='personal' && meeting_summary_delete"
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        :tabName="tabName"
      ></tableTemplate>
    </iep-basic-container>

    <!-- 表单 -->
    <form-tpl ref="form" v-if="pageState === 'form'" @load-page="backPage"></form-tpl>
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
      tabName: "personal",
      tabList: [
        {
          label: "我发布的",
          value: "personal",
        },
        {
          label: "我参与的",
          value: "involved",
        },
        {
          label: "我收到的",
          value: "received",
        },
      ],
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
    handleCreate() {
      this.pageState = "form";
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
    // 头部subTitle方法
    replaceText(arr) {
      return `（本周收到 ${arr[0]} 篇纪要，发布 ${arr[1]} 篇纪要）`;
    },
    tabClick() {
      this.selectList = [];
      this.multipleSelection = [];
      this.$nextTick(() => {
        this.loadPage();
      });
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
