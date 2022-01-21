<template>
  <div class="page-account">
    <div class="page-account-container">
      <el-card class="pages-card">
        <div class="page-account-bg">
          <div class="page-account-top">
            <div class="page-account-top-logo">
              <iep-img class="logo-img" src="/img/icons/logo-h180.png" alt="logo"></iep-img>
              <div class="logo-name">节能保</div>
              <div class="logo-desc">全域节能，科技臻善！</div>
            </div>
          </div>
          <div class="center-img"></div>
        </div>
        <div class="page-account-con">
          <div class="page-account-box">
            <slot></slot>
          </div>
        </div>
      </el-card>
      <footer class="global-footer i-copyright">
        <div class="global-footer-copyright">
          <div>
            {{website.copyright}} {{website.companyName}}
            <a
              href="javascript:void(0);"
              @click.prevent="$openPage('https://beian.miit.gov.cn/',2)"
            >{{website.bah}}</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import website from "@/const/website";
export default {
  data() {
    return {
      website,
    };
  },
};
</script>
<style lang="scss" scoped>
.page-account {
  // height: 100vh;
  // background-image: url("https://file.iviewui.com/admin-pro-dist/img/body.8aa7c4a6.svg");
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 100%;
}
.page-account-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 32px 0;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-image: url("/img/login/loginbg.jpg");
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  @media (min-width: 768px) {
    // padding: 32px 0 24px 0;
  }
  .pages-card {
    position: relative;
    width: 1100px;
    height: 546px;
  }
  .page-account-con {
    display: flex;
    align-items: center;
    overflow: hidden;
    min-width: 502px;
    .page-account-box {
      margin: 0 auto;
      min-width: 420px;
    }
  }
  .page-account-bg {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    background-size: cover;
    background-repeat: no-repeat;
    .center-img {
      width: 400px;
      height: 300px;
      background: url("/img/login/login-left.svg") no-repeat center;
      background-size: 100%;
    }
    .img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .page-account-txt {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10;
      color: #fff;

      span {
        font-size: 22px;
        opacity: 0.5;
        &:nth-child(1) {
          margin-bottom: 5px;
          font-size: 28px;
          opacity: 1;
        }
      }
      .page-account-txt-img {
        margin-top: 35px;
        width: 90%;
      }
    }
  }
}
.page-account-top {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.page-account-top-logo {
  display: flex;
  align-items: center;
  .logo-img {
    height: 28px;
    width: 42px;
  }
  .logo-name {
    font-size: 24px;
    margin-left: 5px;
    position: relative;
    top: 1px;
  }
  .logo-desc {
    color: $--color-text-regular;
    margin-left: 10px;
    position: relative;
    top: 4px;
    font-size: 18px;
  }
}
.page-account-top-desc {
  font-size: 19px;
  color: $--color-text-secondary;
}
.global-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  // margin: 48px 0 24px 0;
  // padding: 0 16px;
  text-align: center;
  .global-footer-copyright {
    font-size: 14px;
    color: #808695;
  }
  .global-footer-copyright ::v-deep a {
    text-decoration: none;
    color: #808695;
    &:hover {
      color: $--color-primary;
    }
  }
}
.i-copyright {
  flex: 0 0 auto;
}
.page-account-bg ::v-deep .el-image__inner {
  width: 100%;
  height: 100%;
}
.jump {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .txt {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      padding: 0 15px;
      cursor: pointer;
      b {
        margin-right: 5px;
        font-weight: 400;
      }
      &:hover {
        opacity: 0.7;
      }
    }
    > span {
      padding-right: 15px;
      border-right: 1px solid $--border-color;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    .i-can {
      width: 30px;
    }
  }
  .into-index {
    width: 82px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.page-account-top-logo ::v-deep .el-image__inner {
  width: 90%;
}
.pages-card ::v-deep .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 30px 25px 28px;
}
.pages-card ::v-deep .v-code-wrapper .sms-btn {
  height: 54px;
}
</style>
