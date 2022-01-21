<template>
  <div class="style-layout">
    <div class="style-main">
      <Aside @changeIsJoin="changeIsJoin"></Aside>
      <transition name="fade-up-in-transform" mode="out-in">
        <router-view :isJoin="isJoin"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import Aside from "./Components/Aside";
export default {
  inject: ["reload"],
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      this.reload();
    }
    next();
  },
  data() {
    return {
      isJoin: 0,
    };
  },
  methods: {
    changeIsJoin(v) {
      this.isJoin = v;
    },
  },
  components: {
    Aside,
  },
};
</script>
<style lang="scss" scoped>
.style-layout {
  background-color: $--background-color;
  .style-main {
    position: relative;
    margin: 20px auto 40px;
    width: 1200px;
    display: grid;
    gap: 20px;
    grid-template-columns: 350px 1fr;
  }
}
</style>
