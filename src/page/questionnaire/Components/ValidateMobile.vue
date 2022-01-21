<template>
  <div class="page-account">
    <div class="page-account-container">
      <el-card class="pages-card">
        <div class="page-account-bg" v-if="isPc">
          <div class="center-img"></div>
        </div>
        <div class="page-account-con" v-loading="loading" :class="{isPc}">
          <div class="page-account-box">
            <p class="page-account-title">验证手机号</p>
            <el-form ref="form" :model="form" :rules="rules" :style="[isPc&&'width:80%;'||'']">
              <el-form-item prop="phone">
                <el-input
                  v-model="form.phone"
                  prefix-icon="el-icon-woneng-shouji"
                  placeholder="请输入手机号码"
                  maxlength="11"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="smsCode">
                <el-input
                  class="append-input"
                  v-model="form.smsCode"
                  prefix-icon=" el-icon-key"
                  placeholder="请输入验证码"
                  maxlength="4"
                  clearable
                >
                  <div
                    :class="[time?'append-disabled':'append']"
                    slot="append"
                    @click="handleSendCode"
                  >{{CODEMSG}}</div>
                </el-input>
              </el-form-item>
              <el-button class="btn" type="primary" @click="handleValidCode">确定</el-button>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { FormDTO } from "./option";
import { isMobile } from "@/util/validate";
import { mobileSendMessage, mobileValidCode } from "@/api/qms/ques_mobile";
import { browserRedirect } from "@/util/util";

const OPERATEMSG = "获取验证码";
const TIME = 60;
const TIMEMSG = "秒";
export default {
  data() {
    return {
      form: new FormDTO(),
      rules: {
        phone: {
          validator: this.validPhone,
          trigger: "blur",
        },
        smsCode: {
          validator: this.validCode,
          trigger: "blur",
        },
      },
      CODEMSG: OPERATEMSG,
      time: 0,
      loading: false,
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    isPc() {
      return !browserRedirect();
    },
  },
  methods: {
    handleSendCode() {
      if (this.time) return;
      this.$refs.form.validateField("phone", async (v) => {
        if (!v) {
          this.time = 1;
          const params = {
            phone: this.form.phone,
            questionnaireId: this.id,
          };
          const { data, code } = await mobileSendMessage(params);
          if (!code) {
            if (data) {
              this.smsCodeAntiShake();
              this.$message.success("验证码已发送");
              return;
            } else {
              this.$notify({
                title: "提示",
                type: "warning",
                message: "抱歉，您的手机号无权限填写该问卷",
              });
            }
          }
          this.time = 0;
        }
      });
    },
    smsCodeAntiShake() {
      this.time = TIME;
      this.CODEMSG = this.time + TIMEMSG;
      const timer = setInterval(() => {
        this.CODEMSG = --this.time + TIMEMSG;
        if (this.time === 0) {
          this.CODEMSG = OPERATEMSG;
          clearInterval(timer);
        }
      }, 1000);
    },
    validPhone(rule, value, callback) {
      if (!value) return callback(new Error("手机号码不能为空"));
      if (!isMobile(value)) return callback(new Error("手机号码格式不正确"));
      callback();
    },
    validCode(rule, value, callback) {
      if (!value) return callback(new Error("验证码不能为空"));
      if (!/^\d{4}$/.test(value))
        return callback(new Error("请输入四位数字验证码"));
      callback();
    },
    handleValidCode() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const { data } = await mobileValidCode(this.form);
          if (data) {
            this.$message.success("验证成功");
            this.$emit("update:canAnswer", this.form.phone);
          }
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-account {
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
  // @media (min-width: 768px) {
  // padding: 32px 0 24px 0;
  // }
  .pages-card {
    position: relative;
    width: 1100px;
    height: 546px;
  }
  .page-account-con {
    display: flex;
    align-items: center;
    overflow: hidden;
    &.isPc {
      min-width: 502px;
      .page-account-box {
        min-width: 420px;
      }
    }
    .page-account-box {
      margin: 0 auto;
      .page-account-title {
        font-size: 16px;
        font-weight: 900;
        text-align: left;
        text-indent: 2em;
      }
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
.page-account-bg ::v-deep .el-image__inner {
  width: 100%;
  height: 100%;
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
.append-input {
  user-select: none;
  &::v-deep .el-input-group__append {
    color: $--color-primary;
    border: 1px $--border-color solid;
    border-left: 0;
    padding: 0;
    overflow: hidden;
  }
  .append {
    padding: 0 20px;
    line-height: 40px;
    background: #ffffff;
    cursor: pointer;
    &:hover {
      background: $--custom-menu-background-color;
    }
    &:active {
      background: rgba($color: $--color-primary, $alpha: 0.2);
    }
  }
  .append-disabled {
    padding: 0 20px;
    line-height: 40px;
    background: #ffffff;
    color: $--color-text-secondary;
  }
}
.btn {
  width: 100%;
  line-height: 22px;
}
.el-input {
  overflow: hidden;
  border-radius: $--border-radius-base;
}
</style>
