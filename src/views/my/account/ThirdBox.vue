<template>
  <div class="change-form">
    <h2>第三方绑定</h2>
    <div class="list-wrapper">
      <div class="item">
        <div>
          <div class="weChat">
            <i class="el-icon-woneng-weixin1"></i>微信
          </div>
          <div class="value">当前绑定：{{userInfo.wxUnionid || '无'}}</div>
        </div>
        <el-button v-if="!userInfo.wxUnionid" type="text" @click="handleBind()">绑定</el-button>
        <el-button v-else type="text" @click="handleUnBind()">解绑</el-button>
      </div>
    </div>
    <IepDialogWechat ref="IepDialogWechat" redirect="/my/account/security"></IepDialogWechat>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { socialUnBindAccount } from "@/api/admin/social";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.userGetInfo();
  },
  methods: {
    ...mapActions(["userGetInfo"]),
    async handleUnBind() {
      const { data } = await socialUnBindAccount({
        state: "WXPC",
      });
      if (data) {
        this.$message.success("解绑成功");
        this.userGetInfo();
      }
    },
    handleBind() {
      this.$refs["IepDialogWechat"].dialogShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.change-form {
  padding: 20px;
  background-color: #fff;
  border-right: 1px solid $--border-color;
}
.list-wrapper {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .value {
      color: $--color-text-secondary;
      font-size: 14px;
    }
    .weChat {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #666769;
      i {
        margin-right: 15px;
        font-size: 22px;
        color: #67c23a;
      }
    }
  }
}
</style>
