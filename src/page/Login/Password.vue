<template>
  <div>
    <template v-if="form.type==='0'">
      <el-form-item prop="password">
        <iep-ant-input
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          placeholder="请输入密码"
          iconfont="el-icon-woneng-suoding"
        ></iep-ant-input>
      </el-form-item>
      <el-form-item prop="code">
        <iep-ant-input
          input-type="right-code"
          v-model="form.code"
          placeholder="请输入验证码"
          iconfont="el-icon-key"
          :refreshCode="refreshCode"
          :codeSrc="code.src"
          @keyup.enter.native="submitForm()"
        ></iep-ant-input>
      </el-form-item>
    </template>
    <div v-else>
      <el-form-item prop="vCode">
        <div class="v-code-wrapper">
          <iep-ant-input
            class="v-code-input"
            :maxlength="VCODEMAXLENGTH"
            v-model="form.vCode"
            placeholder="请输入验证码"
            iconfont="el-icon-key"
          ></iep-ant-input>
          <el-button class="sms-btn" :disabled="msgKey" @click="handleSend()">{{msgText}}</el-button>
        </div>
      </el-form-item>
    </div>
    <!-- <div class="login-it">
      <div class="login-type-select">
        <el-button v-if="form.type==='1'" type="text" @click="handleVCode()">密码登录</el-button>
        <el-button v-if="form.type==='0'" type="text" @click="handlePassword()">免密码登录</el-button>
      </div>
      <other-select link="/register" text="立即注册"></other-select>
    </div>-->
  </div>
</template>
<script>
// import OtherSelect from "@/page/Components/OtherSelect";
import { getMobileCode } from "@/api/login";
import { CODEURL, MSGINIT, MSGSCUCCESS, MSGTIME } from "@/const/env";
import { randomLenNum } from "@/util/util";
import { isvalidatemobile } from "@/util/validate";
import { VCODEMAXLENGTH } from "@/const/env";
export default {
  components: {
    // OtherSelect,
  },
  props: ["value"],
  data() {
    return {
      VCODEMAXLENGTH,
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      code: {
        src: "/code",
        value: "",
        type: "image",
      },
    };
  },
  computed: {
    form: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit");
    },
    handlePassword() {
      this.form.type = "1";
      this.refreshCode();
    },
    handleVCode() {
      this.form.type = "0";
    },
    refreshCode() {
      this.form.code = "";
      this.form.randomStr = randomLenNum(this.code.len, true);
      this.code.type === "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${CODEURL}?randomStr=${this.form.randomStr}`);
    },
    handleSend() {
      if (isvalidatemobile(this.form.username)[0]) {
        this.$message("请输入正确的手机号");
        return;
      }
      if (this.msgKey) return;
      getMobileCode(this.form.username).then(data => {
        if (data.data) {
          this.$message.success("验证码发送成功");
        } else {
          this.$message.error(data.msg);
        }
      });
      this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
      this.msgKey = true;
      let timer = null;
      timer = setInterval(() => {
        this.msgTime--;
        this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
        if (this.msgTime == 0) {
          this.msgTime = MSGTIME;
          this.msgText = MSGINIT;
          this.msgKey = false;
          clearInterval(timer);
        }
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .login-type-select {
//   display: flex;
//   justify-content: flex-start;
// }
.v-code-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .v-code-input {
    width: 100%;
    border-radius: 10px;
  }
  .sms-btn {
    position: absolute;
    top: 1px;
    right: 1px;
    padding: 0 15px;
    height: 54px;
    border: 0;
  }
}
.v-code-input ::v-deep .el-input__inner {
  border-radius: 10px;
}
.sms-btn {
  border-radius: 0 10px 10px 0;
  color: $--color-primary;
  height: 48px !important;
}
.login-it {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 0;
}
</style>
