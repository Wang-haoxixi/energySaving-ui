<template>
  <el-dialog
    class="iep-dialog"
    :title="title"
    width="500px"
    :visible="dialogShow"
    append-to-body
    :close-on-click-modal="closeOnClickModal"
    @close="close()"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="desc" class="desc"></slot>
    <div slot="footer" class="dialog-footer">
      <slot name="button"></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "IepDialogMessage",
  inheritAttrs: false,
  props: {
    title: {
      default: "标题",
      type: String,
      required: true,
    },
    closeOnClickModal: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    close() {
      this.dialogShow = false;
      this.$emit("close");
    },
  },
};
</script>
