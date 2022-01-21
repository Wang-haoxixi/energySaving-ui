<template>
  <iep-basic-container class="basic-container">
    <div class="basic-content">
      <div class="basic-left">
        <!-- 头部表单 -->
        <headTpl class="head-form" @load-page="loadPage" isSpecial></headTpl>
        <ListTpl class="list" ref="list"></ListTpl>
      </div>

      <div class="basic-right">
        <UserInfo class="user-info"></UserInfo>
        <rightTpl ref="contentRight"></rightTpl>
      </div>
    </div>

    <el-backtop target=".iep-basic-scroll" :visibility-height="1350" :bottom="200" :right="100">
      <div class="cancel-top">
        <i class="el-icon-top"></i>
      </div>
    </el-backtop>
  </iep-basic-container>
</template>

<script>
import headTpl from "./library/form";
import { mapGetters } from "vuex";
import UserInfo from "./userInfo";
import ListTpl from "./list";
import rightTpl from "./right";

export default {
  components: {
    headTpl,
    UserInfo,
    ListTpl,
    rightTpl,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {};
  },
  methods: {
    // 我要发布
    handlePublish() {
      this.$refs["publish"].open();
    },
    loadPage() {
      this.$refs.list.loadPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-container {
  background-color: $--background-color;
  &::v-deep > .el-card {
    background-color: $--background-color;
  }
  .basic-content {
    margin: auto;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .basic-left {
      margin: 0;
      flex: 1;
      background-color: $--background-color;
      .head-form {
        margin-bottom: 20px;
        padding: 20px;
        background-color: #fff;
      }
      .list {
        background-color: #fff;
        border-radius: $--border-radius-base;
      }
    }
    .basic-right {
      width: 298px;
      margin-left: 20px;
      box-sizing: border-box;
      .user-info {
        margin-bottom: 20px;
      }
    }
  }
}
h3.title {
  text-align: center;
  font-size: 24px;
  padding: 30px 0 20px;
  .akey {
    color: $--color-primary;
  }
}
.cancel-top {
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 44px;
  color: $--color-text-regular;
  font-size: 30px;
}
</style>
