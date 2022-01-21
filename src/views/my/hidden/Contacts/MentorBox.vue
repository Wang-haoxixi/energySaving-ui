<template>
  <div class="group">
    <div class="title" @click="show = !show">
      <i v-if="!show" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-caret-bottom"></i>
      我的师徒
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <iep-no-data v-if="!data.length"></iep-no-data>
        <AvatarItem
          v-for="item in data"
          :key="item.id"
          :item="item"
          @select="handleSelect"
          isMentor
        ></AvatarItem>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import AvatarItem from "./AvatarItem";
import { getMentorList } from "@/api/admin/mentor";
export default {
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
      const { data } = await getMentorList(realName);
      this.data = data.map(m => {
        return {
          id: m.userId,
          name: m.realName,
          avatar: m.avatar,
          mentorship: m.mentorship,
        };
      });
    },
    handleSelect(id) {
      this.$emit("select", id);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/contacts.scss";
</style>
