<template>
  <el-drawer ref="drawer" class="drawer" title="通讯录" :visible.sync="drawerShow" append-to-body>
    <el-scrollbar style="height:calc(100vh - 54px)" wrapClass="scrollbar">
      <SearchBox @on-search="handleSearch"></SearchBox>
      <GroupBox
        ref="GroupBox"
        v-show="!onlyFriend"
        :selectedItemId="item.id"
        @select="handleSelect"
        @unselect="handleUnSelect"
      ></GroupBox>
      <FriendBox
        ref="FriendBox"
        :selectedItemId="item.id"
        v-show="showFriend"
        @select="handleSelect"
        @unselect="handleUnSelect"
      ></FriendBox>
    </el-scrollbar>
  </el-drawer>
</template>
<script>
import SearchBox from "@/views/my/hidden/Contacts/SearchBox.vue";
import GroupBox from "./GroupBox.vue";
import FriendBox from "./FriendBox.vue";
export default {
  components: {
    GroupBox,
    FriendBox,
    SearchBox,
  },
  inject: ["showFriend", "onlyFriend", "isClosed"],
  data() {
    return {
      drawerShow: false,
      item: {},
    };
  },
  methods: {
    handleSearch(value) {
      this.$refs["GroupBox"].load(value);
      this.$refs["FriendBox"].load(value);
    },
    handleSelect(item) {
      this.item = item;
      this.$emit("save", this.item);
      if (this.isClosed) {
        this.$refs.drawer.closeDrawer();
      }
    },
    handleUnSelect() {
      this.item = {};
      this.$emit("save", this.item);
    },
  },
};
</script>
<style lang="scss" scoped>
.drawer ::v-deep .scrollbar {
  padding: 0 10px;
  overflow-x: hidden;
}
.drawer ::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
  margin-left: 10px;
}
</style>
