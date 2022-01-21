<template>
  <div class="index-container">
    <Main></Main>
    <Aside></Aside>
  </div>
</template>
<script>
import Main from "./Main";
import Aside from "./Aside";
export default {
  components: {
    Main,
    Aside,
  },
};
</script>
<style lang="scss" scoped>
.index-container {
  display: grid;
  grid-template-columns: 1fr 275px;
  gap: 20px;
}
</style>
