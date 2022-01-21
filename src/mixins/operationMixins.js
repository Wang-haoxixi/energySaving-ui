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
     */
    _handleComfirm(id, optFunction, msg, detailMsg, feelbackMsg) {
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
        }
        // Like this
        this.loadPage();
      }).catch(() => { });
    },
    /**
     * 全局弹框操作 注意 不需要 loadPage 全局方法
     * import operationMixins from "@/mixins/operationMixins";
     * mixins: [operationMixins],
     * @param {*} optFunction 执行函数
     * @param {*} msg 提示信息
     * @param {*} title 弹框title
     * @param {*} detailMsg 第一次提示信息
     * @param {*} feelbackMsg 回馈信息
     */
    async _handleComfirmNOID(id, optFunction, msg, detailMsg, feelbackMsg) {
      try {
        await this.$confirm(detailMsg || `是否${msg}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const {
          data,
        } = await optFunction(id);
        if (data) {
          this.$message({
            type: "success",
            message: feelbackMsg || `${msg}成功!`,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
