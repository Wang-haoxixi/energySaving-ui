import { encryption } from "@/util/util";
export default {
  data() {
    return {};
  },
  methods: {
    _handleComfirmBySafePassword(
      params,
      optFunction,
      cb,
      msg,
      placeholder,
      detailMsg,
      feelbackMsg
    ) {
      this.$prompt(detailMsg || `是否${msg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputType: "password",
        inputPlaceholder: placeholder || `请输入支付密码`,
        inputValidator: val => {
          return val ? true : placeholder || `请输入支付密码`;
        },
        closeOnClickModal: false
      })
        .then(async ({ value }) => {
          // 宝贝支付加密
          const res = encryption({ data: { value }, param: ["value"] });
          const { data } = await optFunction({
            ...params,
            safePassWord: res.value
          });
          if (data) {
            this.$message({
              type: "success",
              message: feelbackMsg || `${msg}成功!`
            });
            cb && cb(data);
          }
        })
        .catch(() => {});
    },
    _handleComfirmById(id, optFunction, cb, msg, detailMsg, feelbackMsg) {
      this.$confirm(detailMsg || `是否${msg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data } = await optFunction(id);
          if (data) {
            this.$message({
              type: "success",
              message: feelbackMsg || `${msg}成功!`
            });
            cb && cb(data);
          }
        })
        .catch(() => {});
    }
  }
};
