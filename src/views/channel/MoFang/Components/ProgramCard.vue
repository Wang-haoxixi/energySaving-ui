<template>
  <div class="program-card">
    <ProgramItem v-for="(item) in itemList" :key="item.planId" :program="item"></ProgramItem>
  </div>
</template>
<script>
import ProgramItem from "./ProgramItem";
export default {
  props: {
    itemList: {
      type: Array,
      required: true,
    },
  },
  components: { ProgramItem },
};
</script>
<style lang="scss" scoped>
.program-card {
  display: grid;
  grid-auto-flow: row dense;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}
</style>
