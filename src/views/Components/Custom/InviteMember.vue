<template>
  <div>
    <div class="code-box">
      <iep-img class="code" :src="codeImg"></iep-img>
      <div class="txt">邀请您加入“{{orgName}}”</div>
      <a id="imglink" ref="imglink" :href="codeImg" download="code.jpg"></a>
      <el-button class="iep-btn-long" type="primary" @click="$refs['imglink'].click()" plain>保存图片</el-button>
    </div>
    <div class="cope-box">
      <iep-input-area class="area" slot="desc" v-model="inviteLink"></iep-input-area>
      <el-button
        slot="button"
        type="primary"
        class="iep-btn-long"
        v-copy="inviteLink"
        @click="handleCopy()"
      >复制邀请链接</el-button>
    </div>
  </div>
</template>
<script>
import { getOrgShareQrSrc } from "@/api/admin/org";
import { INVITE_STRING_FUNC } from "@/const/env";
import { mapGetters } from "vuex";
export default {
  name: "IepCustomInviteMember",
  props: {
    orgId: {
      type: [Number, String],
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      codeImg: "/img/back/code.jpg",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    suffixUrl() {
      return `/my/invite_org?orgId=${this.orgId}&userId=${this.userInfo.userId}`;
    },
    inviteLink() {
      return INVITE_STRING_FUNC(this.suffixUrl, this.orgName);
    },
  },
  mounted() {
    this.loadImg();
  },
  methods: {
    async loadImg() {
      const { data } = await getOrgShareQrSrc(this.orgId);
      this.codeImg = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.code-box,
.cope-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .txt {
    font-size: 14px;
    color: $--color-text-secondary;
  }
}
.code-box ::v-deep .el-image {
  margin-bottom: 10px;
  width: 145px;
  height: 145px;
  overflow: hidden;
}
.code-box ::v-deep .el-image__inner {
  width: 100%;
  height: 100%;
}
.code-box ::v-deep .el-alert__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0;
  width: 100%;
}
.code-box ::v-deep .el-alert__title {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  font-family: "微软雅黑";
  line-height: 1.8;
  vertical-align: middle;
  color: $--color-text-primary;
}
.code-box ::v-deep .el-alert__description {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
  margin-top: 0;
  color: $--color-primary;
  cursor: pointer;
}
.code-box ::v-deep .el-alert__description:hover {
  opacity: 0.7;
  text-decoration: underline;
}
.cope-box {
  margin-top: 25px;
}
.area ::v-deep .el-textarea__inner {
  background-color: #fafafa;
}
</style>
