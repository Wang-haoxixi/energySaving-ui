<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        :loadFunction="getProductCertifyPage"
        :isMutipleSelection="false"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch" isSearchOrg></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <el-checkbox v-model="isCheck" @change="handleChange">仅查看提交审核的产品</el-checkbox>
        </template>
        <template #name="{scope}">
          <iep-table-link-img-desc
            :img="scope.row.imageUrl"
            :desc="scope.row.synopsis"
            :name="scope.row.name"
            @m-click="handleDetail(scope.row)"
          ></iep-table-link-img-desc>
        </template>
        <template #type="{scope}">{{scope.row.type==='1' ? '软件' :scope.row.type==='2'?'报告':'暂无'}}</template>
        <template #category="{scope}">
          <div>{{ calculateDict(scope)}}</div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <TopAndRecommand ref="TopAndRecommand" @load-page="loadPage()"></TopAndRecommand>
    <Manager ref="Manager"></Manager>
    <Advance ref="Advance"></Advance>
    <RejectDialog ref="RejectDialog" @load-page="loadPage()"></RejectDialog>
    <CancelDialog ref="CancelDialog" @load-page="loadPage()"></CancelDialog>
  </div>
</template>
<script>
import {
  getProductCertifyPage,
  passCheckCertifyManageById,
  upTopRecommandProduct,
  setProductOfficial,
  setAdvanceProduct,
} from "@/api/dms/product";
import operationMixins from "@/mixins/operationMixins";
import { dictsMap, columnsMap } from "./options";
import { calculateDict } from "../options";
import RejectDialog from "./RejectDialog";
import CancelDialog from "./CancelDialog";
import AdvanceSearch from "../Components/AdvanceSearch";
import TopAndRecommand from "./TopAndRecommand";
import Manager from "./Manager";
import Advance from "./Advance";
export default {
  components: {
    RejectDialog,
    CancelDialog,
    AdvanceSearch,
    TopAndRecommand,
    Manager,
    Advance,
  },
  mixins: [operationMixins],
  data() {
    return {
      dictsMap,
      columnsMap,
      isCheck: false,
      commonOptions: [
        {
          name: "置顶管理",
          func: this.handleTopManager,
        },
        {
          name: "推荐管理",
          func: this.handleRecommandManager,
        },
        // TODO: 等待后端完成
        {
          name: "排序管理",
          func: this.handleAdvanceManager,
        },
      ],
      operationOptions: [
        {
          name: "通过",
          func: this.handlePass,
          hidden: row => {
            // 如果认证中
            return !(row.certificationStatus === "1");
          },
        },
        {
          name: "驳回",
          func: this.handleReject,
          hidden: row => {
            // 如果认证中
            return !(row.certificationStatus === "1");
          },
        },
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "置顶",
          func: this.handleTop,
          hidden: row => {
            return row.isTop !== "0" || row.certificationStatus !== "2";
          },
        },
        {
          name: "推荐",
          func: this.handleRecommand,
          hidden: row => {
            return row.isRecommend !== "0" || row.certificationStatus !== "2";
          },
        },
        {
          name: "取消审核",
          func: this.handleCancel,
          hidden: row => {
            return !(row.certificationStatus === "2");
          },
        },
        {
          name: row => {
            return row.isOfficial === "1" ? "取消官方认证" : "官方认证";
          },
          func: this.handleOfficial,
          hidden: row => {
            return row.certificationStatus !== "2";
          },
        },
        {
          name: "添加排序",
          func: this.handleAdvance,
          hidden: row => {
            return row.isAdvance !== "0" || row.certificationStatus !== "2";
            // return row.certificationStatus !== "2";
          },
        },
      ],
    };
  },
  computed: {
    unSubmitted: {
      get: function() {
        return !this.isCheck ? "1" : "0";
      },
      set: function(value) {
        if (value == "0") {
          this.isCheck = true;
        } else {
          this.isCheck = false;
        }
      },
    },
  },
  mounted() {
    this.unSubmitted = this.$route.query.unSubmitted || "0";
  },
  methods: {
    calculateDict,
    getProductCertifyPage,
    handleOfficial(row) {
      this._handleComfirm(row.id, setProductOfficial, "设置为官方认证");
    },
    handleTopManager() {
      this.$refs["Manager"].type = 1;
      this.$refs["Manager"].dialogShow = true;
    },
    handleRecommandManager() {
      this.$refs["Manager"].type = 2;
      this.$refs["Manager"].dialogShow = true;
    },
    handleAdvanceManager() {
      this.$refs["Advance"].dialogShow = true;
    },
    handleTop(row) {
      this.$refs["TopAndRecommand"].form.id = row.id;
      this.$refs["TopAndRecommand"].form.type = "1";
      this.$refs["TopAndRecommand"].formRequestFn = upTopRecommandProduct;
      this.$refs["TopAndRecommand"].dialogShow = true;
    },
    handleRecommand(row) {
      this.$refs["TopAndRecommand"].form.id = row.id;
      this.$refs["TopAndRecommand"].form.type = "2";
      this.$refs["TopAndRecommand"].formRequestFn = upTopRecommandProduct;
      this.$refs["TopAndRecommand"].dialogShow = true;
    },
    handlePass(row) {
      this._handleComfirm(row.id, passCheckCertifyManageById, "认证通过");
    },
    handleReject(row) {
      this.$refs["RejectDialog"].id = row.id;
      this.$refs["RejectDialog"].dialogShow = true;
    },
    handleCancel(row) {
      this.$refs["CancelDialog"].id = row.id;
      this.$refs["CancelDialog"].dialogShow = true;
      // this._handleComfirm(row.id, lossCheckCertifyManageById, "取消审核");
    },
    handleAdvance(row) {
      this._handleComfirm(row.id, setAdvanceProduct, "添加排序");
    },
    handleDetail(row) {
      this.$openPage(`/channel/mo_fang/detail/${row.id}`);
    },
    handleEdit(row) {
      this.$router.push({
        path: `/cpms/product_edit/${row.id}`,
        query: {
          type: row.type,
          manage: "yes",
        },
      });
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleChange() {
      this.$refs["CrudTable"].queryForm = {
        unSubmitted: this.unSubmitted,
      };
      this.$refs["CrudTable"].searchPage();
      this.$refs["CrudTable"].clearSearch();
    },
  },
};
</script>
