<template>
  <div>
    <iep-operation-container>
      <template slot="left">
        <el-button
          @click="handleAdd()"
          type="primary"
          icon="el-icon-plus"
          plain
          v-if="gov_tagType_add"
        >新增父分类</el-button>
      </template>
      <template slot="right">
        <iep-operation-search
          @search-page="searchPage"
          placeholder="请输入级别名称"
          :prop="formInline.typename"
        ></iep-operation-search>
      </template>
    </iep-operation-container>
    <iep-table
      class="table"
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :pagedTable="pagedTable"
      @pagination-size-change="handlePaginationSizeChange"
      @pagination-current-change="handlePaginationCurrentChange"
    >
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createTime | parseToDay}}</template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            class="btn"
            :disabled="scope.row.parentId===-1 || scope.row._level >= 4"
            @click="handleAddChild(scope.row)"
            type="text"
          >添加子分类</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            class="btn"
            type="text"
            :disabled="!gov_tagType_edit || scope.row.parentId===-1"
            @click="handleClick(scope.row)"
          >修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            class="btn"
            :disabled="!gov_tagType_del || scope.row.parentId===-1"
            @click="handleDelete(scope.row)"
            type="text"
          >删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
    <iep-dialog
      :dialog-show="dialogShow"
      :title="titleForm"
      @close="dialogShow = false"
      width="40%"
    >
      <el-form :model="formTagType" class="form-inline" label-width="120px" ref="form">
        <el-form-item v-if="isEdit=== false && formTagType.parentId" label="父类型">
          <el-input v-model="formTagType.parentName" :disabled="true"></el-input>
          <input v-model="formTagType.parentId" type="hidden" />
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="formTagType.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </iep-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getTagTypePage,
  deleteTagTypeById,
  putTagType,
  postTagType,
} from "@/api/tms/tag-type";
import mixins from "@/mixins/mixins";
function initFormTagType() {
  return {
    parentId: null,
    name: null,
  };
}
function initFormInline() {
  return {
    typename: null,
  };
}
const columnMap = [
  {
    label: "ID",
    prop: "typeId",
    width: 200,
  },
  {
    label: "分类名称",
    prop: "name",
  },
];
export default {
  mixins: [mixins],
  components: {},
  data() {
    return {
      columnMap,
      initFormInline,
      formInline: initFormInline(),
      formTagType: initFormTagType(),
      isEdit: true,
      gov_tagType_add: false,
      gov_tagType_del: false,
      gov_tagType_edit: false,
      parentTypeList: [],
      dialogShow: false,
    };
  },
  computed: {
    params() {
      return this.formInline;
    },
    titleForm() {
      return this.isEdit ? "修改标签类型" : "新增标签类型";
    },
    ...mapGetters(["permissions"]),
  },
  created() {
    this.loadPage();
    this.gov_tagType_add = this.permissions["gov_tagType_add"];
    this.gov_tagType_del = this.permissions["gov_tagType_del"];
    this.gov_tagType_edit = this.permissions["gov_tagType_edit"];
  },
  methods: {
    handleSave() {
      delete this.formTagType._expanded;
      delete this.formTagType.children;
      delete this.formTagType._level;
      delete this.formTagType._show;
      if (this.isEdit) {
        putTagType(this.formTagType).then(() => {
          this.dialogShow = false;
          this.loadPage();
        });
      } else {
        postTagType(this.formTagType).then(() => {
          this.dialogShow = false;
          this.loadPage();
        });
      }
    },
    handleDelete(rows) {
      const { typeId } = rows;
      this._handleGlobalDeleteById(typeId, deleteTagTypeById, "delete");
    },
    loadPage(param = this.searchForm) {
      this.loadTable(param, getTagTypePage);
    },
    handleAddChild(row) {
      this.formTagType.parentId = row.typeId;
      this.formTagType.parentName = row.name;
      this.handleClick();
    },
    handleClick(rows) {
      if (rows) {
        this.isEdit = true;
        this.formTagType = { ...rows };
        this.dialogShow = true;
      } else {
        this.isEdit = false;
        if (this.formTagType.parentId) {
          this.formTagType = {
            ...initFormTagType(),
            parentId: this.formTagType.parentId,
            parentName: this.formTagType.parentName,
          };
          this.dialogShow = true;
        } else {
          this.formTagType = initFormTagType();
          this.dialogShow = true;
        }
      }
      this.dialogShow = true;
    },
  },
};
</script>
<style scoped>
.btn {
  margin-right: -5px;
}
.table ::v-deep .el-button {
  margin-right: 0;
}
</style>
