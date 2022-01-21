<template>
  <el-dialog
    custom-class="iep-message-box-dialog"
    :visible="dialogShow"
    :modal="false"
    append-to-body
    width="85%"
    top="5vh"
    :lock-scroll="false"
    @close="close()"
    v-dialogDrag
  >
    <template slot="title">
      会话
      <span>({{conversationList.length}})</span>
    </template>
    <message-layout></message-layout>
  </el-dialog>
</template>
<script>
import MessageLayout from "./layout";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    MessageLayout,
  },
  computed: {
    ...mapState({
      dialogShow: state => state.imc.dialogShow,
      conversationList: state => state.imc.conversationList,
    }),
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    close() {
      this.setDialogShow(false);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
