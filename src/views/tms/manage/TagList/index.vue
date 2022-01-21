<template>
  <div>
    <iep-basic-container v-if="!editDialogShow">
      <iep-page-header :title="$route.meta.name"></iep-page-header>

      <div v-if="showMergeBox" class="merge-tag-list">
        <span class="label">已选择的合并标签：</span>
        <el-tag
          v-for="tag in toMergeTagList"
          :key="tag.name"
          closable
          @close="handleRemoveMergeTag(tag)"
        >{{tag.name}}</el-tag>
      </div>
      <iep-operation-container class="btn-group">
        <template slot="left">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd()" class="button">新增</el-button>
          <iep-button @click="handleEditBatch()" class="button">批量编辑</iep-button>
          <iep-button @click="handleMerge()" class="button">合并</iep-button>
          <iep-button @click="handleReviewPass()" class="button">审核通过</iep-button>
          <iep-button @click="handleDisabled()" class="button">禁用</iep-button>
          <iep-button @click="handleDelete()" class="button">删除</iep-button>
          <iep-button @click="handleImport()" class="button">Excel导入</iep-button>
          <iep-button @click="handleExport()" class="button">导出</iep-button>
        </template>
        <template slot="right">
          <iep-operation-search @search-page="searchPage" advance-search placeholder="请输入标签名称">
            <advance-search @search-page="searchPage"></advance-search>
          </iep-operation-search>
        </template>
      </iep-operation-container>

      <iep-table
        class="table"
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :dictMap="dictMap"
        :pagedTable="pagedTable"
        @selection-change="handleSelectionChange"
        is-mutiple-selection
        @sort-change="sortChange"
        @pagination-size-change="handlePaginationSizeChange"
        @pagination-current-change="handlePaginationCurrentChange"
      >
        <el-table-column label="标签属性" width="100px">
          <template slot-scope="scope">{{ dictMap.isFree[scope.row.isFree] }}</template>
        </el-table-column>
        <el-table-column label="标签级别" width="100px">
          <template slot-scope="scope">{{ scope.row.levelName }}</template>
        </el-table-column>
        <el-table-column label="所属分类" width="180px">
          <template slot-scope="scope">{{ scope.row.typeNames.join('、') }}</template>
        </el-table-column>
        <el-table-column label="应用次数" :sortable="'custom'" prop="refers">
          <template slot-scope="scope">{{ scope.row.refers }}</template>
        </el-table-column>
        <el-table-column label="更新时间" :sortable="'custom'" prop="updateTime">
          <template slot-scope="scope">{{ scope.row.updateTime | parseToDay }}</template>
        </el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope="scope">{{ dictMap.status[scope.row.status] }}</template>
        </el-table-column>

        <iep-operation-table-btn-group :options="operationOptions"></iep-operation-table-btn-group>
      </iep-table>

      <iep-dialog
        :dialog-show="addDialogShow"
        :title="infoFormTitle"
        @close="addDialogShow=false"
        width="500px"
      >
        <tag-form-add
          :form-data="addTagInfoForm"
          @hideDialog="loadPage();"
          :level-name-opts="levelNameOpts"
          :type-name-opts="typeNameOpts"
          :tag-function="tagFunction"
        ></tag-form-add>
      </iep-dialog>

      <iep-dialog
        :dialog-show="mergeDialogShow"
        title="合并标签"
        @close="mergeDialogShow=false"
        width="50%"
      >
        <el-form label-position="top" label-width="120px" :model="mergeForm">
          <el-form-item label="请选择主标签">
            <el-radio-group v-model="mergeForm.mainId">
              <el-radio
                v-for="item in toMergeTagList"
                :label="item.tagId"
                :key="item.tagId"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <iep-button type="primary" @click="onMerge">合并</iep-button>
            <iep-button @click="mergeDialogShow=false">取消</iep-button>
          </el-form-item>
        </el-form>
      </iep-dialog>

      <iep-dialog
        :dialog-show="importDialogShow"
        title="上传数据"
        @close="importDialogShow=false"
        width="500px"
      >
        <tag-import @close="handleCloseImport"></tag-import>
      </iep-dialog>
      <edit-batch
        is-inverse
        ref="OpenEditBatch"
        @load-page="loadPage"
        :level-name-opts="levelNameOpts"
        :type-name-opts="typeNameOpts"
      ></edit-batch>
    </iep-basic-container>
    <tag-form-edit
      v-else
      :form-data="editTagInfoForm"
      @hideDialog="loadPage();"
      :level-name-opts="levelNameOpts"
      :type-name-opts="typeNameOpts"
      @close="editDialogShow=false"
      :tag-function="tagFunction"
    ></tag-form-edit>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import { getTagTypeList } from "@/api/tms/tag-type";
