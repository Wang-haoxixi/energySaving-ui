<template>
  <el-aside class="menu-sider" :width="asiderWidth">
    <div class="menu-logo" title="个人中心">
      <img
        v-if="isCollapse"
        @click="$openPage('/')"
        src="/img/icons/android-chrome-maskable-192x192.png"
        alt="icon"
      />
      <div class="long-img" v-else @click="$openPage('/')">
        <img src="/img/icons/logo-h180.png" alt="icon" />
        <span>节能保</span>
      </div>
    </div>
    <el-scrollbar style="height:calc(100vh - 64px);" native>
      <el-menu
        :default-active="currentPath"
        :collapse="isCollapse"
        unique-opened
        v-intro="'点击侧边栏，更多功能等你探索'"
        v-intro-step="7"
        v-intro-position="'right'"
      >
        <MenuGroupItem></MenuGroupItem>
        <template v-for="item in menuTree">
          <el-submenu v-if="一级菜单是否显示(item)" :index="item.path" :key="item.id">
            <template class="style-press" slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group class="style-press">
              <span slot="title">{{item.label}}</span>
              <template v-for="sitem in item.children">
                <el-menu-item
                  v-if="!sitem.hidden"
                  :index="`${sitem.path}`"
                  :icon="sitem.icon"
                  :key="sitem.menuId"
                  @click="$openPage(`${sitem.path}`)"
                >{{sitem.label}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import MenuGroupItem from "./MenuGroupItem";
import { transToMenu } from "@/util/menu";
import { mapGetters } from "vuex";
export default {
  components: {
    MenuGroupItem,
  },
  computed: {
    ...mapGetters(["isCollapse", "menu", "currentMenuGroup"]),
    asiderWidth() {
      return this.isCollapse ? "64px" : "240px";
    },
    currentPath() {
      return this.$route.path;
    },
    menuTree() {
      return transToMenu(this.menu);
    },
  },
  methods: {
    一级菜单是否显示(item) {
      return this.currentMenuGroup.menuIds.includes(item.id) && !item.hidden;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-logo {
  display: flex;
  align-items: center;
  text-align: center;
  height: 66px;
  cursor: pointer;
  span {
    margin-left: 10px;
    font-size: 24px;
  }
  .long-img {
    display: flex;
    align-items: center;
    text-align: center;
    margin-left: 20px;
    width: 200px;
    height: 66px;
  }
}
.menu-sider {
  overflow: hidden;
  z-index: 10;
  min-height: 100vh;
  transition: 0.3s;
  background-color: #fff;
  img {
    height: 33px;
    vertical-align: middle;
  }
  .style-press .is-active {
    position: relative;
  }
  .style-press .is-active:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    // background: rgba(247, 67, 55, 1);
    background: $--color-primary;
    border-radius: 2px;
    content: "";
  }
}
.menu-sider ::v-deep .el-menu {
  border-right: none;
}
.menu-sider ::v-deep .el-menu-item-group__title {
  display: none;
}
.menu-sider ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.menu-sider ::v-deep .el-submenu .el-submenu__title {
  padding-left: 40px !important;
  .el-submenu__icon-arrow {
    right: 25px;
  }
}

.menu-sider ::v-deep .el-submenu:hover .el-submenu__title:hover {
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    content: "";
    width: 4px;
    // background: rgba(247, 67, 55, 1);
    background: $--color-primary;
    border-radius: 2px;
  }
}
.menu-sider ::v-deep .el-submenu .el-menu-item-group .el-menu-item {
  padding-left: 70px !important;
  text-align: left;
}
</style>
