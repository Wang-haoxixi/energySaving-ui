<template>
  <rootWrapper class="so-container">
    <iep-aside></iep-aside>
    <section class="container" :style="`width: ${containerWidth}`">
      <iep-header></iep-header>
      <el-scrollbar style="height:calc(100vh - 56px);z-index:1000;">
        <div class="iep-main">
          <transition name="fade-transform" mode="out-in">
            <router-view />
            <!-- <template>sadasdasd</template> -->
          </transition>
        </div>
        <iep-footer></iep-footer>
      </el-scrollbar>
    </section>
  </rootWrapper>
</template>
<script>
import { mapGetters } from "vuex";
import layoutMixins from "@/mixins/layoutMixins";
import IepAside from "./components/Aside/index";
import IepHeader from "@/layouts/Components/Header/index";
import IepFooter from "@/layouts/Components/Footer/index";
import rootWrapper from "@/layouts/rootWrapper";
export default {
  mixins: [layoutMixins],
  components: {
    IepAside,
    IepHeader,
    IepFooter,
    rootWrapper,
  },
  computed: {
    ...mapGetters(["isCollapse"]),
    containerWidth() {
      return this.isCollapse ? "calc(100vw - 64px)" : "calc(100vw - 220px)";
    },
  },
};
</script>

<style lang="scss" scoped>
.so-container {
  height: 100vh;
  overflow: hidden;
}
.container {
  background-color: #fff;
}
.iep-main {
  margin: 20px;
  padding: 0;
  box-sizing: border-box;
}
.container ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
.search {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-top: 20px;
  margin-right: 15px;
}
.search ::v-deep .el-input {
  width: 160px;
}
</style>
