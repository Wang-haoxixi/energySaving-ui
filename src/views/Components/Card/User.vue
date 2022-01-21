<template>
  <div class="user-card-wrapper" v-loading="loading">
    <div class="info-wrapper">
      <div class="avatar-wrapper" title="进入风采页" @click="openStyle(form)">
        <iep-img class="img" :src="form.avatar" :resizeOpt="{l:80}"></iep-img>
      </div>
      <div class="text-wrapper">
        <div>
          <el-link
            class="name iep-ellipsis-flex"
            title="进入风采页"
            @click="openStyle(form)"
            :underline="false"
          >
            <span class="iep-ellipsis" :title="form.realName">{{form.realName}}</span>
            <IepRednessIcon :redness="form.redness"></IepRednessIcon>
          </el-link>
        </div>
        <div class="position-box">
          <IepDivDetail
            v-if="form.householdRegister"
            :value="form.householdRegister | firstAddress"
          ></IepDivDetail>
          <el-divider v-if="form.householdRegister&&form.position" direction="vertical"></el-divider>
          <IepDivDetail v-if="form.position" :value="form.position | lastPosition"></IepDivDetail>
        </div>
        <div class="company">{{form.company | showText}}</div>
      </div>
    </div>
    <IepTags class="tag-list" :value="form.tags"></IepTags>
    <!-- <div v-if="form.isPrivacy" class="contact-wrapper"> -->
    <div v-if="form.isPrivacy==1" class="contact-wrapper">
      <span v-for="(contact,i) in contactList" :key="i">
        <i :class="contact.icon"></i>
        <iep-div-detail class="con" :value="form[contact.label]" :title="form[contact.label]"></iep-div-detail>
      </span>
    </div>
    <div class="opt-box">
      <template v-if="userInfo.userId!== form.userId">
        <ican-button
          type="plain"
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
          v-hoverSpan="{isFlag:form.isFriend,default:'添加好友',cancel:'删除好友',active:'已为好友'}"
          type="plain"
          @click="form.isFriend?handleDeleteFriend():handleCreateFriend()"
        ></ican-button>
      </template>
    </div>
    <IepDialogCreateFriend ref="IepDialogCreateFriend"></IepDialogCreateFriend>
    <IepDialogCreateMentor ref="IepDialogCreateMentor"></IepDialogCreateMentor>
  </div>
</template>
<script>
import followMixins from "@/mixins/followMixins";
import operationMixins from "@/mixins/operationMixins";
import { getUserCardById } from "@/api/admin/user";
import { UserCardEntity } from "@/types/user";
import { mapGetters } from "vuex";
export default {
  mixins: [operationMixins, followMixins],
  name: "IepUserCard",
  data() {
    return {
      loading: false,
      form: new UserCardEntity(),
      contactList: [
        {
          icon: "el-icon-woneng-youxiang",
          label: "mail",
        },
        {
          icon: "el-icon-woneng-shouji-sx",
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
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async loadUser(id, isLoad = true) {
      this.loading = isLoad ? true : false;
      const { data } = await getUserCardById(id);
      this.form = this.$mergeByFirst(new UserCardEntity(), data);
      this.loading = false;
    },
    async refresh() {
      await this.loadUser(this.form.userId, false);
    },
    // 需要followMixins
  },
};
</script>
<style lang="scss" scoped>
.user-card-wrapper {
  width: 358px;
  .tag-list {
    margin: 20px 0;
  }
}
.info-wrapper {
  display: flex;
  .avatar-wrapper {
    cursor: pointer;
    flex: 0 0 80px;
    .img {
      min-width: 80px;
      width: 80px;
      height: 80px;
      border: 1px solid $--border-color;
    }
  }
  .text-wrapper {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow-x: hidden;
    max-width: 300px;
    & > div {
      margin-bottom: 5px;
    }
    .position-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: $--color-text-secondary;
      i {
        margin: 0 5px;
        font-style: normal;
        color: $--border-color;
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      // margin-right: 5px;
      font-size: 16px;
      &::v-deep span {
        display: flex;
        align-items: center;
        text-align: left;
      }
      span {
        display: inline-block;
        &:nth-child(1) {
          max-width: 90px;
        }
      }
      .icon {
        margin-left: 3px;
        font-size: 16px;
      }
    }
    .company {
      color: $--color-text-secondary;
    }
  }
}
.data-wrapper {
  margin-top: 15px;
  border: 1px solid $--border-color;
  padding: 15px 5px;
  display: flex;
  justify-content: space-evenly;
  .data-item {
    width: 100%;
    text-align: center;
    .value {
      font-size: 18px;
    }
    .label {
      margin-top: 5px;
      color: $--color-text-secondary;
    }
  }
}

.contact-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 20px 0;
  padding: 20px 20px 0 20px;
  background-color: $--background-color;
  .con {
    display: inline-block;
    vertical-align: middle;
    width: 70%;
  }
  & > span {
    display: inline-block;
    margin-bottom: 20px;
    padding-right: 10px;
    width: 50%;
    box-sizing: border-box;
    i {
      display: inline-block;
      margin-right: 10px;
      text-align: center;
      font-size: 20px;
      vertical-align: middle;
      color: $--color-input-regular;
    }
  }
}
.opt-box {
  margin: 25px 10px 10px;
  display: flex;
  justify-content: center;
}
.opt-box ::v-deep button {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
