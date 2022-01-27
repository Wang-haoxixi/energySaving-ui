<template>
  <el-popover placement="left" width="300" trigger="hover">
    <div class="app-code">
      <!-- <span>手机节能宝</span> -->
      <div class="app-code-box">
        <!-- <div class="app-code-item">
          <iep-img
            style="border-radius: 0;"
            src="http://woneng-oss.oss-cn-hangzhou.aliyuncs.com/sys/app_code.jpg"
          ></iep-img>
          <span> -->
            <!-- <i class="el-icon-woneng-AI"></i> -->
            <!-- 节能宝APP下载
          </span>
        </div> -->
        <div class="app-code-item">
          <!-- <iep-img
            style="border-radius: 0;"
            src="http://woneng-oss.oss-cn-hangzhou.aliyuncs.com/sys/mini_app_code.jpg"
          ></iep-img> -->
          <iep-img
            style="border-radius: 0;"
            src="https://woneng-oss.oss-cn-hangzhou.aliyuncs.com/wxapp/EnergySaving/energy_mini_code.jpg"
          ></iep-img>
          <span>
            <!-- <i class="el-icon-woneng-pingguo"></i> -->
            节能宝小程序
          </span>
        </div>
      </div>
    </div>
    <div class="fixed-btn" slot="reference">
      <span class="phone">
        <i class="el-icon-woneng-shouji"></i>
      </span>
    </div>
  </el-popover>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.app-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  span {
    margin-bottom: 10px;
    font-size: 16px;
    width: 100%;
    text-align: left;
  }
  .app-code-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .app-code-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 20px;
      width: 45%;
      &:nth-of-type(1) {
        padding-left: 0;
        padding-right: 20px;
        // border-right: 1px solid $--border-color;
      }
      span {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 0;
        i {
          margin-right: 5px;
          font-size: 18px;
        }
      }
    }
  }
}
.app-code-item ::v-deep .iep-img {
  width: 200px;
}
.fixed-btn {
  border-radius: $--border-radius-base $--border-radius-base 0 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  // right: 15px;
  // bottom: 301px;
  // position: fixed;
  width: 40px;
  padding: 10px 0;
  border: 1px solid $--border-color;
  background: rgba(255, 255, 255, 0.6);
  .phone {
    height: 27px;
    i {
      font-size: 28px;
    }
  }
  &:hover {
    background: #fff;
  }
  & > img {
    width: 70%;
  }
  & > .text-vertical {
    font-size: 15px;
    margin-top: 10px;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
}
.fixed-btn ::v-deep .el-divider {
  margin: 5px 0;
}
.app-code-box ::v-deep .el-image {
  border-radius: 0;
}
</style>
