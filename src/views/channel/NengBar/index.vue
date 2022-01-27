<template>
  <div class="bg">
    <div class="strategy">
      <h1>
        <strong>挖贝</strong>攻略
      </h1>
      <div class="strategy-item">
        <h3>什么是宝贝</h3>
        <div class="txt">
          是节能宝平台中定义
          <strong>资源价值的衡量单位</strong>，是用户（用户）可以在平台内通过各种有益方式获得的虚拟奖励。宝贝可以作为支付介质在平台中交换资源和服务，也是用户作为平台
          <strong>虚拟股东的数字凭证</strong>。
        </div>
        <div class="strategy-list">
          <div class="strategy-list-item" v-for="list in listList" :key="list.id">
            <div class="title">
              <h5>{{list.title}}</h5>
              <span v-if="list.isShow" :class="list.show">{{list.explain}}</span>
            </div>
            <p>{{list.con}}</p>
          </div>
        </div>
      </div>
      <div class="strategy-item">
        <h3>如何查看宝贝明细</h3>
        <div class="website">
          <i class="el-icon-woneng-huiyi1"></i>
          <span>电脑端：https://www.woneng.net/my/index/nengbar</span>
        </div>
        <div class="index-con">
          <iep-img class="index-img" src="/img/nengbei/nbjl1.png"></iep-img>
        </div>
        <div class="website">
          <i class="el-icon-woneng-phone"></i>
          <span>宝贝APP-我的-我的宝贝-账单</span>
        </div>
        <div class="bill-con">
          <iep-img class="bill-img" src="/img/nengbei/nbjl2.png"></iep-img>
        </div>
      </div>
      <div class="strategy-item">
        <h3>宝贝使用说明</h3>
      </div>
      <div class="time-list">
        <p class="time-list-item" v-for="item in itemList" :key="item.id">{{item.item}}</p>
      </div>
      <div class="strategy-item">
        <h3>挖贝行为说明</h3>
        <div
          class="txt"
          style="
    text-align: left;"
        >用户获得宝贝后，有权以消耗宝贝的方式购买能力魔方商品、下载材料，对宝贝进行打赏、转账，通过宝贝激励发布任务、问卷等，但其应遵守如下行为规范：</div>
        <div class="explain-list">
          <div class="explain-list-item" v-for="list in listLists" :key="list.id">{{list.con}}</div>
        </div>
      </div>
      <div class="strategy-item">
        <h3 style="width:286px">宝贝相关行为违规处理实施细则</h3>
        <div
          class="txt"
        >参加宝贝业务的用户违反下列行为规范相关规定，节能宝平台将依照本规范、《用户协议》、《宝贝规则》及其他相关规则对其进行处理，处理措施包括但不限于撤销违规交易、扣除违规获取的宝贝、取消获奖资格。</div>
        <div class="rule-list">
          <div class="rule-list-item" v-for="rule in ruleList" :key="rule.id">{{rule.con}}</div>
        </div>
      </div>
      <div class="strategy-item">
        <h3>温馨提示</h3>
        <div class="box">
          1、个人账户宝贝归个人所有，账户注销请账户所有人自行提前处理宝贝，账户注销后宝贝无法找回。
          <br />2、组织账户宝贝归组织所有，组织发生负责人变更、组织注销等操作，请负责人提前处理宝贝，因负责人个人操作不当导致的组织账户宝贝丢失，节能宝平台不支持找回。
          <br />3、个人账户/组织账户安全密码自行设定与管理，建议定期修改确保账户安全， 如密码忘记，请通过预留手机号验证找回。
          <br />4、个人账户/组织账户宝贝流水异常或缺失立即联系节能宝平台官方客服，待查明原因给予回复并提出解决方案。
          <br />5、所有用户均可通过节能宝平台“建议反馈”栏目反馈宝贝相关的一切问题，平台会在三个工作日内给予回复。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nengbar",
  data() {
    return {
      listList: [
        {
          title: "随时赚，随时用！",
          con: "发布说说、发布专栏文章、能力魔方销售……平台各类操作行为都可以让用户在不花一分钱的前提下轻松获取宝贝！",
          isShow: false,
        },
        {
          title: "人人都是合伙人！",
          con: "宝贝是用户在节能宝平台的数字财富，拥有宝贝即为节能宝平台的合伙人。合伙人等级的高低取决于账户宝贝数量。",
          isShow: false,
        },
        {
          title: "宝贝价值，你做主！",
          con: "节能宝平台资产价值是由广大平台成员（宝贝持有人）对平台各项数据/信息的心理预估单价（以人民币为计量单位），通过加权平均计算得出平台数据价值总额，并加上平台现金量得出的总价值。",
          show: "show",
          isShow: true,
          explain: "凡参与估值的成员即可获得1宝贝奖励和幸运奖抽奖机会",
        },
        {
          title: "善用宝贝，玩转节能宝！",
          con: "节能宝平台上宝贝账户分为个人账户和组织账户，宝贝可以在用户与用户，用户与组织之间进行转账、打赏，还可以用来发布任务、购买能力魔方产品等。利用好宝贝，轻松玩转节能宝打造个人IP事半功倍！",
          isShow: false,
        },
      ],
      itemList: [
        { item: "能力魔方相关商品交易可以使用宝贝、现金等多种方式付款。" },
        { item: "卖家不可以强制买家使用单一付款方式进行交易。" },
        {
          item: "当订单进行退款时候，按照付款方式进行原路返回，买家不可强制要求卖家改变退款方式。",
        },
      ],
      listLists: [
        {
          con: "须通过正常途径获得宝贝，不得通过软件、程序等方式获取宝贝。",
        },
        {
          con: "须维护良好的宝贝运转秩序，不得影响宝贝体系的正常运营。",
        },
        {
          con: "须遵守《用户协议》、《宝贝规则》关于用户行为的相关规定。",
        },
        {
          con: "平台不进行宝贝兑现功能和服务。",
        },
        {
          con: "在获取和使用宝贝的过程中，如果出现违规行为（作弊领取、恶意套现、刷取宝贝、虚假交易等，节能宝平台将取消您的获取资格，并有权撤销违规交易，扣除违规获得或使用的宝贝,必要时追究法律责任。",
        },
      ],
      ruleList: [
        {
          con: "违规注册及使用账号，通过机器、外挂等恶意注册节能宝账号、赚取宝贝，通过机器、外挂、系统漏洞等非正常途径获取宝贝。",
        },
        {
          con: "恶意交易，通过人工操作或机器程序等在能力魔方产生恶意交易的扰乱秩序行为，买家通过宝贝兑换成功买到商品后，不发货，不退货只退款等恶意行为。",
        },
        {
          con: "协助他人产生虚假交易。",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.bg {
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/img/nengbei/nbglbg.png") no-repeat;
  background-position-y: bottom;
}
.strategy {
  margin: 0 auto;
  width: 1200px;
  background-color: #fff;
  h1 {
    position: relative;
    margin: 65px auto;
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
.strategy-item {
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
    color: #f74337;
  }
  .txt {
    margin: 0 auto 50px;
    width: 668px;
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
  .strategy-list {
    display: grid;
    grid-auto-flow: row dense;
    gap: 5px;
    grid-template-columns: 1fr 1fr;
    .strategy-list-item {
      padding: 20px;
      background: rgba(243, 245, 245, 1);
      border-radius: 10px;
      box-sizing: border-box;
      transition: all 0.3s;
      &:hover {
        transform: translateY(-5px);
      }
      .title {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: -4px;
        padding-left: 20px;
        font-size: 16px;
        text-align: left;
        h5 {
          margin: 0;
          font-family: Microsoft YaHei;
          color: #303031;
        }
        &::before {
          position: absolute;
          content: "";
          top: 8px;
          left: 0;
          width: 5px;
          height: 5px;
          background: rgba(47, 127, 255, 1);
          border-radius: 50%;
        }
      }
      p {
        margin-top: 5px;
        margin-bottom: -10px;
        font-size: 14px;
        text-align: justify;
        line-height: 32px;
        color: #656769;
      }
      .show {
        display: inline-block;
        font-size: 14px;
        color: #f74337;
      }
    }
  }
  .website {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px auto 50px;
    width: 543px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(239, 239, 241, 1);
    border-radius: 10px;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
    i {
      margin-right: 10px;
      font-size: 20px;
      color: $--color-text-secondary;
    }
    span {
      font-size: 14px;
      color: #656769;
    }
  }
  .index-img {
    margin: 0 auto;
    width: 832px;
    height: 440px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    ::v-deep .el-image__inner {
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: translateY(-10px);
    }
  }
  .bill-con,
  .index-con {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      bottom: -20px;
      height: 180px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.4) 5%,
        rgba(255, 255, 255, 0.7) 10%,
        rgba(255, 255, 255, 0.9) 80%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }
  .index-con {
    &::after {
      height: 100px;
    }
  }
  .bill-img {
    margin: 0 auto;
    width: 375px;
    height: 430px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    ::v-deep .el-image__inner {
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: translateY(-10px);
    }
  }
  .box {
    margin-top: -45px;
    padding: 50px 100px;
    font-size: 14px;
    text-align: left;
    line-height: 40px;
    color: #666769;
    border-radius: 10px;
    box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    &:hover {
      transform: translateY(-10px);
    }
  }
}
.explain-list {
  display: grid;
  grid-auto-flow: row dense;
  gap: 20px 30px;
  grid-template-columns: 1fr 1fr;
  .explain-list-item {
    position: relative;
    font-size: 14px;
    padding: 20px 20px 20px 35px;
    text-align: left;
    background: rgba(243, 245, 245, 1);
    border-radius: 10px;
    box-sizing: border-box;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
    &:last-child {
      grid-area: 3/ 3 / 3 / 1;
    }
    &::before {
      position: absolute;
      content: "";
      top: 27px;
      left: 20px;
      width: 5px;
      height: 5px;
      background: rgba(47, 127, 255, 1);
      border-radius: 50%;
    }
  }
}
.rule-list {
  display: grid;
  grid-auto-flow: row dense;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  .rule-list-item {
    position: relative;
    font-size: 14px;
    padding: 20px;
    text-align: left;
    background: #fff;
    border-radius: 10px;
    border: 1px solid $--border-color;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
    &::before {
      position: absolute;
      content: "";
      top: -24px;
      left: -24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: $--color-secondary;
    }
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 18px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      color: #fff;
    }
    &:nth-child(1) {
      &::after {
        content: "1";
      }
    }
    &:nth-child(2) {
      &::after {
        content: "2";
      }
    }
    &:nth-child(3) {
      &::after {
        content: "3";
      }
    }
  }
}
.time-list {
  position: relative;
  margin-top: -30px;
  margin-bottom: 65px;
  .time-list-item {
    position: relative;
    margin: 0 auto 30px;
    padding: 15px;
    width: 630px;
    font-size: 14px;
    text-align: left;
    color: #666769;
    border: 1px solid $--border-color;
    border-radius: 10px;
    box-sizing: border-box;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.08);
    }
    &::before {
      position: absolute;
      content: "";
      left: -12px;
      top: 20px;
      width: 12px;
      height: 11px;
      background: url("/img/nengbei/xj.png") no-repeat;
      background-size: cover;
    }
    &::after {
      position: absolute;
      content: "";
      top: 15px;
      left: -45px;
      width: 20px;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: $--color-secondary;
      color: #fff;
    }
    &:nth-child(1) {
      &::after {
        content: "1";
      }
    }
    &:nth-child(2) {
      &::after {
        content: "2";
      }
    }
    &:nth-child(3) {
      &::after {
        content: "3";
      }
    }
  }
  &::before {
    position: absolute;
    top: -5%;
    left: 251px;
    content: "";
    height: 110%;
    width: 1px;
    background-color: $--border-color;
  }
}
</style>
