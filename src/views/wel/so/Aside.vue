<template>
  <div class="aside-container">
    <div class="vip-img" v-intro="'还有疑问？速速前来 get 知识网红爆红的秘密吧！'" v-intro-step="8">
      <Vip></Vip>
    </div>
    <div
      class="quick-box"
      v-intro="'快捷入口在这里，大家都来点一点，数据资产多一点'"
      v-intro-step="4"
      v-intro-position="'left'"
    >
      <Quick></Quick>
    </div>
    <div class="rank-box">
      <Rank></Rank>
    </div>
    <!-- <div v-if="false" class="cyberstar-box">
      <Cyberstar></Cyberstar>
    </div>-->
  </div>
</template>
<script>
import Vip from "./Vip";
import Quick from "./Quick";
import Rank from "./Rank";
// import Cyberstar from "./Cyberstar";
export default {
  components: {
    Vip,
    Quick,
    Rank,
    // Cyberstar
  },
};
</script>
<style lang="scss" scoped>
.aside-container {
  display: grid;
  grid-template-columns: 275px;
  grid-template-rows: 180px 320px 480px;
  gap: 20px;
}
</style>
