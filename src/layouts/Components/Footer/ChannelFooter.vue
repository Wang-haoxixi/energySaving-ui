<template>
  <div class="footer-box">
    <div class="context">
      <div class="text">
        <a href="javascript:void(0);" @click.prevent="$openPage('/channel/about')">关于节能宝</a>
        <a href="javascript:void(0);" @click.prevent="$openPage('/protocol/privacy_policy')">隐私政策和条款</a>
        <a href="javascript:void(0);" @click.prevent="$openPage('/channel/nengbar')">宝贝激励</a>
        <span>
          {{website.copyright}}
          <a
            class="position"
            href="javascript:void(0);"
          >{{website.companyName}}</a>
        </span>
        <a
          href="javascript:void(0);"
          @click.prevent="$openPage('https://beian.miit.gov.cn/',2)"
        >{{website.bah}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import website from "@/const/website";
export default {
  name: "centerFooter",
  data() {
    return {
      website,
    };
  },
};
</script>
<style lang="scss" scoped>
.footer-box {
  width: 100%;
  height: 60px;
  border-top: 1px solid $--border-color;
  background-color: #535353;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
  .context {
    width: 1200px;
    margin: 0 auto;
    color: #c1c1c1;
    a {
      padding: 0 13px;
      color: #c1c1c1;
      text-decoration: none;
      &:hover {
        color: $--color-primary;
      }
    }
    .position {
      padding-left: 0;
    }
    span {
      padding-left: 13px;
    }
    .number {
      color: #c1c1c1;
    }
  }
}
</style>
