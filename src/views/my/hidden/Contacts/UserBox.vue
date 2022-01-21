<template>
  <div class="contact-box" v-loading="loading">
    <div class="basic-box">
      <iep-img class="avatar" :resizeOpt="{l:100}" :src="form.avatar"></iep-img>
      <div class="info-box">
        <div class="name">
          <span class="iep-ellipsis" :title="form.realName">{{form.realName}}</span>
          <svg class="icon iep-icon" aria-hidden="true">
            <use xlink:href="#iep2-iconicon-V1" />
          </svg>
        </div>
        <div class="info">
          <div class="detail">
            <IepDivDetail :value="form.workPlace"></IepDivDetail>
            <el-divider direction="vertical"></el-divider>
            <IepDivDetail :value="form.position"></IepDivDetail>
          </div>
          <div>{{form.company}}</div>
        </div>
      </div>
    </div>
    <div class="tag-box">
      <div class="tag-item">
        <span>{{$constTagLabel.abilityTag.shortName}}：</span>
        <IepTags :value="form.abilityTag"></IepTags>
      </div>
    </div>
    <!-- 自己的隐私可以看到，不管如何设置 -->
    <!-- <div v-if="form.isPrivacy || userInfo.userId === form.userId" class="information-box"> -->
    <div v-if="form.isPrivacy==1 || userInfo.userId === form.userId" class="information-box">
      <div class="item">
        <i class="el-icon-woneng-youxiang-sxshixin"></i>
        <iep-div-detail class="con" :value="form.mail" :title="form.mail"></iep-div-detail>
      </div>
      <div class="item">
        <i class="el-icon-woneng-tel-sx"></i>
        <iep-div-detail class="con" :value="form.mobile" :title="form.mobile"></iep-div-detail>
      </div>
      <div class="item">
        <i class="el-icon-woneng-weixin1"></i>
        <iep-div-detail class="con" :value="form.weiXin" :title="form.weiXin"></iep-div-detail>
      </div>
      <div class="item">
        <i class="el-icon-woneng-QQ"></i>
        <iep-div-detail class="con" :value="form.qq" :title="form.qq"></iep-div-detail>
      </div>
    </div>
    <!-- 自己的名片不需要 -->
    <div v-if="userInfo.userId !== form.userId" class="btn-box">
      <ican-button
        :type="`${form.isFollowed?'plain':'primary'}`"
        v-show="form.isFollowed || !form.isBlock"
        @click="handleFollow(form)"
        v-hoverSpan="{isFlag:form.isFollowed ,default:'关注',cancel:'取消关注',active:'已关注'}"
      ></ican-button>
      <ican-button
        v-show=" !form.isBlock"
        type="plain"
        @click="(!form.isMaster && !form.isApprentice)?handleCreateMentor():handleCancelMentor()"
        v-hoverSpan="{isFlag:(form.isMaster || form.isApprentice),default:'拜师',cancel:`${form.isMaster?'取消拜师':'取消收徒'}`,active:'已为师徒'}"
      ></ican-button>
      <ican-button
        v-show="!form.isBlock &&(form.isFriend||form.isMaster || form.isApprentice)"
        type="plain"
        @click="handleSendMsg()"
      >聊天</ican-button>
      <ican-button type="plain" @click="openStyle(form)">个人风采</ican-button>
      <ican-button
        v-hoverSpan="{isFlag:form.isFriend,default:'添加好友',cancel:'删除好友',active:'已为好友'}"
        type="plain"
        @click="form.isFriend?handleDeleteFriend():handleCreateFriend()"
      ></ican-button>
      <ican-button type="plain" v-if="!form.isBlock" @click="handleAddBlackList()">拉黑</ican-button>
    </div>
    <IepDialogCreateFriend ref="IepDialogCreateFriend" @load-page="refresh()"></IepDialogCreateFriend>
    <IepDialogCreateMentor ref="IepDialogCreateMentor" @load-page="refresh()"></IepDialogCreateMentor>
  </div>
</template>
<script>
import followMixins from "@/mixins/followMixins";
import operationMixins from "@/mixins/operationMixins";
import currentMixins from "./mixins/mixins";
import { UserCardEntity } from "@/types/user";
import { getUserCardById } from "@/api/admin/user";
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [operationMixins, currentMixins, followMixins],
  data() {
    return {
      loading: false,
      form: new UserCardEntity(),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["imcOpenConversionByTargetId", "imcDelConversationById"]),
    handleSendMsg() {
      this.imcOpenConversionByTargetId({
        targetId: this.form.userId + "",
        type: 1,
        messageContent: "",
      });
    },
    refresh() {
      this.loadPage(this.form.userId);
    },
    async loadPage(userId = this.userInfo.userId) {
      this.loading = true;
      const { data } = await getUserCardById(userId);
      this.form = this.$mergeByFirst(new UserCardEntity(), data);
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
</style>
