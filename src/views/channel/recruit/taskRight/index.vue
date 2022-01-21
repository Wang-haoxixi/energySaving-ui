<template>
  <div class="boby">
    <HotestTpl class="hotest" ref="success"></HotestTpl>
    <YourLike class="yourLink" ref="yourLink"></YourLike>
    <NewestRecruit class="newest" ref="newest"></NewestRecruit>
  </div>
</template>
<script>
import HotestTpl from "../components/hotestSo";
import YourLike from "../components/yourLike";
import NewestRecruit from "../components/newestRecruit";
export default {
  components: { HotestTpl, YourLike, NewestRecruit },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.hotest,
.yourLink {
  margin-bottom: 20px;
}
</style>
