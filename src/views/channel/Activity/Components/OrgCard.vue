<template>
  <el-card
    :body-style="{ padding: '20px',height:'200px',boxSizing:'border-box' }"
    shadow="hover"
    @click.native="$openPage(`${$pathPrefix_SoStyle}${org.orgId}`)"
  >
    <div class="org-card">
      <iep-img :resizeOpt="{l:80}" :src="org.avatar" class="image" />
      <div class="content-box">
        <div class="org-name iep-ellipsis" :title="org.name">{{org.name}}</div>
        <div class="creater">负责人：{{org.creator}}</div>
        <IepTagRead :value="org.abilityTag"></IepTagRead>
      </div>
    </div>
  </el-card>
</template>
<script>
// 组织卡片-用于活动大厅中的深度合作
export default {
  name: "OrgCard",
  props: ["org"],
};
</script>
<style lang="scss" scoped>
.org-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  .image {
    width: 80px;
    height: 80px;
    border-radius: $--border-radius-base;
    overflow: hidden;
    border: 1px solid $--border-color;
    box-sizing: border-box;
  }
  .content-box {
    text-align: center;
    font-size: 14px;
    .org-name {
      margin: 10px 0;
      line-height: 14px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .creater {
      margin-bottom: 8px;
      line-height: 14px;
      color: $--color-text-secondary;
    }
    .iep-ellipsis {
      width: 240px;
      color: $--color-text-regular;
    }
  }
}
</style>
