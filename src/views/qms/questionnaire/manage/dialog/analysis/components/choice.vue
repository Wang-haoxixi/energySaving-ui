<template>
  <div>
    <div class="btn-wrap">
      <iep-button @click="openFillDialog">查看详细信息</iep-button>
    </div>
    <!-- dialog -->
    <fill-dialog ref="fillDialog"></fill-dialog>
  </div>
</template>

<script>
import FillDialog from "./fillDialog";
export default {
  name: "choice",
  methods: {
    // 填空题弹窗
    openFillDialog() {
      this.$refs.fillDialog.open({ ...this.data });
    },
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    FillDialog,
  },
};
</script>

<style scoped>
.btn-wrap {
  margin: 0 0 20px;
}
</style>
