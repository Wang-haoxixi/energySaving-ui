<template>
  <div class="custom_menu">
    <template v-for="value in this.menuData">
      <el-submenu
        v-if="value.children instanceof Array && value.children.length !== 0"
        :index="value.path"
        :key="value.id"
      >
        <template slot="title">
          <i :class="value.icon"></i>
          <span slot="title">{{value.label}}</span>
        </template>
        <MenuTree :menuData="value.children"></MenuTree>
      </el-submenu>
      <el-menu-item-group v-else :key="value.id">
        <el-menu-item :index="value.path" @click="gotoPath(value.path)">
          <i :class="value.icon"></i>
          <span slot="title">{{value.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </template>
    <!-- <template v-for="item in menuData">
      <el-submenu :index="item.path" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group>
          <template v-for="sitem in item.children">
            <el-submenu v-if="sitem.children instanceof Array && sitem.children.length !== 0" :index="sitem.path"
              :key="sitem.id">
              <template slot="title">
                <i :class="sitem.icon"></i>
                <span slot="title">{{sitem.name}}</span>
              </template>
              <MenuTree :menuData="sitem.children"></MenuTree>
            </el-submenu>
            <el-menu-item v-else :index="sitem.id" :icon="sitem.icon" :key="sitem.id"
              @click="gotoPath(sitem.path)">{{sitem.label}}</el-menu-item>
          </template>
        </el-menu-item-group>
      </el-submenu>
    </template>-->
  </div>
</template>

<script>
import router from "@/router/index";
export default {
  // props: ["menuData", "plainId"],
  data() {
    return {
      plainId: 1,
    };
  },
  props: {
    menuData: {
      type: Array,
      default: () => [],
    },
  },

  name: "MenuTree",
  methods: {
    gotoPath(value) {
      const id = window.location.href.split("/").pop();
      router.push({
        path: value + "/" + id,
      });
    },
    changePlainId(val) {
      // console.log("id改变了:", this.plainId);
      this.plainId = val;
      // console.log("id改变了:", this.plainId);
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.custom_menu {
  padding-top: 10px;
  li {
    padding-left: 10px;
  }
}
.custom_menu ::v-deep .el-menu-item:first-child {
  margin-top: 13px;
}
.custom_menu ::v-deep .el-menu-item {
  padding-left: 40px !important;
}
</style>
