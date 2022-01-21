<template>
  <iep-dialog title="分享组织" :dialogShow="dialogShow" @close="dialogShow=false" width="500px">
    <IepCustomInviteMember :orgId="form.orgId" :orgName="form.name"></IepCustomInviteMember>
  </iep-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { INVITE_STRING_FUNC } from "@/const/env";
import { OrgEntity } from "../../../types/org";

export default {
  name: "IepDialogInviteMember",
  props: {},
  data() {
    return {
      form: new OrgEntity(),
      dialogShow: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    suffixUrl() {
      return `/my/invite_org?orgId=${this.form.orgId}&userId=${this.userInfo.userId}`;
    },
    inviteLink() {
      return INVITE_STRING_FUNC(this.suffixUrl, this.form.name);
    },
  },
};
</script>
