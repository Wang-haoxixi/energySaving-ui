<template>
  <div class="user-card">
    <div class="avatar">
      <iep-popover-user-card :user-id="user.userId">
        <iep-img :src="user.avatar"></iep-img>
      </iep-popover-user-card>
    </div>
    <div class="info">
      <div class="name iep-ellipsis-flex">{{user.realName}}</div>
      <div class="desc iep-ellipsis-2-flex">{{user.sign}}</div>
    </div>
    <div class="opt">
      <el-button
        @click="handleFollow(user)"
        v-hoverSpan="{isFlag:user.isFollowed,default:'+关注',active:'已关注',cancel:'取消关注'}"
      ></el-button>
    </div>
  </div>
</template>
<script>
import followMixins from "@/mixins/followMixins";
export default {
  mixins: [followMixins],
  name: "IepUserSimpleCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>
<style lang="scss" scoped>
.user-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .avatar {
    width: 80px;
    height: 80px;
    flex: 0 0 80px;
  }
  .info {
    flex: 1;
    height: 75px;
    padding: 0 10px;
    .name {
      max-width: 200px;
      font-size: 16px;
      height: 38%;
    }
    .desc {
      font-size: 14px;
      color: $--color-text-secondary;
      height: 50%;
    }
  }
  .opt {
    flex: 0 0 70px;
  }
}
</style>
