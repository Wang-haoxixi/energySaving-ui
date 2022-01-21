<template>
  <div class="redness-wrap">
    <div class="redness-rule">
      <!-- <h3>节能保红度规则</h3>
      <h4>红度等级介绍</h4>
      <p>
        红度等级是基于用户或组织一定时期内使用我品平台功能积累获取的活跃值决定，用户或组织达到相应的等级门槛即可升级。用户或组织可以通过信息发布、分享拉新和订单交易等来获取活跃值，从而提升等级。
        <br />从低到高五个等级在近3个月期内使用节能保平台累积获取的分值决定，用户及组织的红度分值达到相应的等级门槛即可升级。
      </p>
      <h4>等级统计周期</h4>
      <p>红度等级采用以天为单位更新，统计周期为更新当天的前90天。更新时间为每天的凌晨3点。</p>
      <h4>升降级规则</h4>
      <p>红度等级在统计周期（90天）内达到对应等级的活跃值，新等级在当天更新后立即生效。因此90天内活跃值的高低直接决定红度等级。</p>
      <h4>红度值说明</h4>
      <p>用来评定用户及组织红度等级的值称为红度值;用户红度值主要通过节能保平台日常操作行为以及订单成交来获取；组织红度值主要通过该组织内所有用户共同完善丰富组织的数据资产（材料、问卷、活动、用户数量、任务数量等）来获取。</p>-->
      <h2>
        <strong>红度</strong>规则
      </h2>
      <div class="redness-list">
        <h3>红度等级介绍</h3>
        <div class="txt">
          红度等级是基于用户或组织一定时期内使用节能保平台功能积累获取的
          <strong>活跃值</strong>决定，用户或组织达到相应的等级门槛即可升级。用户或组织可以通过
          <strong>信息发布、分享拉新和订单交易</strong>等来获取活跃值，从而提升等级。
        </div>
        <div class="box">
          <iep-img class="img" src="/img/hdgz/picvip.png"></iep-img>
          <p>从低到高五个等级在近3个月期内使用节能保平台累积获取的分值决定， 用户及组织的红度分值达到相应的等级门槛即可升级。</p>
        </div>
        <div class="box-down">
          <div>
            <h5>等级统计周期</h5>
            <p>红度等级采用以天为单位更新，统计周期为更新当天的前90天。 更新时间为每天的凌晨3点。</p>
          </div>
          <div>
            <h5>升降级规则</h5>
            <p>红度等级在统计周期（90天）内达到对应等级的活跃值， 新等级在当天更新后立即生效。 因此90天内活跃值的高低直接决定红度等级。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.redness-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: $--color-input-regular;
  .redness-rule {
    h2 {
      position: relative;
      margin: 35px auto;
      width: 150px;
      font-size: 24px;
      text-align: center;
      background-color: #fff;
      strong {
        margin-right: 10px;
        font-weight: 400;
        color: #f74337;
      }
      &::before {
        position: absolute;
        content: "";
        top: -10px;
        right: 35px;
        width: 25px;
        height: 1px;
        background-color: #eff0f1;
        transform: rotate(-45deg);
      }
      &::after {
        position: absolute;
        content: "";
        left: 35px;
        bottom: -10px;
        width: 25px;
        height: 1px;
        background-color: #eff0f1;
        transform: rotate(-45deg);
      }
    }
  }
  .redness-list {
    margin-bottom: 65px;
    text-align: center;
    h3 {
      display: inline-block;
      margin-bottom: 25px;
      width: 205px;
      max-width: 286px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      background: $--custom-menu-background-color;
      border-radius: 20px;
      // color: #f74337;
      color: $--color-primary;
    }
    .txt {
      margin: 0 auto 50px;
      width: 708px;
      font-size: 14px;
      line-height: 30px;
      strong {
        position: relative;
        font-size: 16px;
        font-weight: 400;
        font-family: "微软雅黑";
        color: $--color-text-primary;
        &::before {
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          bottom: -5px;
          width: 146px;
          height: 10px;
          background: rgba(47, 127, 255, 1);
          opacity: 0.1;
        }
      }
    }
    .box {
      display: flex;
      align-items: center;
      padding: 30px;
      width: 900px;
      height: 246px;
      background: #fff;
      box-shadow: 0px 0px 19px 1px rgba(81, 81, 81, 0.05);
      border-radius: 10px;
      box-sizing: border-box;
      &:hover {
        box-shadow: 0px 0px 22px 1px rgba(81, 81, 81, 0.09);
      }
      .img {
        margin-top: -42px;
        flex: 0 0 285px;
        height: auto;
      }
      p {
        margin: 0 0 0 40px;
      }
    }
    .box-down {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      > div {
        padding: 20px;
        width: 430px;
        height: 170px;
        background: #fff;
        box-shadow: 0px 0px 19px 1px rgba(81, 81, 81, 0.05);
        border-radius: 10px;
        box-sizing: border-box;
        &:hover {
          box-shadow: 0px 0px 22px 1px rgba(81, 81, 81, 0.09);
        }
        &:nth-child(1) {
          background: url("/img/hdgz/bg-left.png") no-repeat;
          background-size: cover;
        }
        &:nth-child(2) {
          background: url("/img/hdgz/bg-right.png") no-repeat;
          background-size: cover;
        }
        h5 {
          margin-bottom: 10px;
          font-family: "微软雅黑";
          color: $--color-text-primary;
        }
        p {
          margin-bottom: 0;
          text-align: justify;
          color: $--color-text-regular;
        }
      }
    }
  }
}
</style>
