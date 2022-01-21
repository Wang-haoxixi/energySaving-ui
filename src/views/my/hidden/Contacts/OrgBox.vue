<template>
  <div class="contact-box" v-loading="loading">
    <div class="basic-box">
      <iep-img class="avatar" :resizeOpt="{l:100}" :src="form.avatar"></iep-img>
      <div class="info-box">
        <div class="name">{{form.name}}</div>
        <div class="info">
          <div>负责人：{{form.creator}}</div>
          <div>{{form.slogan}}</div>
        </div>
      </div>
    </div>
    <div class="tag-box">
      <div class="tag-item">
        <span>{{$constTagLabel.abilityTag.soName}}：</span>
        <IepTags :value="form.abilityTag"></IepTags>
      </div>
    </div>
    <div class="data-box">
      <IepDataItem :value="form.exponent.creditWorth" label="信用值"></IepDataItem>
      <IepDataItem :value="form.exponent.bellAssets" label="宝贝"></IepDataItem>
      <IepDataItem :value="form.exponent.mightyOne" label="用户"></IepDataItem>
      <IepDataItem :value="form.exponent.taskCount" label="任务数"></IepDataItem>
    </div>
    <div class="btn-box">
      <ican-button
        :type="`${form.isFollow?'plain':'primary'}`"
        @click="handleFollow()"
        v-hoverSpan="{isFlag:form.isFollow ,default:'关注',cancel:'取消关注',active:'已关注'}"
      ></ican-button>
      <ican-button type="plain" @click="handleSendMsg()">聊天</ican-button>
      <ican-button
        v-if="form.isOpen"
        type="plain"
        @click="$openPage(`${$pathPrefix_SoStyle}${form.orgId}`)"
      >组织风采</ican-button>
    </div>
  </div>
</template>
<script>
import { getOrgById } from "@/api/admin/org";
import { OrgEntity } from "@/types/org";
import { follow } from "@/api/admin/follow";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      form: new OrgEntity(),
      contactList: [
        {
          icon: "el-icon-woneng-tel-sx",
          label: "mobile",
        },
        {
          icon: "el-icon-woneng-weixin1",
          label: "weiXin",
        },
        {
          icon: "el-icon-woneng-QQ",
          label: "qq",
        },
        {
          icon: "el-icon-woneng-youxiang-sxshixin",
          label: "mail",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.loadPage();
  },
  methods: {
    ...mapActions(["imcOpenConversionByTargetId"]),
    handleSendMsg() {
      this.imcOpenConversionByTargetId({
        targetId: this.form.orgId + "",
        type: 3,
      });
    },
    async handleFollow() {
      const { data } = await follow({
        userId: this.userInfo.userId,
        followId: this.form.orgId,
        sign: this.form.isFollow, // 0-关注 1-不关注
        type: 2, // 1-用户 2-组织 3-话题
      });
      if (data) {
        this.loadPage(this.form.orgId);
      }
    },
    async loadPage(orgId = this.userInfo.orgId) {
      this.loading = true;
      const { data } = await getOrgById(orgId);
      this.form = this.$mergeByFirst(new OrgEntity(), data);
      this.loading = false;
    },
  },
};
</script>s
<style lang="scss" scoped>
@import "./common.scss";
</style>
