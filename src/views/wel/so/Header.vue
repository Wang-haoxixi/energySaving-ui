<template>
  <div class="header-box box">
    <div class="avatar">
      <iep-img :src="form.avatar"></iep-img>
    </div>
    <div class="info-box">
      <div class="name-box">
        <div class="title">
          <h2 @click="$openPage(`${$pathPrefix_SoStyle}${form.orgId}`)">{{form.name}}</h2>
          <!-- <el-tag>已认证</el-tag> -->
          <IepRednessIcon
            v-if="soRedness"
            class="redness-icon"
            :redness="form.redness"
            @click.native="$openPage('/so/redness')"
          ></IepRednessIcon>
        </div>
        <el-button class="iep-btn-m" v-show="form.allowJoin" type="primary" @click="invite()">邀请+组织</el-button>
      </div>
      <div class="desc-box">
        成立时间：{{form.establishmentTime|parseToDay}} 行业：{{form.industry | showText}}
        <br />
        {{form.slogan | showText}}
      </div>
      <div class="person-box">
        <span>负责人：</span>
        <IepUserSmallCard :user="form.owner"></IepUserSmallCard>
        <template v-if="form.magistrates.length">
          <span class="post">知事：</span>
          <IepMagistratesBox :magistrates="form.magistrates" />
        </template>
      </div>
    </div>
    <IepDialogInviteMember ref="IepDialogInviteMember"></IepDialogInviteMember>
  </div>
</template>
<script>
import { hasPermissions } from "@/util/menu";
import { OrgEntity } from "@/types/org";
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    soRedness() {
      return hasPermissions("so_redness");
    },
    form() {
      const data = this.$mergeByFirst(new OrgEntity(), this.value);
      return data;
    },
  },
  methods: {
    invite() {
      this.$refs["IepDialogInviteMember"].form = { ...this.form };
      this.$refs["IepDialogInviteMember"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.header-box {
  display: flex;
  .redness-icon {
    cursor: pointer;
  }
  .avatar {
    flex: 0 0 140px;
    width: 140px;
    height: 140px;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    margin-left: 20px;
    .name-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: flex;
        align-items: center;
        h2 {
          margin: 0;
          margin-right: 10px;
          font-size: 20px;
          font-weight: 400;
          font-family: "微软雅黑";
          color: $--color-text-primary;
          cursor: pointer;
          &:hover {
            color: $--color-text-secondary;
          }
        }
        // ::v-deep .el-tag {
        //   padding: 0;
        //   width: 50px;
        //   height: 20px;
        //   text-align: center;
        //   line-height: 20px;
        //   font-size: 12px;
        //   border-radius: 5px;
        // }
      }
    }
    .desc-box {
      font-size: 14px;
      color: $--color-text-regular;
    }
    .person-box {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $--color-text-regular;
      .post {
        margin-left: 20px;
      }
    }
  }
}
</style>
