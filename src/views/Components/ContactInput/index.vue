<template>
  <div class="tag-box">
    <span v-if="isNull">暂无用户</span>
    <el-tag
      v-else
      :disable-transitions="false"
      type="info"
      size="default"
      :closable="!disabled"
      @close="handleDel()"
    >{{value.name}}</el-tag>
    <el-button
      v-if="!disabled"
      class="button-new-item"
      icon="el-icon-notebook-2"
      @click="handleEdit"
    >通讯录</el-button>
    <DrawerContact ref="DrawerContact" @save="_save"></DrawerContact>
  </div>
</template>
<script>
import { validatenull } from "@/util/validate";
import DrawerContact from "./DrawerContact";
export default {
  components: {
    DrawerContact,
  },
  name: "IepContactInput",
  props: {
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limitUserIds: {
      type: Array,
      default: () => [],
    },
    onlyOnlineOrg: {
      type: Boolean,
      default: true,
    },
    showFriend: {
      type: Boolean,
      default: true,
    },
    onlyFriend: {
      type: Boolean,
      default: false,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      $computedLimitUserIds: () => this.computedLimitUserIds,
      onlyOnlineOrg: this.onlyOnlineOrg,
      showFriend: this.showFriend,
      onlyFriend: this.onlyFriend,
      isClosed: this.isClosed,
    };
  },
  computed: {
    computedLimitUserIds() {
      return this.limitUserIds;
    },
    isNull() {
      return validatenull(this.value);
    },
  },
  methods: {
    handleEdit() {
      this.$refs["DrawerContact"].drawerShow = true;
    },
    handleDel() {
      this._save({});
    },
    _save(item) {
      this.$emit("input", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: -10px;
  > * {
    margin-left: 10px;
    margin-bottom: 5px;
    height: 42px;
    line-height: 42px;
    color: $--color-text-secondary;
  }
}
.button-new-item {
  margin-left: 10px;
  height: 42px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
  color: $--color-text-regular;
  &:hover,
  &:focus {
    color: $--color-primary;
  }
}
</style>
