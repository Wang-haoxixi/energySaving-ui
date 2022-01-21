<template>
  <div class="material">
    <!-- 列表 -->
    <iep-basic-container class="list" v-show="pageState === 'list'">
      <iep-page-header title="材料"></iep-page-header>
      <div class="material-head">
        <div class="button-list">
          <el-button type="primary" @click="$openPage('/mlms/selected')">生态精选</el-button>
          <el-button @click="handleSearch">生态搜索</el-button>
          <el-button
            icon="el-icon-plus"
            @click="handleCreate"
            class="create-button"
            v-if="MATERIAL_SO_CREATE"
          >新增</el-button>
        </div>
        <iep-tabs class="material-tab" v-model="tabName" :tab-list="tabList" @tab-click="tabChange"></iep-tabs>
      </div>
      <iep-operation-container v-if="isOpen >= 0">
        <template slot="left">
          <iep-button plain @click="handleCreateFile" class="button">新建分类</iep-button>
          <iep-button plain @click="handleMove" v-if="MATERIAL_CLASS_MOVE" class="button">移动</iep-button>
          <iep-button
            plain
            @click="handleDelete"
            v-if="lookByMe || MATERIAL_SO_DELETE"
            class="button"
          >删除</iep-button>
          <el-checkbox style="margin-left:5px" v-model="lookByMe">查看我的</el-checkbox>
        </template>
        <template slot="right">
          <SearchForm @searchPage="searchPage"></SearchForm>
        </template>
      </iep-operation-container>
      <!-- 全部、so内、so外 -->
      <div class="content" v-if="isOpen >= 0">
        <file-tpl
          class="file"
          ref="file"
          @file-operat="fileOperat"
          @load-data="loadDataByLevel"
          @file-update="handleUpdateFile"
          @get-level-tree="getLevelTree"
        ></file-tpl>
        <table-tpl
          class="table"
          ref="table"
          @mlms-update="handleUpdate"
          @handle-detail="handleDetail"
        ></table-tpl>
      </div>
      <!-- 收藏表格 -->
      <CollectTable ref="table" v-else @collect-update="handleCollectUpdate"></CollectTable>
    </iep-basic-container>
    <!-- 表单 -->
    <form-tpl v-if="pageState === 'form'" ref="form" @load-page="backPage" isTpl></form-tpl>
    <!-- 详情 -->
    <detail-tpl v-if="pageState === 'detail'" ref="detail" @load-page="backPage"></detail-tpl>
    <!-- 文件夹表单 -->
    <file-form ref="fileForm" @load-page="loadFile"></file-form>
    <!-- 移动文件 -->
    <move-tpl ref="move" @load-page="loadPage" :fileData="fileData"></move-tpl>
    <!-- 生态搜索 -->
    <SearchDialog ref="ecologicalSearch"></SearchDialog>
  </div>
</template>

<script>
import TableTpl from "./table";
import FileTpl from "./file/file";
import FileForm from "./file/fileForm";
import MoveTpl from "./file/moveFile";
import FormTpl from "./form";
import DetailTpl from "./detail";
import operationMixins from "@/mixins/operationMixins";
import { deleteDataByIds } from "@/api/dms/material";
import { getLevelIds, tabList } from "./option";
import SearchForm from "./searchForm";
import { hasPermissions } from "@/util/menu";
import { mapGetters } from "vuex";
import CollectTable from "./CollectTable";
import SearchDialog from "./search/index";

