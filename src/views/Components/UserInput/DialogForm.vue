<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="选择用户"
    width="600px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <div class="item-wrapper">
      <el-input
        class="search-box"
        placeholder="请输入用户"
        prefix-icon="el-icon-search"
        v-model="queryForm.realName"
        @keyup.enter.native="loadPage()"
      ></el-input>
      <el-tag
        v-for="item in pagedTable"
        :key="item.userId"
        type="default"
        :effect="isInclude(item)"
        @click="handleAdd(item)"
        disable-transitions
      >{{ item.realName }}</el-tag>
    </div>
    <iep-pagination
      @size-change="handlePaginationSizeChange"
      @current-change="handlePaginationCurrentChange"
      :pagination-option="pagination"
      :layout="layout"
      prev-text="上一页"
      next-text="下一页"
      background
    ></iep-pagination>
    <template slot="footer">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="_close()">取消</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getUserPage } from "@/api/admin/user";
import { CommonData } from "@/types/common";

export default {
  mixins: [mixins],
  data() {
    return {
      items: new CommonData(),
      dialogShow: false,
      layout: "prev, pager, next",
      pagination: this._pageOption(),
      pageOption: this._pageOption(),
    };
  },
  methods: {
    isInclude(item) {
      return this.items.id === item.userId ? "dark" : "plain";
    },
    handleAdd(item) {
      this.items = {
        id: item.userId,
        name: item.realName,
      };
    },
    _pageOption() {
      return {
        current: 1,
        size: 20,
      };
    },
    _close() {
      this.items = new CommonData();
      this.dialogShow = false;
    },
    async loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      await this.loadTable(param, getUserPage);
    },
    handleSave() {
      this.$emit("save", this.items);
      this._close();
    },
  },
};
</script>
<style lang="scss" scoped>
.item-wrapper {
  padding: 10px 20px;
}
.item-wrapper ::v-deep {
  .el-tag {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .search-box {
    margin-bottom: 20px;
  }
}
</style>
