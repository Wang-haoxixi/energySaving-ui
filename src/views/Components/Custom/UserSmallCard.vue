<template>
  <iep-popover-user-card :user-id="user.id" class="person-img">
    <iep-img class="admins-imgs" :src="user.avatar" :title="user.name" :resizeOpt="{l:28}"></iep-img>
  </iep-popover-user-card>
</template>
<script>
export default {
  name: "IepUserSmallCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.admins-imgs {
  vertical-align: middle;
  display: inline-flex;
  width: 28px;
  height: 28px;
  background-color: #fff;
  border: 1px solid $--border-color;
}
</style>
