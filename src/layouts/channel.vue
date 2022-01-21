<template>
  <rootWrapper class="channel">
    <channel-header></channel-header>
    <transition name="fade-up-transform" mode="out-in">
      <router-view class="router-view" v-if="isRouterAlive"></router-view>
    </transition>
    <channel-footer></channel-footer>
  </rootWrapper>
</template>
<script>
import rootWrapper from "./rootWrapper";
import layoutMixins from "@/mixins/layoutMixins";
import ChannelHeader from "./Components/Header/ChannelHeader";
import ChannelFooter from "./Components/Footer/ChannelFooter";
export default {
  components: {
    rootWrapper,
    ChannelHeader,
    ChannelFooter,
  },
  mixins: [layoutMixins],
  data() {
    return {
      dialogShow: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.router-view {
  position: relative;
  min-height: calc(100vh - 126px);
  display: flow-root;
}
.channel {
  display: block;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* 等于footer的高度 */
  margin-bottom: -50px;
}

.btn-wrapper {
  padding: 0 20px;
  .divider {
    margin-top: 10px;
  }
}
.channel ::v-deep .el-tabs__item {
  font-size: 14px;
}
.channel ::v-deep .el-tabs__item.is-active {
  font-size: 16px;
}
.channel ::v-deep .el-dropdown-link {
  span {
    width: 74%;
  }
}
.channel ::v-deep .user-wrapper {
  .iep-header-trigger {
    &:nth-child(1),
    &:last-child {
      min-width: 115px;
    }
  }
}
</style>
