<template>
  <div class="boby">
    <NewestTpl class="newest" ref="newest"></NewestTpl>
    <HotestTpl class="hotest" ref="success"></HotestTpl>
  </div>
</template>
<script>
import NewestTpl from "../components/newestTask";
import HotestTpl from "../components/hotestSo";
export default {
  components: { NewestTpl, HotestTpl },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.newest {
  margin-bottom: 20px;
}
</style>
