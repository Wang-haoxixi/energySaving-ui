<template>
  <div class="menu-wrapper-con">
    <div v-if="isUserInfo" class="user-wrapper">
      <iep-img
        class="avatar"
        :src="userInfo.avatar"
        :resizeOpt="{l:80}"
        @click.native="$openPage(`${$pathPrefix_UserStyle}${userInfo.userId}`)"
      ></iep-img>
      <div class="name-box">
        <div class="name">{{"Hi，" + userInfo.realName}}</div>
        <div class="icon-box">
          <IepCardBtn
            v-show="isShow"
            @click="$openPage('/my/account/base')"
            icon="el-icon-woneng-bianji2"
            title="账户设置"
          ></IepCardBtn>
        </div>
      </div>
    </div>
    <template v-for="(item,index) in routerList">
      <span
        class="menu-list"
        v-if="!item.hidden"
        :key="index"
        :class="$route.path===urlGen(item.path)?'active':''"
        @click="$openPage(urlGen(item.path))"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </template>
    <LogoScanCode></LogoScanCode>
  </div>
</template>
<script>
import LogoScanCode from "./Components/LogoScanCode";
import website from "@/const/website";
import { mapGetters } from "vuex";
export default {
  components: {
    LogoScanCode,
  },
  props: {
    routerList: {
      type: Array,
      default: () => [],
    },
    prefixUrl: {
      type: String,
      required: true,
    },
    isUserInfo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      website,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isShow() {
      return this.$route.path !== "/my/account/base";
    },
  },
  methods: {
    urlGen(itemPath) {
      return `${this.prefixUrl}${itemPath}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper-con {
  padding: 20px;
  .menu-list {
    display: flex;
    align-items: center;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    text-align: left;
    border-radius: 4px;
    margin: 5px 0 0;
    padding-left: 34px;
    color: $--color-text-regular;
    cursor: pointer;
    transition: 0.5s all;
    &:nth-of-type(1) {
      margin-top: 20px;
    }
    &:hover {
      background-color: $--custom-menu-background-color;
      color: $--color-primary;
      border-radius: $--large-border-radius;
      i {
        color: $--color-primary;
      }
    }
    > i {
      display: inline-block;
      font-size: 20px;
      margin-right: 8px;
      width: 20px;
      text-align: center;
      vertical-align: middle;
      color: $--color-text-regular;
      &:last-child {
        font-size: 18px;
      }
    }
  }
  .user-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
    .icons {
      margin: 10px 0;
      text-align: center;
      box-sizing: border-box;
      i {
        margin: 0 2px;
        font-size: 22px;
      }
    }
  }
  .active {
    color: $--color-primary;
    background-color: $--custom-menu-background-color;
    border-radius: $--large-border-radius;
    i {
      color: $--color-primary;
    }
  }
}
.name-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.name-box .name {
  font-size: 14px;
}
.name-box .icon-box {
  position: relative;
  top: -1px;
}
</style>