export default {
  mixins: [operationMixins],
  components: {
    FileTpl,
    TableTpl,
    FileForm,
    FormTpl,
    DetailTpl,
    MoveTpl,
    SearchForm,
    CollectTable,
    SearchDialog,
  },
  data() {
    return {
      subTitle: [0],
      pageState: "list",
      lookByMe: false,
      fileData: [],
      tabList,
      tabName: "all",
      isOpen: "",
      materialLevelId: "",
    };
  },
  computed: {
    MATERIAL_SO_DELETE: () => hasPermissions("material_so_delete"),
    MATERIAL_CLASS_MOVE: () => hasPermissions("material_class_move"),
    MATERIAL_SO_CREATE: () => hasPermissions("material_so_create"),
    ...mapGetters(["userInfo"]),
  },
  methods: {
    searchPage(params = {}) {
      this.$refs.table.searchData(params);
    },
    loadData() {
      const row = {
        isOpen: this.isOpen,
      };
      if (this.lookByMe) row.createBy = this.userInfo.userId;
      if (this.materialLevelId) row.materialLevelId = this.materialLevelId;
      this.$refs.table.loadData(row);
    },
    replaceText(data) {
      return `（共${data[0]}篇材料）`;
    },
    handleCreate() {
      if (this.$refs.file) {
        const fileList = getLevelIds(
          this.fileData,
          this.$refs["file"].activeId,
        );
        this.pageState = "form";
        this.$nextTick(() => {
          this.$refs["form"].loadData("create", { materialLevelId: fileList });
        });
      } else {
        this.pageState = "form";
        this.$nextTick(() => {
          this.$refs.form.loadData("create");
        });
      }
    },
    handleUpdate(row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].loadData("update", row);
      });
    },
    // 收藏的编辑-实为获取到数据后的新增
    handleCollectUpdate(row) {
      this.pageState = "form";
      this.$nextTick(() => {
        this.$refs["form"].loadData("collectUpdate", row);
      });
    },
    handleMove() {
      const ids = this.$refs["table"].selectList.map((m) => m.id);
      if (ids.length === 0) {
        this.$message.error("请选择至少一条材料进行移动！");
      } else {
        this.$refs["move"].loadData(ids);
      }
    },
    handleDelete() {
      const ids = this.$refs["table"].selectList.map((m) => m.id);
      if (ids.length === 0) {
        this.$message.error("请至少选择一条材料进行删除！");
      } else {
        this._handleComfirm(ids, deleteDataByIds, "删除选中材料");
      }
    },
    handleDetail(row) {
      this.pageState = "detail";
      this.$nextTick(() => {
        this.$refs["detail"].getDataById(row);
      });
    },
    handleCreateFile() {
      this.$refs["fileForm"].loadData("create");
    },
    handleUpdateFile(row) {
      this.$refs["fileForm"].loadData("update", row);
    },
    loadFile() {
      this.$refs["file"].loadPage();
    },
    fileOperat(state, row = {}) {
      this.$refs["fileForm"].loadData(state, row);
    },
    backPage(state) {
      this.pageState = "list";
      if (state) this.loadPage();
    },
    loadPage() {
      this.$refs["table"].loadPage();
    },
    loadDataByLevel(id) {
      this.materialLevelId = id;
      this.loadData();
    },
    getLevelTree(list) {
      this.fileData = list;
    },
    tabChange(row) {
      const obj = {};
      for (const item of tabList) {
        obj[item.value] = item.isOpen;
      }
      this.isOpen = obj[row.name];
      if (this.isOpen >= 0) {
        this.$nextTick(() => {
          this.loadData();
        });
      }
    },
    handleSearch() {
      this.$refs.ecologicalSearch.open();
    },
  },
  watch: {
    lookByMe() {
      this.loadData();
      this.$refs["file"].activeId = -1;
    },
  },
  mounted() {
    const query = this.$route.query;
    if (query.createBy) this.lookByMe = true;
    if (query.materialLevelId) this.materialLevelId = query.materialLevelId;
    if (query.isOpen) {
      this.isOpen = Number(query.isOpen);
      for (const item of tabList) {
        if (item.isOpen === this.isOpen) {
          this.tabName = item.value;
        }
      }
    }
    if (JSON.stringify(query) === "{}") {
      this.$refs.table.loadPage();
    } else {
      this.loadData();
    }
  },
};
</script>

<style lang="scss" scoped>
.material-head {
  .button-list {
    margin-bottom: 20px;
    .create-button {
      border-color: $--color-primary;
      color: $--color-primary;
    }
  }
  .material-tab {
    &::v-deep .el-tabs__item {
      padding-right: 25px;
    }
  }
}
.button {
  height: 36px;
  border-radius: 10px;
}
.button:nth-child(n + 2) {
  margin-left: 10px;
}
.content {
  display: flex;
  .file {
    margin-right: 20px;
  }
  .table {
    width: calc(100% - 265px);
  }
  .tableOnly {
    width: 100%;
  }
}
.list ::v-deep .button {
  margin-right: 5px;
  &:nth-child(n + 2) {
    margin-left: 5px;
  }
}
</style>
