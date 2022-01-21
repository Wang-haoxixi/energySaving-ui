<template>
  <div class="group iep-basic-scroll">
    <div class="title">我的好友</div>
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
  props: ["selectedItemId"],
  components: {
    AvatarItem,
  },
  data() {
    return {
      data: [],
      show: true,
    };
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
      return this.selectedItemId === id;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/contacts.scss";
</style>
