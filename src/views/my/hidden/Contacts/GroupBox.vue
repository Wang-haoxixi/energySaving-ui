<template>
  <div class="group">
    <div class="title" @click="show = !show">
      <i v-if="!show" class="el-icon-caret-right"></i>
      <i v-else class="el-icon-caret-bottom"></i>
      所在组织成员
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <iep-no-data v-if="!data.length"></iep-no-data>
        <el-tree :data="data" v-else>
          <div class="sub-menu" slot-scope="{ node,data }">
            <div class="sub-menu-txt" v-if="data.count">
              <span class="sub-menu-txt-left" :title="data.name">{{ data.name }}</span>
              <span>({{ data.count }})</span>
            </div>
            <AvatarItem v-else :item="data" @select="handleSelect"></AvatarItem>
          </div>
        </el-tree>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import AvatarItem from "./AvatarItem";
import { getMailList } from "@/api/admin/mail";
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
      const { data } = await getMailList(realName);
      this.data = data;
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