import { getTagLevelList } from "@/api/tms/tag-level";
import { getTagExcelExport } from "@/api/tms/excel";
import { getTagFunctionMap } from "@/api/tms/function";
import {
  getTagPage,
  deleteTagById,
  getTagById,
  mergeTag,
  reviewTag,
  disableTag,
  deleteTag,
} from "@/api/tms/tag";
import tagFormAdd from "./tag_form_add";
import tagFormEdit from "./tag_form_edit";
import tagImport from "./tag_import";
import mixins from "@/mixins/mixins";
import {
  columnsMap,
  dictMap,
  initFormInline,
  initTagFunction,
  initAddTagForm,
  initEditTagForm,
  initMergeForm,
} from "./option.ts";
import AdvanceSearch from "./AdvanceSearch";
import EditBatch from "./EditBatch";
import { validatenull } from "@/util/validate";
export default {
  components: {
    AdvanceSearch,
    tagFormAdd,
    tagFormEdit,
    tagImport,
    EditBatch,
  },
  mixins: [mixins],
  data() {
    return {
      columnsMap,
      dictMap,
      mergeMainName: "",
      isEdit: true,
      searchForm: initFormInline(),
      tagFunction: initTagFunction(),
      addTagInfoForm: initAddTagForm(),
      editTagInfoForm: initEditTagForm(),
      mergeForm: initMergeForm(),
      addDialogShow: false,
      editDialogShow: false,
      mergeDialogShow: false,
      importDialogShow: false,
      typeNameOpts: [],
      levelNameOpts: [],
      toMergeTagList: [],
      gov_tag_add: false,
      gov_tag_del: false,
      gov_tag_edit: false,
      //排序
      descs: "",
      ascs: "",
      //
      isRoute: true,
      operationOptions: [
        {
          name: "合并",
          func: this.handleAddToMerge,
        },
        {
          name: "修改",
          func: this.handleEdit,
        },
        {
          name: "删除",
          func: this.handleDeleteTag,
        },
      ],
    };
  },
  computed: {
    infoFormTitle() {
      return this.isEdit ? "修改标签" : "新增标签";
    },
    showMergeBox() {
      return this.toMergeTagList.length > 0 ? true : false;
    },
    ...mapGetters(["permissions"]),
  },
  created() {
    this.loadPage();
    this.loadFunction();
    this.loadTagProp();
    this.gov_tag_add = this.permissions["gov_tag_add"];
    this.gov_tag_del = this.permissions["gov_tag_del"];
    this.gov_tag_edit = this.permissions["gov_tag_edit"];
  },
  methods: {
    sortChange(val) {
      if (val.order == "ascending") {
        this.ascs = val.prop;
        this.loadTable({ ascs: this.ascs }, getTagPage);
        this.ascs = "";
      } else {
        this.descs = val.prop;
        this.loadTable({ descs: this.descs }, getTagPage);
        this.descs = "";
      }
    },
    handleImport() {
      this.importDialogShow = true;
    },
    handleCloseImport(res) {
      this.importDialogShow = false;
      this.loadPage();
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: "success",
        });
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: "warning",
        });
      }
    },
    handleExport() {
      getTagExcelExport();
    },
    handleDelete() {
      this._handleGlobalDeleteAll(deleteTag);
    },
    handleDisabled() {
      disableTag(this.mutipleSelection).then(() => {
        this.loadPage();
      });
    },
    handleReviewPass() {
      reviewTag(this.mutipleSelection).then(() => {
        this.loadPage();
      });
    },
    onMerge() {
      this.$confirm(
        `是否确认将这些标签归并到“${this.mergeMainName}”？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        },
      )
        .then(() => {
          mergeTag(this.mergeForm).then(() => {
            this.$message({
              type: "success",
              message: "合并成功!",
            });
            this.mergeDialogShow = false;
            this.toMergeTagList = [];
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消合并",
          });
        });
    },
    handleMerge() {
      if (this.toMergeTagList.length < 2) {
        this.$message("请至少选择两个标签。");
        return;
      }
      this.mergeDialogShow = true;
    },
    handleRemoveMergeTag(tag) {
      const { toMergeTagList } = this;
      this.$set(
        this,
        "toMergeTagList",
        _.filter(toMergeTagList, item => item.tagId !== tag.tagId),
      );
    },
    handleAddToMerge(rows) {
      this.toMergeTagList.push(rows);
      this.toMergeTagList = _.uniqWith(this.toMergeTagList, _.isEqual);
    },
    handleDeleteTag(rows) {
      const { tagId } = rows;
      this._handleGlobalDeleteById(tagId, deleteTagById, "delete");
    },
    handleAdd() {
      this.isEdit = false;
      this.addTagInfoForm = initAddTagForm();
      this.addDialogShow = true;
    },
    _mapPickUserIdName(list) {
      if (validatenull(list)) {
        return [];
      }
      return _(list)
        .map(item => {
          return _.pick(item, ["id", "realName"]);
        })
        .value();
    },
    handleEditBatch() {
      // TODO: 改为通用组件
      if (!this.multipleSelection.length) {
        this.$message("请先选择需要的选项");
        return;
      } else {
        this.$refs["OpenEditBatch"].ids = this.multipleSelection;
        this.$refs["OpenEditBatch"].dialogShow = true;
      }
    },
    handleEdit(rows) {
      this.isEdit = true;
      getTagById(rows.tagId).then(res => {
        this.editTagInfoForm = res;
        this.editTagInfoForm.tagList = this.editTagInfoForm.tagList.map(
          m => m.commonName,
        );
        this.editDialogShow = true;
      });
    },
    handleSelectionChange(val) {
      this.mutipleSelection = val.map(m => m.tagId);
      this.multipleSelection = val.map(m => m.tagId);
    },
    loadFunction() {
      getTagFunctionMap().then(res => {
        this.tagFunction = res;
      });
    },
    loadPage(param = this.searchForm) {
      this.editDialogShow = false;
      this.addDialogShow = false;
      this.loadTable({ ...param }, getTagPage);
    },
    loadTagProp() {
      getTagTypeList().then(res => {
        this.typeNameOpts = res.map(m => {
          return {
            label: m.name,
            value: m.typeId,
          };
        });
      });
      getTagLevelList().then(res => {
        this.levelNameOpts = res.map(m => {
          return {
            label: m.name,
            value: m.levelId,
          };
        });
      });
    },
  },
  watch: {
    "mergeForm.mainId": function(mainId) {
      this.mergeMainName = this.toMergeTagList.find(
        m => m.tagId === mainId,
      ).name;
      const mergeIds = _.filter(
        this.toMergeTagList.map(m => m.tagId),
        item => item !== mainId,
      );
      this.mergeForm.mergeIds = mergeIds;
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  height: 36px;
  border-radius: 10px;
}
.merge-tag-list {
  margin-bottom: 18px;
  & > span.label {
    line-height: 32px;
    font-size: 14px;
    color: $--color-text-regular;
  }
  > .el-tag {
    margin-right: 5px;
  }
}
.tag-list ::v-deep .el-table th > .cell {
  display: -webkit-box;
}
.table ::v-deep .el-button {
  margin-right: 0;
}
.btn-group ::v-deep .el-button {
  margin-right: 5px;
  &:nth-child(n + 2) {
    margin-left: 5px;
  }
}
.btn-group ::v-deep .el-input-group__append {
  margin-right: 0;
  padding: 0;
}
.btn-group ::v-deep .senior-btn {
  margin: 0 !important;
}
.btn-group ::v-deep .search-btn {
  margin-right: 0;
}
</style>
