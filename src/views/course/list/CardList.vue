<template>
  <div class="card-list">
    <IepCourseCard v-for="(item) in data" :key="item.id" :course="item"></IepCourseCard>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.card-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 285px);
}
</style>
