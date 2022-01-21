<template>
  <div class="list">
    <div class="item-wrap" v-for="(v, i) in data" :key="i">
      <list-item @open="open" :data="v"></list-item>
    </div>
    <dialog-analysis ref="dialogAnalysis"></dialog-analysis>
  </div>
</template>

<script>
import listItem from "./listItem";
import DialogAnalysis from "@/views/qms/questionnaire/manage/dialog/analysis/dialog";

export default {
  name: "list",
  components: {
    listItem,
    DialogAnalysis,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    open({ id, name }) {
      this.$nextTick(() => {
        this.$refs.dialogAnalysis.open({ id, name });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  .item-wrap {
    border-radius: $--border-radius-base;
    transition: all 0.3s;
    border: 1px solid $--border-color;
    overflow: hidden;
    &:hover {
      box-shadow: 0 2px 12px 0 $--background-color;
      transform: translateY(-5px);
    }
  }
}
</style>
