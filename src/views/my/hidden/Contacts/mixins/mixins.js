export default {
  methods: {
    /**
     * 全局弹框操作 注意 需要 loadPage 全局方法去刷新组件
     * import operationMixins from "@/mixins/operationMixins";
     * mixins: [operationMixins],
     * @param {any} id 单个参数,不一定就一个ID
     * @param {Function} optFunction 执行函数
     * @param {string} msg 提示信息
     * @param {string} detailMsg 第一次提示信息
     * @param {string} feelbackMsg 回馈信息
     * @param {Function} cb 回调函数
     */
    _handleComfirmCallBack(id, optFunction, msg, detailMsg, feelbackMsg, cb) {
      this.$confirm(detailMsg || `是否${msg}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const {
          data,
        } = await optFunction(id);
        if (data) {
          this.$message({
            type: "success",
            message: feelbackMsg || `${msg}成功!`,
          });
          cb && cb();
        }
        // Like this
        this.loadPage();
      }).catch(() => { });
    },
  },
};
