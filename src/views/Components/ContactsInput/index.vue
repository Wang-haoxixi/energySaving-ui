<template>
  <div class="contacts-box">
    <span v-if="!value.length">暂无用户</span>
    <el-tag
      :key="item.id"
      v-for="item in value"
      :disable-transitions="false"
      type="info"
      size="default"
      :closable="!disabled"
      @close="handleDel(item)"
    >{{item.name}}</el-tag>
    <el-button
      v-if="!disabled"
      class="button-new-item"
      icon="el-icon-notebook-2"
      @click="handleEdit"
    >通讯录</el-button>
    <DrawerContacts ref="DrawerContacts" :limitUserIds="limitUserIds" @save="_save"></DrawerContacts>
  </div>
</template>
<script>
import DrawerContacts from "./DrawerContacts";

export default {
  components: {
    DrawerContacts,
  },
  name: "IepContactsInput",
  props: {
    orgId: {
      type: Number,
      default: 0,
    },
    value: {
      type: Array,
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
  },
  provide() {
    return {
      $computedLimitUserIds: () => this.computedLimitUserIds,
      $computedOrgId: () => this.computedOrgId,
      onlyOnlineOrg: this.onlyOnlineOrg,
      showFriend: this.showFriend,
      onlyFriend: this.onlyFriend,
    };
  },
  computed: {
    computedLimitUserIds() {
      return this.limitUserIds;
    },
    computedOrgId() {
      return this.orgId;
    },
  },
  methods: {
    handleEdit() {
      this.$refs["DrawerContacts"].items = [...this.value];
      this.$refs["DrawerContacts"].drawerShow = true;
    },
    handleDel(item) {
      const dynamicItems = [...this.value];
      dynamicItems.splice(dynamicItems.indexOf(item), 1);
      this._save(dynamicItems);
    },
    _save(items) {
      this.$emit("input", items);
    },
  },
};
</script>
<style lang="scss" scoped>
.contacts-box {
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
