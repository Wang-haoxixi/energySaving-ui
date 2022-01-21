<template>
  <div class="header-box box">
    <div class="avatar">
      <iep-img :src="form.avatar"></iep-img>
    </div>
    <div class="info-box">
      <div class="name-box">
        <div class="title">
          <h2>{{form.name}}</h2>
        </div>
      </div>
      <div class="desc-box">
        成立时间：{{form.establishmentTime}} 行业：{{form.industry}}
        <br />
        {{form.slogan}}
      </div>
      <div class="person-box">
        <span>负责人：</span>
        <IepUserSmallCard :user="form.owner"></IepUserSmallCard>
        <template v-if="form.magistrates.length">
          <span class="post">知事：</span>
          <IepMagistratesBox :magistrates="form.magistrates" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
// import { getOrgById } from "@/api/admin/org";
export default {
  props: {
    data: {
      default: () => {},
    },
  },
  computed: {
    form() {
      const data = { ...this.data };
      return data;
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "./common.scss";
.header-box {
  display: flex;
  .avatar {
    flex: 0 0 140px;
    width: 140px;
    height: 140px;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    margin-left: 20px;
    .name-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: flex;
        align-items: center;
        h2 {
          margin: 0;
          margin-right: 10px;
          font-size: 20px;
          font-weight: 400;
          font-family: "微软雅黑";
          color: $--color-text-primary;
          cursor: pointer;
          &:hover {
            color: $--color-text-secondary;
          }
        }
      }
    }
    .desc-box {
      font-size: 14px;
      color: $--color-text-regular;
    }
    .person-box {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $--color-text-regular;
      .post {
        margin-left: 20px;
      }
    }
  }
}
</style>
