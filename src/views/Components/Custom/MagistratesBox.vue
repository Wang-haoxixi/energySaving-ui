<template>
  <span class="span-box">
    <span v-if="!magistrates.length">暂无</span>
    <IepUserSmallCard v-else v-for="p in magistrates.slice(0,6)" :key="p.id" :user="p"></IepUserSmallCard>
  </span>
</template>
<script>
export default {
  name: "IepMagistratesBox",
  props: {
    magistrates: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.span-box {
  margin-left: 10px;
  .person-img {
    margin-left: -10px;
  }
  // span:nth-child(4) {
  //   margin-left: 0;
  // }
}
</style>
