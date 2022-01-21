<template>
  <div class="user-wrapper">
    <slot></slot>
    <el-dropdown
      class="iep-header-trigger"
      :title="userInfo.realName"
      placement="bottom"
      trigger="click"
    >
      <div class="el-dropdown-link">
        <iep-img v-if="isAvatar" class="img" :resizeOpt="{l:42}" :src="userInfo.avatar"></iep-img>
        <span>{{userInfo.realName}}</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="iep-dropdown">
        <el-dropdown-item
          class="iep-dropdown-item"
          @click.native="$openPage('/my/create_org')"
        >创建新的组织</el-dropdown-item>

        <el-dropdown-item
          class="iep-dropdown-item"
          @click.native="$openPage('/my/index/index')"
          divided
        >个人中心</el-dropdown-item>
        <el-dropdown-item class="iep-dropdown-item" @click.native="$openPage('/my/account')">账号设置</el-dropdown-item>
        <el-dropdown-item class="iep-dropdown-item" @click.native="handleLogout()" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "IepUserWrapper",
  inject: ["isAvatar"],
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["userLogout"]),
    async handleLogout() {
      this.$confirm("真的要注销登录吗 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.userLogout();
          } catch (error) {
            console.log(error);
          } finally {
            this.$openPage("/login");
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.user-wrapper {
  display: flex;
  justify-content: flex-end;
  .iep-header-trigger {
    padding: 0 10px;
    &:nth-child(1),
    &:last-child {
      max-width: 135px;
      min-width: 150px;
    }
    ::v-deep .el-button-group > .el-button:first-child {
      width: 90px;
    }
  }
}
.el-dropdown-link {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  span {
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .img {
    display: inline-block;
    width: 42px;
    height: 42px;
    vertical-align: middle;
    margin-right: 10px;
  }
  i {
    margin-left: 10px;
  }
}
</style>
