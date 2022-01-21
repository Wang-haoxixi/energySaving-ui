<template>
  <iep-dialog :dialog-show="dialogShow" :title="`审核`" width="80%" @close="close"></iep-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    close() {
      this.dialogShow = false;
    },
    open() {
      this.dialogShow = true;
    },
  },
};
</script>