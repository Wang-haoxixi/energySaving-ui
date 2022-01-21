<template>
  <div>
    <div class="title">组织信息</div>
    <div class="info-con">
      <div class="p-line iep-ellipsis p-flex">
        负责人：{{form.creator}}
        <iep-popover-user-card :user-id="form.createBy">
          <IepCardBtn></IepCardBtn>
        </iep-popover-user-card>
      </div>
      <div class="p-line">
        <span>知事：</span>
        <IepMagistratesBox :magistrates="form.magistrates" />
      </div>
      <div
        class="p-line iep-ellipsis-flex"
        :title="form.establishmentTime | parseToDay"
      >成立时间：{{form.establishmentTime | parseToDay}}</div>
      <div
        class="p-line iep-ellipsis-flex"
        :title="form.industry | showText"
      >行业：{{form.industry | showText}}</div>
      <div
        class="p-line iep-ellipsis-flex"
        :title="form.contactInformation | showText"
      >联系电话：{{form.contactInformation | showText}}</div>
      <div
        class="p-line iep-ellipsis-flex"
        :title="form.region | showText"
      >所在地：{{form.region | showText}}</div>
      <div
        class="p-line iep-ellipsis-2-flex"
        :title="form.introduction | showText"
      >介绍：{{form.introduction | showText}}</div>
    </div>
  </div>
</template>
<script>
class SoInfoDTO {
  createBy = 0;
  creator = "";
  magistrates = [];
  establishmentTime = "";
  industry = "";
  contactInformation = "";
  region = "";
  introduction = "";
}
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    form() {
      return this.$mergeByFirst(new SoInfoDTO(), this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
}
.info-con {
  margin-top: -15px;
  .p-flex {
    display: flex;
    align-items: center;
  }
  .p-line {
    margin: 0;
    font-size: 14px;
    line-height: 36px;
    color: #666769;
  }
}
</style>
