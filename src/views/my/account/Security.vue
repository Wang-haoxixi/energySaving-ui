<template>
  <div class="security">
    <iep-basic-container style="border:0">
      <div class="info-title">
        {{$route.name}}
      </div>
      <change-password></change-password>
      <el-divider></el-divider>
      <change-safe-password></change-safe-password>
      <el-divider></el-divider>
      <change-mobile></change-mobile>
      <el-divider></el-divider>
      <div class="second-container">
        <third-box></third-box>
        <del-account></del-account>
      </div>
      <el-divider></el-divider>
    </iep-basic-container>

  </div>
</template>
<script>
import ChangePassword from "./ChangePassword";
import ChangeSafePassword from "./ChangeSafePassword";
import ChangeMobile from "./ChangeMobile";
import DelAccount from "./DelAccount";
import ThirdBox from "./ThirdBox";
export default {
  components: {
    ChangeSafePassword,
    ChangePassword,
    ChangeMobile,
    DelAccount,
    ThirdBox,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "./common.scss";
.security {
  background-color: #fff;
}
.second-container {
  display: flex;
  > div {
    width: 100%;
  }
}
</style>
