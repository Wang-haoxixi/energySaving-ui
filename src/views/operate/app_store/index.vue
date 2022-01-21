<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <iep-crud-table
        ref="CrudTable"
        :commonOptions="commonOptions"
        :operationOptions="operationOptions"
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        rowId="id"
        :loadFunction="getAppStorePage"
        :isMutipleSelection="false"
      >
        <!-- TODO: 搜索字段有 name 与开发者 develop -->
        <template #name="{scope}">
          <iep-img class="iep-avatar-margin-right" :resizeOpt="{l:40}" :src="scope.row['icon']"></iep-img>
          <iep-div-detail :value="scope.row['name']"></iep-div-detail>
        </template>
      </iep-crud-table>
    </iep-basic-container>
  </div>
</template>
<script>
import operationMixins from "@/mixins/operationMixins";
import {
  getAppStorePage,
  upAppStoreById,
  delAppStoreById,
  downAppStoreById,
} from "@/api/admin/app_store";
import { dictsMap } from "./options";
export default {
  mixins: [operationMixins],
  data() {
    return {
      dictsMap,
      commonOptions: [
        {
          icon: "el-icon-plus",
          name: "新增",
          func: this.handleAdd,
        },
      ],
      operationOptions: [
        {
          name: "编辑",
          func: this.handleEdit,
        },
        {
          name: "下架",
          func: this.handle下架,
          hidden: row => {
            return row.status !== "2";
          },
        },
        {
          name: "发布",
          func: this.handle发布,
          hidden: row => {
            return row.status !== "1";
          },
        },
        {
          name: "删除",
          func: this.handleDel,
          hidden: row => {
            return row.status !== "1";
          },
        },
      ],
      columnsMap: [
        {
          prop: "id",
          label: "ID",
          width: "80",
        },
        {
          prop: "name",
          label: "应用名称",
          type: "slot",
        },
        {
          prop: "type",
          label: "应用类型",
          type: "dict",
        },
        {
          prop: "status",
          label: "应用状态",
          type: "dict",
        },
      ],
    };
  },
  methods: {
    getAppStorePage,
    loadPage() {
      this.$refs["CrudTable"].loadPage();
    },
    handleAdd() {
      this.$openPage("/app_store/app_store_detail/0");
    },
    handleEdit(row) {
      this.$openPage(`/app_store/app_store_detail/${row.id}`);
    },
    handle下架(row) {
      this._handleComfirm(row.id, downAppStoreById, "下架应用");
    },
    handle发布(row) {
      this._handleComfirm(row.id, upAppStoreById, "发布应用");
    },
    handleDel(row) {
      this._handleComfirm(row.id, delAppStoreById, "删除应用");
    },
  },
};
</script>
