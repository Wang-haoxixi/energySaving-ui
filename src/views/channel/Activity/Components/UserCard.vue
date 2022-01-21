<template>
  <el-card shadow="hover" @click.native="$openPage(`${$pathPrefix_UserStyle}${user.userId}`);">
    <iep-img :resizeOpt="{l:70}" :src="user.avatar" class="image" />
    <div class="content-box">
      <div class="user-name">
        {{user.realName}}
        <span>{{user.company}}</span>
      </div>
      <IepTagRead :value="user.abilityTag"></IepTagRead>
      <div class="slogan iep-ellipsis" :title="user.sign">{{user.sign}}</div>
    </div>
  </el-card>
</template>
<script>
// 用户卡片-用于活动大厅中的与会大咖
export default {
  name: "UserCard",
  props: ["user"],
};
</script>
<style lang="scss" scoped>
.image {
  flex: 0 0 70px;
  margin-right: 10px;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid $--border-color;
  box-sizing: border-box;
}
.iep-ellipsis {
  width: 270px;
  font-size: 14px;
  line-height: 14px;
  color: #666769;
}
.user-name {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  line-height: 16px;
  .iep-ellipsis {
    margin-left: 10px;
    width: 180px;
  }
  span {
    margin-left: 10px;
    font-size: 14px;
    color: $--color-text-regular;
  }
}
.slogan {
  margin-top: 10px;
  font-size: 14px;
  color: #909397;
}
</style>
