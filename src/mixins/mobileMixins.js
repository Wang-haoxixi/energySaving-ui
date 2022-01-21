/**
 * 全局短信验证码
 */
import { VCODEMAXLENGTH } from "@/const/env";
import { MSGINIT, MSGSCUCCESS, MSGTIME } from "@/const/env";
import { isvalidatemobile } from "@/util/validate";
import { getMobileCode } from "@/api/admin/mobile";
export default {
  data() {
    return {
      VCODEMAXLENGTH,
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
    };
  },
  methods: {
    async handleSMSSend(mobile) {
      if (isvalidatemobile(mobile)[0]) {
        this.$message("手机号错误");
        return;
      }
      if (this.msgKey) return;
      const { data } = await getMobileCode(mobile);
      if (data) {
        this.$message.success("验证码发送成功");
      }
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
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
  },
};
