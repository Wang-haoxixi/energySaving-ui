<template>
  <el-drawer class="drawer" title="通讯录" :visible.sync="drawerShow" append-to-body>
    <el-scrollbar style="height:calc(100vh - 54px)" wrapClass="scrollbar">
      <SearchBox @on-search="handleSearch"></SearchBox>
      <GroupBox
        ref="GroupBox"
        v-show="!onlyFriend"
        :selectedItemIds="selectedItemIds"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @unselect="handleUnSelect"
      ></GroupBox>
      <FriendBox
        ref="FriendBox"
        v-show="showFriend"
        :selectedItemIds="selectedItemIds"
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
  inject: ["showFriend", "onlyFriend"],
  props: {
    limitUserIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drawerShow: false,
      items: [],
    };
  },
  computed: {
    selectedItemIds() {
      return this.items.map(m => m.id);
    },
  },
  methods: {
    handleSearch(value) {
      this.$refs["GroupBox"].load(value);
      this.$refs["FriendBox"].load(value);
    },
    handleSelect(item) {
      this.items.push(item);
      this.$emit("save", this.items);
    },
    handleSelectAll(list) {
      this.items = list.filter(item => !this.limitUserIds.includes(item.id));
      this.$emit("save", this.items);
    },
    handleUnSelect(item) {
      this.items = this.items.filter(m => m.id !== item.id);
      this.$emit("save", this.items);
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
