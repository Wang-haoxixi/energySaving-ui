<template>
  <div style="width: 100%;">
    <div class="title">节能保手机端</div>
    <div class="desc">智慧组织 千般赋能</div>
    <!-- <el-popover placement="right" width="240" trigger="hover">
      <div class="app-code">
        <div class="app-code-box">
          <iep-img src="http://woneng-oss.oss-cn-hangzhou.aliyuncs.com/sys/app_code.jpg"></iep-img>
        </div>
        <div class="txt">
          <span>节能保APP</span>
          <span>扫码下载</span>
        </div>
      </div>
      <div class="code-phone" slot="reference">
        <i class="el-icon-woneng-APP-sx"></i>节能保APP下载
      </div>
    </el-popover> -->
    <el-popover placement="right" width="280" trigger="hover">
      <div class="app-code">
        <div class="app-code-box">
          <!-- <iep-img src="http://woneng-oss.oss-cn-hangzhou.aliyuncs.com/sys/mini_app_code.jpg"></iep-img> -->
          <iep-img src="https://woneng-oss.oss-cn-hangzhou.aliyuncs.com/wxapp/EnergySaving/energy_mini_code.jpg"></iep-img>
        </div>
        <div class="txt">
          <span>节能保小程序</span>
          <span>扫码打开</span>
        </div>
      </div>
      <div class="code-phone" slot="reference">
        <i class="el-icon-woneng-xiaochengxu-sx"></i>节能保小程序
      </div>
    </el-popover>
  </div>
</template>
<style lang="scss" scoped>
.title {
  margin-top: 10px;
  padding-top: 10px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  height: 38px;
  line-height: 38px;
  border-top: 1px solid $--border-color;
}
.desc {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: $--color-text-secondary;
}
.code {
  width: 96px;
  height: 96px;
  margin: 0 auto;
  padding-top: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.code-phone {
  display: flex;
  justify-content: center;
  // align-items: center;
  margin: 10px 0;
  padding: 6px 5px;
  font-size: 14px;
  text-align: center;
  border-radius: $--large-border-radius;
  border: 1px solid $--border-color;
  cursor: pointer;
  i {
    margin-right: 5px;
    font-size: 18px;
  }
}

.app-code {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
  .txt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 15px;
    width: 40%;
    span:nth-child(1) {
      margin-bottom: 5px;
      font-size: 16px;
    }
    span:nth-child(2) {
      font-size: 14px;
      color: $--color-text-secondary;
    }
  }
  .app-code-box {
    width: 60%;
  }
}
.app-code-box ::v-deep .el-image {
  border-radius: 0;
}
</style>
