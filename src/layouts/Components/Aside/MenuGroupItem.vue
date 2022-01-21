<template>
  <div
    class="dashboard-menu-item"
    :index="`/wel/${currentMenuGroup.path}`"
    @click="$openPage(`/wel/${currentMenuGroup.path}`)"
  >
    <i v-if="isCollapse" class="el-icon-woneng-diannaodenglu"></i>
    <template v-else>
      <span style="display: inline-flex; align-items: center;">{{currentMenuGroup.name}}</span>
      <el-popover v-model="showPopover" placement="bottom" width="200" trigger="hover">
        <div
          class="menu-item"
          v-for="(item, key) in filterMenuGroup"
          :key="key"
          @click="hanldeChangeDashboard(item)"
        >{{item.name}}</div>
        <i class="el-icon-sort" slot="reference" v-if="filterMenuGroup.length>=1"></i>
      </el-popover>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      showPopover: false,
    };
  },
  computed: {
    ...mapGetters(["isCollapse", "currentMenuGroup", "roles", "menuGroup"]),
    filterMenuGroup() {
      return this.menuGroup.filter(m => {
        return (
          this.roles.includes(m.permission) && this.currentMenuGroup.id !== m.id
        );
      });
    },
  },
  methods: {
    ...mapActions(["changeUserDashBoard"]),
    async hanldeChangeDashboard(item) {
      this.changeUserDashBoard(item);
      this.showPopover = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px auto;
  margin-left: 20px;
  width: 200px;
  height: 38px;
  line-height: 38px;
  font-size: 18px;
  background-color: #f8f8f8;
  color: $--color-text-regular;
  border-radius: $--border-radius-base;
  cursor: pointer;
  box-sizing: border-box;
  i {
    font-size: 18px;
  }
}
.dashboard-menu-item ::v-deep .el-tooltip {
  margin: 0 -5px;
}
.dashboard-menu-item ::v-deep .el-submenu__title {
  margin: 10px 0;
  height: 44px;
  line-height: 44px;
  border-right: 2px solid #fff;
}
.dashboard-menu-item ::v-deep.el-submenu__title i {
  margin-left: 5px;
}
.dashboard-menu-item ::v-deep .el-submenu__title:hover {
  border-right-color: $--color-primary;
  color: $--color-primary;
}
.menu-item {
  cursor: pointer;
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  padding: 0 16px;
  clear: both;
  color: #515a6e;
  &:hover {
    color: $--color-primary;
  }
}
</style>
