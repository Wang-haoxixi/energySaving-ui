<template>
  <div class="style-layout">
    <div class="style-main">
      <Aside></Aside>
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
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
