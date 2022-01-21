<template>
  <div class="header-box box">
    <div class="avatar">
      <iep-img :src="form.avatar"></iep-img>
    </div>
    <div class="info-box">
      <div class="name-box">
        <div class="title">
          <h2>{{form.realName}}</h2>
        </div>
      </div>
      <div class="desc-box">
        <span>{{form.company}} 行业：{{form.industry | showText}}</span>
        <span>{{form.sign | showText}}</span>
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
    justify-content: flex-start;
    flex: 1;
    margin-left: 20px;
    .name-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
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
        }
      }
    }
    .desc-box {
      margin-top: 10px;
      font-size: 14px;
      color: $--color-text-regular;
      span {
        display: block;
      }
    }
  }
}
</style>
