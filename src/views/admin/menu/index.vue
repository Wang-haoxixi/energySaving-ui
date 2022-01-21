<template>
  <div>
    <iep-basic-container>
      <iep-page-header :title="$route.meta.name"></iep-page-header>
      <div class="menu-wrapper">
        <MenuGroupAside class="group-wrapper" @active-menu="handleFilter"></MenuGroupAside>
        <div class="item-wrapper">
          <iep-operation-container>
            <template slot="left">
              <iep-operation-common-group :options="commonOptions"></iep-operation-common-group>
            </template>
            <template slot="right">
              <iep-table-density></iep-table-density>
              <iep-table-header-setting v-model="columnsMap"></iep-table-header-setting>
            </template>
          </iep-operation-container>
          <iep-table
            class="item-wrapper"
            :size="tableSize"
            :isLoadTable="isLoadTable"
            border
            :is-pagination="false"
            :dictsMap="dictsMap"
            :columnsMap="columnsMap"
            :pagedTable="filterPagedTable"
            row-key="menuId"
            is-mutiple-selection
            :isMutipleSelection="false"
          >
            <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
          </iep-table>
        </div>
      </div>
    </iep-basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import MenuGroupAside from "./MenuGroupAside";
import operationMixins from "@/mixins/operationMixins";
import DialogForm from "./DialogForm.vue";
import { columnsMap, dictsMap } from "./options";
import {
  getMenuTree,
  postMenu,
  putMenu,
  delMenuById,
  getMenuById,
} from "@/api/admin/menu";
import { customTree } from "@/util/util";
import { MenuItemEntity } from "@/types/menu";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins],
  components: {
    DialogForm,
    MenuGroupAside,
  },
  data() {
    return {
      dictsMap,
      columnsMap,
      isLoadTable: false,
      pagedTable: [],
      myTree: [],
      filterMenuIds: [],
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
          name: "添加子菜单",
          func: this.handleAdd,
        },
        {
          name: "删除",
          func: this.handleDel,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["tableSize"]),
    filterPagedTable() {
      if (!this.filterMenuIds.length) {
        return this.pagedTable;
      }
      return this.pagedTable.filter((m) =>
        this.filterMenuIds.includes(m.menuId),
      );
    },
  },
  created() {
    this.loadPage();
  },
  methods: {
    handleFilter(menuIds) {
      this.filterMenuIds = menuIds;
    },
    handleAdd(row) {
      this.$refs["DialogForm"].form = new MenuItemEntity();
      if (row) {
        this.$refs["DialogForm"].form.parentId = row.menuId;
        this.$refs["DialogForm"].form.type = "1";
      }
      this.$refs["DialogForm"].methodName = "添加";
      this.$refs["DialogForm"].formRequestFn = postMenu;
      this.$refs["DialogForm"].options = this.myTree;
      this.$refs["DialogForm"].dialogShow = true;
    },
    async handleEdit(row) {
      const data = await getMenuById(row.menuId);
      this.$refs["DialogForm"].form = this.$mergeByFirst(
        new MenuItemEntity(),
        data.data,
      );
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putMenu;
      this.$refs["DialogForm"].options = this.myTree;
      this.$refs["DialogForm"].dialogShow = true;
    },
    handleDel(row) {
      this._handleComfirm(row.menuId, delMenuById, "删除菜单");
    },
    async loadPage(param = this.searchForm) {
      this.isLoadTable = true;
      const { data } = await getMenuTree(param);
      this.pagedTable = data;
      this.isLoadTable = false;
      this.myTree = [
        {
          label: "根目录",
          value: -1,
        },
        ...customTree(this.pagedTable),
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  display: flex;
  .group-wrapper {
    flex: 0 0 200px;
  }
  .item-wrapper {
    flex: 1;
    width: 100%;
    overflow-x: hidden;
  }
}
</style>
