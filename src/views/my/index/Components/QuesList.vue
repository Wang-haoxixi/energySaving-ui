<template>
  <div>
    <iep-no-data v-if="!value.length" complex style="width:100%;"></iep-no-data>
    <div v-else class="list-wrapper">
      <iep-ques-list-item v-for="(item) in value" :key="item.id" :value="item"></iep-ques-list-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuesList",
  props: {
    value: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .list-box {
    ::v-deep .top {
      max-width: 350px;
    }
  }
}
</style>