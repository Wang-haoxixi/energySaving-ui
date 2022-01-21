<template>
  <div class="menu-wrapper">
    <iep-img
      class="avatar"
      :resizeOpt="{l:80}"
      :src="userInfo.avatar"
      @click.native="$openPage(`${$pathPrefix_UserStyle}${userInfo.userId}`)"
    ></iep-img>
    <div class="user-info">
      Hi, {{userInfo.realName}}
      <i
        class="el-icon-woneng-bianji2"
        @click="$openPage('/my/account/base')"
      ></i>
    </div>
    <div class="rank-wrap">
      <div
        v-if="userInfo.redness"
        :class="`hongdu iep-hongdu-v${userInfo.redness} iep-hongdu-v${userInfo.redness}-bg`"
        @click="$openPage(`${urlGen('hongdu')}`)"
      >
        <span>红度</span>
        <i :class="`el-icon-woneng-hongdu${userInfo.redness}`"></i>
      </div>
      <div
        v-if="userInfo.rank"
        :class="`vip iep-vip-v${userInfo.rank}-bg iep-vip-v${userInfo.rank}`"
        @click="$openPage(`${urlGen('proxy')}`)"
      >
        <span>合伙人</span>
        <i :class="`el-icon-woneng-dengji${userInfo.rank}`"></i>
      </div>
    </div>
    <div class="menu-box">
      <template v-for="(item,index) in routerList">
        <div
          class="menu-list"
          v-if="!item.hidden"
          :key="index"
          :class="$route.path.indexOf(urlGen(item.path))!==-1?'active':''"
          @click="$openPage(urlGen(item.path))"
        >
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </template>
    </div>
    <LogoScanCode></LogoScanCode>
  </div>
</template>
<script>
import LogoScanCode from "../Components/LogoScanCode";
import { mapGetters } from "vuex";
import { getPersonAgentCensus } from "@/api/dms/comprehensive";
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
  },
  data() {
    return {
      rank: "1",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.load();
  },
  methods: {
    urlGen(itemPath) {
      return `${this.prefixUrl}${itemPath}`;
    },
    async load() {
      const { data } = await getPersonAgentCensus();
      this.rank = data.agentRank;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: -200px;
  padding: 20px;
  width: 200px;
  border: 1px solid $--border-color;
  background-color: #fff;
  border-radius: $--border-radius-base;
  box-sizing: border-box;
  .avatar {
    width: 80px;
    height: 80px;
    border: 1px solid $--border-color;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    align-items: center;
    margin: 15px 0 10px;
    font-size: 16px;
    text-align: center;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    i {
      margin-left: 10px;
      font-size: 16px;
      color: $--color-text-secondary;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .rank-wrap {
    display: flex;
    margin-bottom: 10px;
    font-size: 12px;
    .hongdu,
    .vip {
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      span {
        margin-right: 5px;
      }
    }
    .hongdu + .vip {
      margin-left: 5px;
    }
  }
  .menu-box {
    margin-left: 40px;
  }
  .menu-list {
    display: flex;
    align-items: center;
    padding: 15px 20px 15px 0;
    width: 120px;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    text-align: left;
    border-radius: 4px;
    color: $--color-text-regular;
    cursor: pointer;
    transition: 0.5s all;
    > span {
      display: inline-block;
      width: 56px;
      height: 20px;
      line-height: 20px;
    }
    &:hover,
    &.active {
      color: $--color-primary;
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
}
</style>
