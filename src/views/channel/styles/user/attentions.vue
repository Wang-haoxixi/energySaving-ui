<template>
  <div class="styles-wrap">
    <!-- <AttentionsSo></AttentionsSo> -->
    <AttentionsUser></AttentionsUser>
  </div>
</template>
<script>
import AttentionsUser from "./Components/AttentionsUser";
// import AttentionsSo from "./Components/AttentionsSo";
export default {
  components: {
    AttentionsUser,
    // AttentionsSo,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.styles-wrap {
  display: grid;
  grid-template-rows: auto;
  gap: 20px;
}
</style>
