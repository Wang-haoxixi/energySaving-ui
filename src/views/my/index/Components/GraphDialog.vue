<template>
  <iep-dialog :dialog-show="dialogShow" title="关系图谱" width="1100px" @close="_close()" isTitleSlot>
    <div slot="title" style="width:100%">
      <span>关系图谱</span>
      <!-- <el-button type="text" @click="handleFullScreen">全屏查看</el-button> -->
      <i class="el-icon-full-screen btn" @click="handleFullScreen" title="全屏"></i>
    </div>
    <div ref="fullScreen" class="fullScreen" v-loading="loading">
      <el-button v-show="isFullScreen" @click="handleExitFullScreen">退出全屏</el-button>
      <iep-relation-chart
        ref="IepRelationChart"
        :handleAvatarClick="handleAvatarClick"
        :config="config"
        :requestFn="followSocialNetwork"
        :loading.sync="loading"
      ></iep-relation-chart>
    </div>
  </iep-dialog>
</template>
<script>
import { followSocialNetwork } from "@/api/admin/follow";
export default {
  data() {
    return {
      dialogShow: false,
      config: {
        relFontSize: 8,
        alphaDecay: 0.6,
        r: 30, // 头像的半径 [30 - 45]
        strength: 0.2, //碰撞力
        iterations: 3, //迭代次数
        strokeColorM: "#f74437", // 头像外围包裹的颜色主
        strokeColorP: "#7ecef4", // 头像外围包裹的颜色人
        strokeColorS: "#3cd489", // 头像外围包裹的颜色SO
        strokeOpacity: 0.5,
      },
      isFullScreen: false,
      loading: false,
    };
  },
  methods: {
    followSocialNetwork,
    _close() {
      this.dialogShow = false;
    },
    handleAvatarClick({ id, type }) {
      const path = type ? "/channel/styles/so/" : "/channel/styles/user/";
      this.$router.push({ path: path + id + "/index" });
    },
    handleFullScreen() {
      this.$refs["fullScreen"].requestFullscreen();
    },
    handleExitFullScreen() {
      document.exitFullscreen();
    },
    quit() {
      this.$refs["IepRelationChart"].updateChart();
      if (document.fullscreenElement) {
        this.isFullScreen = true;
        // console.log("进入全屏");
      } else {
        this.isFullScreen = false;
        // console.log("退出全屏");
      }
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.quit);
  },
  beforeDestroy() {
    document.removeEventListener("fullscreenchange", this.quit);
  },
};
</script>
<style lang="scss" scoped>
.fullScreen {
  height: 500px;
  background: #ffffff;
  position: relative;
  .el-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.iep-relation-chart {
  height: 100%;
}
.el-button {
  margin-left: 10px;
}
.btn {
  float: right;
  cursor: pointer;
  color: $--color-text-secondary;
  font-size: 12px;
  line-height: 18px;
  margin-right: 10px;
}
</style>