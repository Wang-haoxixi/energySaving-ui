<template>
  <iep-dialog :dialog-show="show" :title="title" width="80%" @close="close">
    <div-content ref="content"></div-content>
  </iep-dialog>
</template>
<script>
import DivContent from "./components/content";
export default {
  components: {
    DivContent,
  },
  data() {
    return {
      show: false,
      title: "统计",
    };
  },
  methods: {
    open(id) {
      this.show = true;
      if (id) {
        // this.$refs.content.id = id;
        this.$refs.content.getList(id);
      }
    },
    close() {
      // this.$refs.divContent.resetData();
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>