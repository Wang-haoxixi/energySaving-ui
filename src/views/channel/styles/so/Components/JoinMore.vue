<template>
  <div class="join-more">
    <el-link :underline="false" @click="handleLink">{{!this.isJoin&&"加入组织"||""}}查看更多</el-link>
    <IepDialogReqJoinSo ref="IepDialogReqJoinSo" @load-page="reload()"></IepDialogReqJoinSo>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["path", "isJoin"],
  inject: ["reload"],
  computed: {
    ...mapGetters(["currentMenuGroup"]),
    id() {
      return +this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async handleLink() {
      if (this.isJoin) {
        // 已加入
        // this.handleChangeOrg(this.id);
        this.$openPage(
          `/channel/styles/so/${this.$route.params.id}/${this.path}`,
        );
      } else {
        // 未加入
        this.handleReqSo();
      }
    },
    async handleChangeOrg(id) {
      await this.orgChangeAction(id);
      this.$openPage(`/wel/${this.currentMenuGroup.path}`);
      this.reload();
    },
    handleReqSo() {
      this.$refs["IepDialogReqJoinSo"].orgId = this.id;
      this.$refs["IepDialogReqJoinSo"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.join-more {
  ::v-deep .el-link {
    display: flex;
    align-items: flex-end;
    flex: 1;
    span {
      height: 14px;
      line-height: 14px;
    }
  }
}
</style>
