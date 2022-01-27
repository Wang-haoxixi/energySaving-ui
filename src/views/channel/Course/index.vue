<template>
  <div class="container">
    <div class="banner">
      <div class="banner-con">
        <div class="banner-plain">
          <div class="banner-title">
            节能宝
            <strong>考试</strong>
            <strong class="sep"></strong>
            <span class="right-txt">数据思维赋能考试</span>
          </div>
          <div class="banner-txt">
            <span>数字人生尽在节能宝</span>
            <span>参与考试赢取未来</span>
          </div>
        </div>
        <div class="banner-decorate">
          <iep-img class="img" src="/img/banner/course_banner_pic.png"></iep-img>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  position: relative;
  background: #fff;
  .banner {
    height: 280px;
    background-image: url(/img/banner/course_banner_bg.jpg);
    background-position-x: center;
    background-size: cover;
    background-repeat: no-repeat;
    .banner-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      width: 1200px;
    }
    .banner-plain {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10%;
      .banner-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 30px;
        font-size: 28px;
        color: $--color-text-primary;
        strong {
          font-weight: 400;
          color: $--color-primary;
        }
        .sep {
          margin: 0 10px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #919397;
        }
        .right-txt {
          font-size: 24px;
        }
      }
      .banner-txt {
        margin-top: 10px;
        margin-left: 30px;
        font-size: 20px;
        span {
          display: inline-block;
          vertical-align: middle;
          &:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
      .img {
        margin-left: 8px;
        margin-bottom: 20px;
      }
    }
    .banner-decorate {
      margin-top: 30px;
      margin-right: 6.2%;
      width: 400px;
    }
  }
}
</style>
