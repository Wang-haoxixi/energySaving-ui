<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <el-button
          @click="handleAdd()"
          type="primary"
          icon="el-icon-plus"
          plain
          v-if="gov_tagLevel_add"
        >新增</el-button>
      </template>
      <template slot="right">
        <iep-operation-search @search-page="searchPage" placeholder="请输入级别名称"></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      class="table"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button type="text" :disabled="!gov_tagLevel_edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" :disabled="!gov_tagLevel_del" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DialogForm from "./DialogForm";
import mixins from "@/mixins/mixins";
import {
  getTagLevelPage,
  postTagLevel,
  putTagLevel,
  deleteTagLevelById,
} from "@/api/tms/tag-level";
// mockColumnMap
const columnsMap = [
  {
    prop: "levelId",
    label: "ID",
    width: "180",
  },
  {
    prop: "name",
    label: "级别名称",
    width: null,
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: null,
    type: "date",
  },
];
export default {
  mixins: [mixins],
  components: {
    DialogForm,
  },
  data() {
    return {
      columnsMap,
      dialogShow: false,
      formTagLevel: {},
      isEdit: true,
      gov_tagLevel_add: false,
      gov_tagLevel_del: false,
      gov_tagLevel_edit: false,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.loadPage();
    this.gov_tagLevel_add = this.permissions["gov_tagLevel_add"];
    this.gov_tagLevel_del = this.permissions["gov_tagLevel_del"];
    this.gov_tagLevel_edit = this.permissions["gov_tagLevel_edit"];
  },
  methods: {
    handleDelete(rows) {
      const { levelId } = rows;
      this._handleGlobalDeleteById(levelId, deleteTagLevelById, "delete");
    },
    loadPage(param = this.searchForm) {
      this.loadTable(param, getTagLevelPage);
    },
    handleAdd() {
      this.$refs["DialogForm"].form = {
        name: "",
      };
      this.$refs["DialogForm"].formRequestFn = postTagLevel;
      this.$refs["DialogForm"].dialogShow = true;
      this.$refs["DialogForm"].methodName = "新增";
    },

    handleUpdate(val) {
      this.$refs["DialogForm"].form.id = val.id;
      this.$refs["DialogForm"].methodName = "编辑";
      this.$refs["DialogForm"].formRequestFn = putTagLevel;
      this.$refs["DialogForm"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.table ::v-deep .el-button {
  margin-right: 0;
}
</style>
