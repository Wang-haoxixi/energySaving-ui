<template>
  <header class="layout-header">
    <div>
      <!-- <span class="iep-header-trigger" @click="handleToggle">
        <i :class="collapseText[isCollapse].icon" :title="collapseText[isCollapse].title"></i>
      </span>-->
      <span class="iep-header-trigger" @click="reload()" title="刷新">
        <i class="el-icon-refresh-right"></i>
      </span>
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: `/wel/${currentMenuGroup.path}` }">{{label}}</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in $route.meta.breadcrumb" :key="item">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <right-wrapper showOrgName></right-wrapper>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import RightWrapper from "../Other/RightWrapper";
export default {
  components: {
    RightWrapper,
  },
  inject: ["reload"],
  provide() {
    return {
      isAvatar: true,
    };
  },
  data() {
    return {
      collapseText: {
        [true]: {
          icon: "el-icon-woneng-fold-right",
          title: "展开",
        },
        [false]: {
          icon: "el-icon-woneng-fold-left",
          title: "收起",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["isCollapse", "currentMenuGroup"]),
    label() {
      return this.currentMenuGroup.name;
    },
    breadcrumbList() {
      return this.$route.name.split("-");
    },
  },
  methods: {
    ...mapMutations({
      handleToggle: "SET_COLLAPSE",
    }),
  },
};
</script>

<style lang="scss" scoped>
.layout-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  height: 66px;
  width: 100%;
  // box-shadow: 0 1px 4px rgba(87, 87, 87, 0.08);
  position: relative;
  z-index: 3;
  .iep-header-trigger {
    padding: 0;
    &:last-child {
      // min-width: 118px;
      box-sizing: border-box;
    }
    &:nth-child(1) {
      padding: 0 20px;
    }
  }
}
.breadcrumb {
  display: inline-block;
  padding: 0 20px;
}
.iep-header-trigger [class^="el-icon-"] {
  font-size: 20px;
}
</style>

