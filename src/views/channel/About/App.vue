<template>
  <div class="app-container">
    <h4>APP下载</h4>
    <div class="app-box">
      <div class="img">
        <iep-img src="/img/about/sj.png"></iep-img>
      </div>
      <div class="txt">
        <p>
          <strong>节能保</strong>，全域节能，科技臻善！！
        </p>
        <div class="code">
          <iep-img src="/img/about/app_code.png"></iep-img>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-container {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0 80px;
  &:hover .code {
    transform: scale(1.1);
  }
  &:hover .img {
    transform: translateX(-10px);
  }
  h4 {
    margin: 30px auto;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 2px;
    font-size: 34px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
  }
  .app-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(/img/about/sjbj.png);
    background-position-x: 13%;
    background-position-y: bottom;
    background-repeat: no-repeat;
    .img {
      margin-right: 40px;
      transition: all 0.3s;
    }
    .txt {
      margin-left: 45px;
      p {
        margin-bottom: 30px;
        font-size: 20px;
        strong {
          font-weight: 400;
          color: $--color-primary;
        }
      }
      .code {
        padding: 55px 50px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 2px 12px 0 $--background-color;
        transition: all 0.3s;
      }
    }
  }
}
</style>
