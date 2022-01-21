<template>
  <div class="group iep-basic-scroll">
    <div class="title" @click="show = !show">
      <i v-if="!show" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-caret-bottom"></i>
      我的好友
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <iep-no-data v-if="!data.length"></iep-no-data>
        <AvatarItem
          v-for="item in data"
          :disabled="_selected(item.id)"
          :key="item.id"
          :item="item"
          @select="handleSelect"
          @unselect="handleUnSelect"
        ></AvatarItem>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import AvatarItem from "./AvatarItem";
import { getFriendList } from "@/api/admin/friend";
export default {
  props: {
    selectedItemIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [],
      show: true,
    };
  },
  components: {
    AvatarItem,
  },
  created() {
    this.load();
  },
  methods: {
    async load(realName = "") {
      const { data } = await getFriendList(realName);
      this.data = data.map(m => {
        return {
          id: m.userId,
          name: m.realName,
          avatar: m.avatar,
        };
      });
      this.show = true;
    },
    handleSelect(item) {
      this.$emit("select", item);
    },
    handleUnSelect(item) {
      this.$emit("unselect", item);
    },
    _selected(id) {
      return this.selectedItemIds.includes(id);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/contacts.scss";
</style>
