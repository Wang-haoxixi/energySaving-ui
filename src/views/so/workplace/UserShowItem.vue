<template>
  <div class="user-show-wrapper">
    <iep-popover-user-card :user-id="user.id">
      <iep-img class="avatar" :resizeOpt="{l:40}" :src="user.avatar"></iep-img>
    </iep-popover-user-card>
    <div class="name">
      <span class="iep-ellipsis-flex" :title="user.name">{{user.name}}</span>
      <div class="close">
        <i v-if="needDel" class="el-icon-close" @click="handleDel()"></i>
        <i v-else class="el-icon-user"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    needDel: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleDel() {
      this.$emit("on-del", this.user.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-show-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 20px;
  padding-right: 0;
  width: 33.333333%;
  font-size: 14px;
  box-sizing: border-box;
  .avatar {
    width: 40px;
    height: 40px;
  }
  > span {
    height: 40px;
  }
  .avatar {
    margin-right: 10px;
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid $--border-color;
  }
  .name {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 10px;
  }
  .close {
    margin-left: 8px;
  }
  .el-icon-close {
    cursor: pointer;
  }
}
</style>
