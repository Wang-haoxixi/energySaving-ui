<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="新增运维"
    width="600px"
    @close="_close()"
    @mounted="loadPage()"
  >
    <div class="item-wrapper">
      <span>
        已选择的用户：
        <span v-if="!users.length">暂无用户</span>
      </span>
      <el-tag
        v-for="user in users"
        :key="user.userId"
        @close="handleDel(user)"
        closable
      >{{user.name}}</el-tag>
    </div>
    <div class="item-wrapper">
      <el-input
        class="search-box"
        placeholder="请输入用户姓名"
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
    <DialogMessage ref="DialogMessage" @load-page="_close()"></DialogMessage>
  </iep-dialog>
</template>
<script>
import mixins from "@/mixins/mixins";
import { getUserUserPage } from "@/api/admin/user";
import DialogMessage from "./DialogMessage";
export default {
  components: {
    DialogMessage,
  },
  mixins: [mixins],
  data() {
    return {
      dialogShow: false,
      users: [],
      searchName: "",
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
      return this.users.map((m) => m.id).includes(item.userId);
    },
    handleDel(user) {
      this.users = this.users.filter((m) => m.id !== user.id);
    },
    handleAdd(item) {
      if (this.isInclude(item)) {
        return;
      }
      this.users.push({
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
      this.$emit("load-page");
    },
    async loadPage(param = { ...this.searchForm, ...this.queryForm }) {
      await this.loadTable(param, getUserUserPage);
    },
    handleSave() {
      if (this.users.length) {
        this.$refs["DialogMessage"].open(
          this.users.map((m) => m.name),
          this.users.map((m) => m.id),
        );
      } else {
        this.$message("请先选择成员");
      }
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
