<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :operationOptions="operationOptions"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        row-id="id"
        :loadFunction="getProductPage"
        :isMutipleSelection="false"
      >
        <template #iep-crud-advance-search>
          <AdvanceSearch @search-page="handleSearch"></AdvanceSearch>
        </template>
        <template #iep-crud-left>
          <iep-operation-wrapper>
            <template v-if="hasPermissions('cpms_products_add')">
              <!-- <el-button type="primary" @click="handleAdd(0)">发布方案</el-button> -->
              <el-dropdown>
                <el-button slot>
                  发布产品
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(t) in noPlanTypesMap"
                    :key="t.key"
                    @click.native="handleAdd(t.key)"
                  >新增{{t.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <el-checkbox v-if="cpms_products_all_view" v-model="checkAll" @change="handleChange">全部</el-checkbox>
          </iep-operation-wrapper>
        </template>
        <template #name="{scope}">
          <iep-table-link-img-desc
            :img="scope.row.imageUrl"
            :desc="scope.row.synopsis"
            :name="scope.row.name"
            @m-click="handleDetail(scope.row)"
          ></iep-table-link-img-desc>
        </template>
        <template #certificationStatus="{scope}">
          <div>
            {{dictsMap.certificationStatus[scope.row.certificationStatus]}}
            <iep-tip
              v-show="scope.row.certificationStatus===3&&scope.row.rejectReason"
              :message="scope.row.rejectReason"
            ></iep-tip>
          </div>
        </template>
      </iep-crud-table>
    </iep-basic-container>
    <dialog-system ref="dialogSystem"></dialog-system>
  </div>
</template>

<script>
import { putProductById } from "@/api/dms/custom_module";
import {
  getProductPage,
  deleteProductById,
  passingCertifyProductById,
  rejectCertifyProductById,
} from "@/api/dms/product";
import { hasPermissions } from "@/util/menu";
import { mapGetters } from "vuex";
import operationMixins from "@/mixins/operationMixins";
import { dictsMap, columnsMap } from "../options";
import AdvanceSearch from "../Components/AdvanceSearch";
import DialogSystem from "./DialogSystem";
export default {
  components: {
    AdvanceSearch,
    DialogSystem,
  },
  mixins: [operationMixins],
  data() {
    return {
      checkAll: false,
      dictsMap,
      columnsMap,
    };
  },
  computed: {
    ...mapGetters(["dictGroup"]),
    noPlanTypesMap() {
      const productTypeList = this.dictGroup
        .get("dms_product_type")
        ?.map((m) => ({
          key: m.value,
          name: m.label,
        }));
      return productTypeList
        ? productTypeList.filter((m) => m.key !== "0")
        : [];
    },
    operationOptions() {
      return [
        {
          name: "编辑",
          func: this.handleEdit,
          hidden: !hasPermissions("cpms_products_edit_del"),
          disabled: (row) => {
            // 如果审核中只有取消审核
            return row.certificationStatus === "1";
          },
        },
        {
          name: "删除",
          func: this.handleDelete,
          hidden: !hasPermissions("cpms_products_edit_del"),
          disabled: (row) => {
            // 如果审核中只有取消审核
            return row.certificationStatus === "1";
          },
        },
        {
          name: "提交审核",
          func: this.handleCertify,
          hidden: !hasPermissions("cpms_products_review"),
          disabled: (row) => {
            // 如果审核中
            return !(row.certificationStatus === "0");
          },
        },
        {
          name: "取消审核",
          func: this.handleRefuseCertify,
          hidden: !hasPermissions("cpms_products_review"),
          disabled: (row) => {
            // 如果已审核
            return !(row.certificationStatus === "1");
          },
        },
        {
          name: "系统配置",
          func: this.handleSystem,
          hidden: (row) => {
            return !["0", "1"].includes(row.type);
          },
          disabled: (row) => {
            // 如果审核中只有取消审核
            return row.certificationStatus === "1";
          },
        },
      ];
    },
    isAll: {
      get: function () {
        return this.checkAll ? "1" : "0";
      },
      set: function (value) {
        if (value == "1") {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
      },
    },
    cpms_products_view() {
      return hasPermissions("cpms_products_view");
    },
    cpms_products_all_view() {
      return hasPermissions("cpms_products_all_view");
    },
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.isAll = this.$route.query.isAll;
  },
  methods: {
    hasPermissions,
    getProductPage,
    handleSystem(row) {
      this.$refs["dialogSystem"].open(row.id);
    },
    _isNeedApproval(row) {
      if (row.status !== 0) {
        return false;
      } else {
        if (this.cpms_products_review) {
          return true;
        }
        return false;
      }
    },
    async handleRefuseCertify(row) {
      this._handleComfirm(
        row.id,
        rejectCertifyProductById,
        "取消审核",
        null,
        "已取消审核",
      );
    },
    async handleCertify(row) {
      this._handleComfirm(
        row.id,
        passingCertifyProductById,
        "审核",
        null,
        "已发送审核申请",
      );
    },
    handleProductClick(productId) {
      putProductById(productId).then(() => {
        this.$message({
          type: "success",
          message: "加入成功",
        });
      });
    },
    isViewPermissions(row) {
      return this.cpms_products_view || this.userInfo.userId === row.creatorId;
    },
    // 新增
    handleAdd(type = "10") {
      this.$router.push({
        path: "/cpms/product_edit/0",
        query: {
          type,
        },
      });
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: `/cpms/product_edit/${row.id}`,
      });
    },
    handleDetail(row) {
      if (!this.isViewPermissions(row)) {
        return;
      }
      this.$openPage(`/channel/mo_fang/detail/${row.id}`);
    },
    handleSearch(form) {
      this.$refs["CrudTable"].searchPage(form);
    },
    handleChange() {
      this.$refs["CrudTable"].queryForm = {
        isAll: this.isAll,
      };
      this.$refs["CrudTable"].searchPage();
      this.$refs["CrudTable"].clearSearch();
    },
    handleDelete(row) {
      this._handleComfirm(row.id, deleteProductById, "删除产品");
    },
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
  },
};
</script>
