<template>
  <div class="member-box box">
    <div class="sub-title">活跃用户</div>
    <div class="active-main" v-loading="loading">
      <iep-no-data v-if="!guessList.length"></iep-no-data>
      <div class="active-person" v-for="(item) in guessList" :key="item.thoughtsId">
        <iep-popover-user-card :user-id="item.userId">
          <iep-img class="img" :src="item.avatar"></iep-img>
        </iep-popover-user-card>
        <div class="txt">
          <div class="name">{{item.userName}}</div>
          <div class="post" :title="item.position">{{item.position}}</div>
        </div>
        <IepFollowBtn :item="item" :loading="loadingFollow" @click="handleFollow(item)"></IepFollowBtn>
        <!-- <IepHoverBtn
          btnText="关注"
          :isFlag="item.isFollowed"
          :loading="loadingFollow"
          @click="handleFollow(item)"
        ></IepHoverBtn>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { orgActiveDynamic } from "@/api/dms/thoughts";
import { follow } from "@/api/admin/follow";
export default {
  data() {
    return {
      loading: false,
      loadingFollow: false,
      guessList: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.load();
  },
  methods: {
    async handleFollow(item) {
      this.loadingFollow = true;
      const { data } = await follow({
        userId: this.userInfo.userId,
        followId: item.userId,
        sign: item.isFollowed, // 0-关注 1-不关注
        type: 1, // 1-用户 2-组织 3-话题
      });
      if (data) {
        item.isFollowed = item.isFollowed ? 0 : 1;
      } else {
        this.$message.warning("关注失败");
      }
      this.loadingFollow = false;
    },
    async load() {
      this.loading = true;
      const { data } = await orgActiveDynamic(this.userInfo.orgId);
      this.guessList = data.slice(0, 4);
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.member-box {
  display: flex;
  flex-direction: column;
  .sub-title {
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
}
.active-main {
  flex: 1;
  margin-top: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.active-person {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
  .name {
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .post {
    margin-top: 6px;
    font-size: 14px;
    color: $--color-text-secondary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .img {
    width: 50px;
    height: 50px;
    border-radius: $--border-radius-base;
    overflow: hidden;
  }
  .txt {
    flex: 1;
    width: 120px;
    max-width: 110px;
    .con {
      width: 120px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.active-person:nth-of-type(n + 2) {
  margin-top: 15px;
}
</style>
