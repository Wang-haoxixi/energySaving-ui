<template>
  <div>
    <create-org-layout>
      <div slot="header">
        <h4 class="title">
          <span class="iep-red">邀请</span>好友加入
        </h4>
      </div>
      <IepCustomInviteMember :orgId="orgId" :orgName="orgName"></IepCustomInviteMember>
      <div class="opt-box">
        <el-link @click="handleChangeOrg()">
          跳过
          <i class="el-icon-right el-icon--right"></i>
        </el-link>
      </div>
    </create-org-layout>
  </div>
</template>
<script>
import CreateOrgLayout from "./layout";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CreateOrgLayout,
  },
  computed: {
    ...mapGetters(["userInfo"]),
    orgId() {
      return this.$route.query.orgId ?? 0;
    },
    orgName() {
      const name = this.$route.query.orgName ?? "暂无";
      return decodeURIComponent(name);
    },
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async handleChangeOrg() {
      await this.orgChangeAction(this.orgId);
      this.$openPage("/so/workplace");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.opt-box {
  text-align: right;
}
.opt-box ::v-deep .el-link--inner {
  color: $--color-primary;
}
</style>
