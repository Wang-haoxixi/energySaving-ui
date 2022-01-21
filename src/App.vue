<template>
  <div class="iep-basic-scroll" id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import { parseToTimeSeconds } from "@/filters";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    // eslint-disable-next-line
    console.log(`前端名称：${BUILD_PRO_NAME}(${BUILD_VER_TAG})`);
    // eslint-disable-next-line
    console.log(`版本号：${BUILD_GIT_HASH}`);
    // eslint-disable-next-line
    console.log(`Node Version：${BUILD_NODE_VERSION}`);
    // eslint-disable-next-line
    console.log(`Yarn Version：${BUILD_YARN_VERSION}`);
    // eslint-disable-next-line
    console.log(`最近更新日期：${parseToTimeSeconds(BUILD_TIME)}`);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  line-height: 1.5;
  color: $--color-text-regular;
  background-color: #f9f9f9;
  -webkit-font-smoothing: antialiased;
  overflow: auto;
}
</style>
