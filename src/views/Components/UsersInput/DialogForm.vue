<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="选择用户"
    width="600px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <div class="item-wrapper">
      <span>
        已选择的用户：
        <span v-if="!items.length">暂无用户</span>
      </span>
      <el-tag
        v-for="item in items"
        :key="item.id"
        type="warning"
        closable
        @close="handleDel(item)"
        disable-transitions
      >{{ item.name }}</el-tag>
    </div>
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
        :effect="isDarkOrPlain(item)"
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
export default {
  mixins: [mixins],
  data() {
    return {
      items: [],
      dialogShow: false,
      layout: "prev, pager, next",
      pagination: this._pageOption(),
      pageOption: this._pageOption(),
    };
  },
  methods: {
    isDarkOrPlain(item) {
      return this.isInclude(item) ? "dark" : "plain";
    },
    isInclude(item) {
      return this.items.map(m => m.id).includes(item.userId);
    },
    handleDel(user) {
      this.items = this.items.filter(m => m.id !== user.id);
    },
    handleAdd(item) {
      if (this.isInclude(item)) {
        return;
      }
      this.items.push({
        id: item.userId,
        name: item.realName,
      });
    },
    _pageOption() {
      return {
        current: 1,
        size: 20,
      };
    },
    _close() {
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
  padding: 10px 0;
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
