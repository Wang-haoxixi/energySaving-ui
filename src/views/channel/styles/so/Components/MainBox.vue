<template>
  <div class="main-wrap">
    <iep-img class="avatar" :src="form.avatar" @click.native="handleIndex()"></iep-img>
    <div class="name">
      <span class="iep-ellipsis" :title="form.name">{{form.name}}</span>
      <IepRednessIcon :redness="form.redness"></IepRednessIcon>
    </div>
    <div class="sign iep-ellipsis">{{form.slogan}}</div>
    <div class="tag-list">
      <el-tag
        type="info"
        size="small"
        v-for="(tag,i) in form.abilityTag.slice(0,3)"
        :key="i"
      >{{tag}}</el-tag>
    </div>
    <div class="opt-btn">
      <el-button
        type="primary"
        v-hoverSpan="{isFlag:!!form.isJoin,default:'申请+组织',cancel:'已加入',active:'已加入'}"
        @click="handleReqSo()"
        :disabled="!!form.isJoin"
      ></el-button>
      <el-button
        type="primary"
        plain
        v-hoverSpan="{isFlag:form.isFollow,default:'关注',cancel:'取消关注',active:'已关注'}"
        @click="handleFollow()"
      ></el-button>
      <el-button type="primary" plain @click="handleReport()">举报</el-button>
      <!-- <el-button type="primary" icon="el-icon-more" plain></el-button> -->
    </div>
    <div class="data">
      <IepDataItem :value="form.exponent.creditWorth" label="信用值"></IepDataItem>
      <IepDataItem :value="form.exponent.bellAssets" label="宝贝"></IepDataItem>
      <IepDataItem
        active
        :value="form.exponent.mightyOne"
        label="用户"
        @click.native="handleMember()"
      ></IepDataItem>
      <IepDataItem :value="form.exponent.taskCount" label="任务数"></IepDataItem>
    </div>
    <IepDialogReqJoinSo ref="IepDialogReqJoinSo" @load-page="reloadPage()"></IepDialogReqJoinSo>
  </div>
</template>
<script>
import { follow } from "@/api/admin/follow";
import { OrgExponentEntity } from "@/types/org";
import { mapGetters, mapMutations } from "vuex";
class SoMainDTO {
  orgId = 0;
  isJoin = 0;
  isFollow = 0;
  avatar = "";
  name = "";
  abilityTag = [];
  slogan = "";
  redness = 1;
  exponent = new OrgExponentEntity();
}
export default {
  inject: ["reload"],
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    form() {
      const f = this.$mergeByFirst(new SoMainDTO(), this.value);
      return f;
    },
  },
  methods: {
    handleIndex() {
      this._openPage();
    },
    handleMember() {
      this._openPage("member");
    },
    _openPage(suffix = "index") {
      this.$openPage(`/channel/styles/so/${this.$route.params.id}/${suffix}`);
    },
    handleReqSo() {
      this.$refs["IepDialogReqJoinSo"].orgId = this.form.orgId;
      this.$refs["IepDialogReqJoinSo"].dialogShow = true;
    },
    async handleFollow() {
      const { data } = await follow({
        userId: this.userInfo.userId,
        followId: this.form.orgId,
        sign: this.form.isFollow, // 0-关注 1-不关注
        type: 2, // 1-用户 2-组织 3-话题
      });
      if (data) {
        this.reloadPage();
      }
    },
    reloadPage() {
      this.reload();
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport() {
      this.openReportDialog({ id: this.value.orgId, type: 4 });
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
    max-width: 300px;
    margin-top: 12px;
    font-size: 18px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .tag-list {
    margin: 5px 0;
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
