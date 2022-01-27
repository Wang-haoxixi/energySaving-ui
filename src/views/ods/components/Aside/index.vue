<template>
  <el-aside class="menu-sider" :width="asiderWidth">
    <div class="menu-logo" title="个人中心">
      <img
        v-if="isCollapse"
        @click="$openPage('/ods')"
        src="/img/icons/android-chrome-maskable-192x192.png"
        alt="icon"
      />
      <div class="long-img" v-else @click="$openPage('/ods')">
        <img src="/img/icons/logo-h180.png" alt="icon" />
        <span style="font-size: 18px;white-space:nowrap;">{{title || '节能宝ODS'}}</span>
      </div>
    </div>
    <el-scrollbar style="height:calc(100vh - 64px);" native>
      <el-menu :default-active="currentPath" :collapse="isCollapse" unique-opened>
        <!-- <MenuGroupItem></MenuGroupItem> -->
        <el-menu-item index="/ods/wel">
          <template class="style-press" slot="title">
            <div style="margin-left:20px;">
              <i class="el-icon-menu"></i>
              <span slot="title" @click="gotoPath('/ods/wel/'+plainId)">工作台</span>
            </div>
          </template>
        </el-menu-item>
        <MenuTree ref="MenuTree" :menuData="menuTree"></MenuTree>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
// import MenuGroupItem from "./MenuGroupItem";
// import { transToMenu } from "@/util/menu";
import { mapGetters } from "vuex";
import router from "@/router/index";
// import { mockMenuData } from "./const/base";
import MenuTree from "./MenuTree";
import { getDetailById } from "@/api/dms/plan";
export default {
  data() {
    return {
      menuTree: [],
      plainId: 1,
      title: "节能宝ODS",
    };
  },
  components: {
    // MenuGroupItem,
    MenuTree,
  },
  computed: {
    ...mapGetters(["isCollapse", "menu", "currentMenuGroup"]),
    asiderWidth() {
      return this.isCollapse ? "64px" : "240px";
    },
    currentPath() {
      return this.$route.path;
    },
    // menuTree() {
    //   const data = mockMenuData;
    //   return data;
    // },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["MenuTree"].changePlainId(this.$route.params.id || 1);
    });
  },
  created() {
    const id = this.$route.params.id || 1;
    this.plainId = id;
    getDetailById(id).then(({ data }) => {
      // console.log("菜单Json", data.menuJson, mockMenuData);
      if (data.menuJson) {
        this.menuTree = data.menuJson.transModalList;
        this.title = data.menuJson.name;
      }
      // this.menuTree = [data.menuJson];
    });
  },
  methods: {
    一级菜单是否显示(item) {
      return this.currentMenuGroup.menuIds.includes(item.id) && !item.hidden;
    },
    gotoPath(value) {
      router.push({
        path: value,
      });
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
    background: rgba(247, 67, 55, 1);
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
    background: rgba(247, 67, 55, 1);
    border-radius: 2px;
  }
}
.menu-sider ::v-deep .el-submenu .el-menu-item-group .el-menu-item {
  padding-left: 40px !important;
  text-align: left;
}
</style>
