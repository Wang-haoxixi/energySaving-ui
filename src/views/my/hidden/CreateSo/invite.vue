<template>
  <div>
    <create-org-layout>
      <div slot="header">
        <h4 class="title">
          <span class="iep-red">节能保</span>邀请
        </h4>
      </div>
      <div class="org-wrapper">
        <IepPopoverOrgCard :org-id="form.orgId" placement="left">
          <iep-img class="avatar" :src="form.orgAvatar"></iep-img>
          <div>{{form.orgName}}</div>
        </IepPopoverOrgCard>
      </div>
      <div class="user-wrapper">
        <iep-popover-user-card :user-id="form.inviter" placement="left">
          <iep-img class="user-avatar" :resizeOpt="{l:40}" :src="form.inviterAvatar"></iep-img>
        </iep-popover-user-card>
        <div>
          <span class="username">{{form.inviterName}}</span>邀请你加入节能保
        </div>
      </div>
      <el-form class="form-wrapper" :model="form" ref="form">
        <iep-input-area v-model="form.message" placeholder="申请加入理由（选填）"></iep-input-area>
        <template v-if="form.isCharge">
          <el-alert
            style="margin:10px 0"
            :title="`加入当前组织需缴纳 ${form.cost} 宝贝，是否确认申请？`"
            type="warning"
            :closable="false"
          ></el-alert>
          <el-form-item prop="safePassword">
            <el-input
              v-model="form.safePassword"
              type="password"
              autocomplete="new-password"
              placeholder="请输入支付密码"
            ></el-input>
          </el-form-item>
        </template>
        <el-button
          type="primary"
          class="iep-btn-block"
          :loading="submitFormLoading"
          @click="mixinsSubmitFormGen()"
        >立即加入</el-button>
      </el-form>
    </create-org-layout>
  </div>
</template>
<script>
import { encryption } from "@/util/util";
import formMixins from "@/mixins/formMixins";
import CreateOrgLayout from "./layout";
import { getOrgById, applyOrg } from "@/api/admin/org";
import { getUserById } from "@/api/admin/user";
export default {
  mixins: [formMixins],
  components: {
    CreateOrgLayout,
  },
  data() {
    return {
      form: {
        orgId: 0,
        orgName: "",
        orgAvatar: "",
        inviter: 0, // 邀请人用户ID
        inviterAvatar: "",
        inviterName: "",
        message: "", //申请加入理由 150 words
        cost: 0,
        isCharge: "",
      },
    };
  },
  created() {
    this.loadOrg();
    this.loadInviter();
  },
  methods: {
    async submitForm() {
      const form = encryption({
        data: this.form,
        param: ["safePassword"],
      });
      const { data } = await applyOrg(form);
      if (data) {
        this.$message("您的入组申请将在2个工作日内得到处理。");
        this.$openPage("/");
      }
    },
    async loadInviter() {
      const { data } = await getUserById(this.$route.query.userId);
      this.form.inviter = data.userId;
      this.form.inviterAvatar = data.avatar;
      this.form.inviterName = data.realName;
    },
    async loadOrg() {
      const { data } = await getOrgById(this.$route.query.orgId);
      this.form.orgId = data.orgId;
      this.form.orgName = data.name;
      this.form.orgAvatar = data.avatar;
      this.form.cost = data.cost;
      this.form.isCharge = data.isCharge;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.org-wrapper {
  border-bottom: 1px solid $--border-color;
  padding-bottom: 10px;
}
.user-wrapper {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .username {
    margin-right: 10px;
  }
}
.form-wrapper {
  margin: 0 50px;
  .iep-btn-block {
    margin-top: 10px;
    height: 42px;
  }
}
</style>
