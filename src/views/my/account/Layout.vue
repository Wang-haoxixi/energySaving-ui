<template>
  <div class="grid-container">
    <div class="menu-wrapper">
      <menu-wrapper prefix-url="/my/account/" :routerList="accountRouter"></menu-wrapper>
    </div>
    <div class="router-wrapper">
      <transition name="fade-up-in-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { accountRouter } from "../account/router";
import MenuWrapper from "../layouts/MenuWrapper";
export default {
  components: {
    MenuWrapper,
  },
  data() {
    return {
      accountRouter,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
[class$="-wrapper"] {
  background-color: #fff;
  border: 1px solid $--border-color;
  border-radius: $--small-border-radius;
}
.grid-container {
  display: grid;
  gap: 20px;
  margin: 20px auto;
  width: 1200px;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "menu-wrapper router-wrapper";
}
</style>
