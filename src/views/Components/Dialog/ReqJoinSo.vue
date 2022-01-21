<template>
  <iep-dialog
    class="dialog"
    title="申请 + 组织"
    :dialogShow="dialogShow"
    @close="_close()"
    width="400px"
    @mounted="load()"
  >
    <IepOrgCard ref="IepOrgCard" @success="close()"></IepOrgCard>
  </iep-dialog>
</template>
<script>
export default {
  name: "IepDialogReqJoinSo",
  data() {
    return {
      dialogShow: false,
    };
  },
  methods: {
    close() {
      this._close();
      this.$emit("load-page");
    },
    _close() {
      this.dialogShow = false;
    },
    load() {
      this.$nextTick(() => {
        this.$refs["IepOrgCard"].loadOrg(this.orgId);
        this.$refs["IepOrgCard"].handleOpenJoin();
      });
    },
  },
};
</script>
