<template>
  <iep-dialog
    :dialog-show="dialogShow"
    title="个人信息"
    width="460px"
    @close="_close()"
    @mounted="load()"
  >
    <el-card style="box-shadow: 0 2px 4px 0 $--background-color">
      <iep-user-card ref="IepUserCard"></iep-user-card>
    </el-card>
    <div class="content-wrapper">
      <div class="reason">申请理由:</div>
      <div class="content">{{message||"工作需要, 请尽快通过审核。"}}</div>
    </div>
    <template slot="footer">
      <el-button icon="el-icon-check" :loading="submitFormLoading" @click="handlePass()">通过</el-button>
      <el-button icon="el-icon-close" :loading="submitFormLoading" @click="handleReject()">拒绝</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { orgPassUserJoins } from "@/api/admin/org";
function initForm(userId = 0, isPass = true) {
  return {
    ids: [userId],
    status: isPass ? 1 : 2,
  };
}
export default {
  data() {
    return {
      dialogShow: false,
      submitFormLoading: false,
      userId: 0,
      message: "",
    };
  },
  methods: {
    _close() {
      this.dialogShow = false;
    },
    close() {
      this._close();
      this.$emit("load-page");
    },
    load() {
      this.$nextTick(() => {
        this.$refs["IepUserCard"].loadUser(this.userId);
      });
    },
    async handlePass() {
      const data = await orgPassUserJoins(initForm(this.userId));
      if (data.data) {
        this.$message.success("操作成功");
        this.close();
      } else {
        this.$message(data.msg);
      }
    },
    async handleReject() {
      const data = await orgPassUserJoins(initForm(this.userId, false));
      if (data.data) {
        this.$message.success("操作成功");
        this.close();
      } else {
        this.$message(data.msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content-wrapper {
  background: #f8f8f8;
  padding: 15px 20px;
  border-radius: 4px;
  margin: 20px 0;
  .reason {
    margin-bottom: 10px;
    color: $--color-text-secondary;
  }
  .content {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
