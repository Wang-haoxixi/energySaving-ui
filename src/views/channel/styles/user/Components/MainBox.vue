<template>
  <div class="main-wrap">
    <iep-img class="avatar" :src="form.avatar" @click.native="handleIndex()"></iep-img>
    <div class="name">
      <span class="iep-ellipsis" :title="form.realName">{{form.realName}}</span>
      <IepRednessIcon :redness="form.redness"></IepRednessIcon>
    </div>
    <div class="desc iep-ellipsis">
      <span class="company">{{form.company}}</span>
      <span class="industry">{{form.industry}}</span>
    </div>
    <div class="tag-list">
      <el-tag
        type="info"
        size="small"
        v-for="(tag,i) in form.abilityTag.slice(0,3)"
        :key="i"
      >{{tag}}</el-tag>
    </div>
    <div class="sign iep-ellipsis">{{form.sign}}</div>
    <div class="opt-btn">
      <el-button
        type="primary"
        plain
        v-show="form.isFollowed || !form.isBlock"
        @click="handleFollow(form)"
        :loading="loadingFollow"
        v-hoverSpan="{isFlag:form.isFollowed ,default:'关注',cancel:'取消关注',active:'已关注'}"
        :disabled="disabledSelf"
      ></el-button>
      <el-button
        type="primary"
        plain
        v-hoverSpan="{isFlag:form.isFriend,default:'添加好友',cancel:'删除好友',active:'已为好友'}"
        @click="form.isFriend?handleDeleteFriend():handleCreateFriend()"
        :disabled="disabledSelf"
      ></el-button>
      <el-button
        type="primary"
        plain
        @click="(!form.isMaster && !form.isApprentice)?handleCreateMentor():handleCancelMentor()"
        v-hoverSpan="{isFlag:(form.isMaster || form.isApprentice),default:'拜师',cancel:`${form.isMaster?'取消拜师':'取消收徒'}`,active:'已为师徒'}"
        :disabled="disabledSelf"
      ></el-button>
      <el-dropdown>
        <el-button type="primary" icon="el-icon-more" plain :disabled="disabledSelf"></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleInviteUserSo()">+组织</el-dropdown-item>
          <el-dropdown-item @click.native="handleAddBlackList()">拉黑</el-dropdown-item>
          <el-dropdown-item @click.native="handleReport()">举报</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="data">
      <IepDataItem :value="form.exponent.credit" label="信用值"></IepDataItem>
      <IepDataItem active :value="form.exponent.fan" label="粉丝" @click.native="handleFans()"></IepDataItem>
      <IepDataItem
        active
        :value="form.exponent.follow"
        label="关注"
        @click.native="handleAttentions()"
      ></IepDataItem>
      <IepDataItem :value="form.exponent.taskCount" label="任务数"></IepDataItem>
    </div>
    <IepDialogInviteUserSo ref="IepDialogInviteUserSo" @load-page="refresh()"></IepDialogInviteUserSo>
    <IepDialogCreateFriend ref="IepDialogCreateFriend" @load-page="refresh()"></IepDialogCreateFriend>
    <IepDialogCreateMentor ref="IepDialogCreateMentor" @load-page="refresh()"></IepDialogCreateMentor>
    <IepDialogTransferNb ref="IepDialogTransferNb" @load-page="refresh()"></IepDialogTransferNb>
  </div>
</template>
<script>
import followMixins from "@/mixins/followMixins";
import operationMixins from "@/mixins/operationMixins";
import currentMixins from "@/views/my/hidden/Contacts/mixins/mixins";
import { UserExponentEntity } from "@/types/user";
import { mapGetters, mapMutations } from "vuex";
class UserMainDTO {
  userId = 0;
  avatar = "";
  realName = "";
  position = "";
  company = "";
  isMaster = 0;
  isApprentice = 0;
  isFriend = 0;
  abilityTag = [];
  sign = "";
  company = "";
  industry = "";
  currentUserOrg = [];
  isFollowed = 0;
  exponent = new UserExponentEntity();
  redness = 0;
}
export default {
  mixins: [currentMixins, operationMixins, followMixins],
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    disabledSelf() {
      return this.userInfo.userId === this.form.userId;
    },
    form() {
      return this.$mergeByFirst(new UserMainDTO(), this.value);
    },
  },
  methods: {
    loadPage() {
      this.refresh();
    },
    refresh() {
      this.$emit("refresh");
    },
    // +SO
    handleInviteUserSo() {
      this.$refs[
        "IepDialogInviteUserSo"
      ].currentUserOrg = this.form.currentUserOrg;
      this.$refs["IepDialogInviteUserSo"].form.userId = this.form.userId;
      this.$refs["IepDialogInviteUserSo"].dialogShow = true;
    },
    handleIndex() {
      this._openPage();
    },
    handleFans() {
      this._openPage("fans");
    },
    handleAttentions() {
      this._openPage("attentions");
    },
    _openPage(suffix = "index") {
      this.$openPage(`/channel/styles/user/${this.$route.params.id}/${suffix}`);
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport() {
      this.openReportDialog({ id: this.value.userId, type: 10 });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border: 1px solid $--border-color;
    // cursor: pointer;
  }
  .name {
    display: flex;
    align-items: center;
    max-width: 300px;
    margin-top: 12px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    span {
      display: inline-block;
      &:nth-child(1) {
        max-width: 200px;
      }
    }
    // .icon {
    //   margin-left: 3px;
    //   font-size: 16px;
    // }
  }
  .desc {
    margin-top: 5px;
    font-size: 14px;
    color: $--color-text-regular;
    max-width: 300px;
    .industry {
      margin-left: 10px;
    }
  }
  .tag-list {
    margin-top: 5px;
    .el-tag + .el-tag {
      margin-left: 10px;
    }
  }
  .sign {
    max-width: 300px;
    margin-top: 5px;
    font-size: 14px;
    color: $--color-text-regular;
  }
  .opt-btn {
    margin-top: 10px;
    .el-dropdown {
      margin-left: 10px;
    }
  }
  .data {
    display: flex;
    margin-top: 20px;
    width: 100%;
    justify-content: space-around;
  }
}
.data ::v-deep .data-item {
  margin: 5px 0 15px;
  padding: 0 10px;
  width: 25%;
  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    border-right: 1px solid $--border-color;
  }
}
</style>
