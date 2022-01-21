<template>
  <div class="boby">
    <hotestMaterial class="tpl" ref="success"></hotestMaterial>
    <contribution class="tpl" ref="newest"></contribution>
  </div>
</template>
<script>
import hotestMaterial from "../components/hotestMaterial";
import contribution from "../components/contribution";
export default {
  components: { contribution, hotestMaterial },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.tpl {
  margin-bottom: 20px;
}
</style>
