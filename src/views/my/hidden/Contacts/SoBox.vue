<template>
  <div class="group">
    <div class="title" @click="show = !show">
      <i v-if="!show" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-caret-bottom"></i>
      群聊
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <iep-no-data v-if="!orgList.length"></iep-no-data>
        <AvatarItem v-for="item in orgList" :key="item.id" :item="item" @select="handleSelect"></AvatarItem>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import { getUserHadList } from "@/api/admin/org";
import AvatarItem from "./AvatarItem";
export default {
  components: {
    AvatarItem,
  },
  data() {
    return {
      orgList: [],
      show: true,
    };
  },
  created() {
    this.load();
  },
  methods: {
    handleSelect(id) {
      this.$emit("select", id);
    },
    async load() {
      const { data } = await getUserHadList();
      this.orgList = data.map(m => ({
        id: m.orgId,
        name: m.name,
        avatar: m.avatar,
      }));
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/contacts.scss";
</style>
