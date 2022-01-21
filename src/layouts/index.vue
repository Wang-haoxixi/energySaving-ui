<template>
  <!-- 引导页 -->
  <rootWrapper
    class="so-container"
    v-intro-autostart="autostart"
    v-intro-autostart.config="autostartConfig"
    v-intro-autostart:on.autostart="onAutostarted"
  >
    <iep-aside></iep-aside>
    <section class="container iep-basic-scroll" :style="`width: ${containerWidth};`">
      <iep-header class="width1040"></iep-header>
      <div class="iep-basic-scroll inner-scroll width1040" id="iep-container-scroll">
        <div class="iep-main width1040">
          <transition name="fade-transform" mode="out-in">
            <router-view v-if="isRouterAlive" />
          </transition>
        </div>
        <iep-footer></iep-footer>
      </div>
    </section>
  </rootWrapper>
</template>
<script>
import { updateUserGuideInfo } from "@/api/admin/user";
import { mapGetters, mapMutations } from "vuex";
import layoutMixins from "@/mixins/layoutMixins";
import IepAside from "./Components/Aside/index";
import IepHeader from "./Components/Header/index";
import IepFooter from "./Components/Footer/index";
import rootWrapper from "./rootWrapper";
export default {
  mixins: [layoutMixins],
  data() {
    return {
      // intro.js
      autostart: false,
      autostartConfig: {
        nextLabel: "下一步",
        prevLabel: "上一步",
        skipLabel: "跳过",
        doneLabel: "完成",
        showStepNumbers: false,
        highlightClass: "iep-introjs-highlight",
        tooltipClass: "iep-introjs-tooltip",
        hidePrev: true,
        showBullets: false,
      },
    };
  },
  components: {
    IepAside,
    IepHeader,
    IepFooter,
    rootWrapper,
  },
  computed: {
    ...mapGetters(["isCollapse", "userInfo"]),
    containerWidth() {
      return this.isCollapse ? "calc(100vw - 64px)" : "calc(100vw - 220px)";
    },
  },
  mounted() {
    setTimeout(() => {
      const isWel = this.$route.path === "/wel/index";
      if (isWel) {
        this.autostart = !this.userInfo.isGuided;
      }
    }, 1000);
  },
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USERINFO",
    }),
    onAutostarted() {
      updateUserGuideInfo();
      const userInfo = { ...this.userInfo };
      userInfo.isGuided = !userInfo.isGuided;
      this.setUserInfo(userInfo);
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
  overflow-y: hidden;
  overflow-x: hidden;
}
.iep-main {
  padding: 20px;
  // margin: 20px;
  // overflow-y: hidden;
  // box-sizing: border-box;
  // TODO: 以上代码会导致element-ui组件定位失效
}
.inner-scroll {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 66px);
}
.width1040 {
  min-width: 1040px;
}
</style>
