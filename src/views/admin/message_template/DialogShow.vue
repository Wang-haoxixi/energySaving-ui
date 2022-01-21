<template>
  <iep-dialog :dialog-show="dialogShow" title="查看" width="400px" @close="_close()">
    <iep-jodit-read :value="template"></iep-jodit-read>
  </iep-dialog>
</template>
<script>
// import { initForm } from "./options";
export default {
  data() {
    return {
      template: "",
      dialogShow: false,
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
  },
};
</script>
