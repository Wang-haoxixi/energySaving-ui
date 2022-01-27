<template>
  <div class="buy-proxy">
    <banner></banner>
    <div class="surprise" v-if="!nextShow">
      <div class="surprise-counter">
        <h4>6大惊喜</h4>
        <div class="surprise-six">
          <div class="surprise-list" v-for="(item,index) in dataList" :key="index">
            <img :src="item.img" alt />
            <span>{{item.name}}</span>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box-wrapper" v-if="!nextShow">
      <h4>合作人等级</h4>
      <div class="partner-level">
        <span class="line"></span>
        <div class="partner-level-item" v-for="(level,idx) in levelList" :key="idx">
          <i :class="level.icon"></i>
          <div class="sub-box">
            <span class="level">{{level.star}}</span>
            <span class="num-box">
              {{level.num}}
              <u>折</u>
            </span>
          </div>
          <div class="balance-box">
            <span>宝贝余额</span>
            <span>{{level.range}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box-bottom">
      <h4>支付升级</h4>
      <span>合伙人升级请扫码支付，支付时请备注您的节能宝账号</span>
      <div class="box-bottom-code">
        <div>
          <iep-img src="/img/front/wxzf.jpg"></iep-img>
          <span>微信支付</span>
        </div>
        <div>
          <iep-img src="/img/front/lxkf.jpg"></iep-img>
          <span>联系客服</span>
        </div>
      </div>
      <!-- <el-button class="iep-btn-long-big" type="primary" @click="QuestionAndAnswer(true)">联系我们</el-button> -->
    </div>
    <pay-deposit ref="payDeposit" @prev="prev"></pay-deposit>
  </div>
</template>
<script>
import { columnsMap } from "./options";
import Banner from "./Banner";
import PayDeposit from "./PayDeposit";
// import { getProxyConfigList, getMyAgent } from "@/api/dms/proxy";
import { mapActions } from "vuex";
export default {
  components: { Banner, PayDeposit },
  data() {
    return {
      columnsMap,
      dataList: [
        {
          img: "/img/proxy/advantage-one.png",
          name: "产品折扣",
          desc: "根据合伙人等级享受不同等级的产品折扣",
        },
        {
          img: "/img/proxy/advantage-two.png",
          name: "宝贝奖励",
          desc: "根据合伙人等级奖励相应数量的宝贝",
        },
        {
          img: "/img/proxy/advantage-three.png",
          name: "培训支持",
          desc: "线上讲师培训，线下产品深度培训",
        },
        {
          img: "/img/proxy/advantage-four.png",
          name: "技术支持",
          desc: "线上教学资源支持，线下数据架构师支持",
        },
        {
          img: "/img/proxy/advantage-five.png",
          name: "营销支持",
          desc: "官方培训考试，节能宝生态圈活动，峰会活动嘉宾",
        },
        {
          img: "/img/proxy/advantage-six.png",
          name: "销售支持",
          desc: "行业精准安全销售指导，销售激励，专业团队指导",
        },
      ],
      type: 1,
      phone: "",
      rankId: null,
      isLoadTable: true,
      pagedTable: [],
      level: 1,
      signBail: null,
      signRankId: null,
      signLevel: 0,
      nextShow: false,
      levelList: [
        {
          icon: "el-icon-woneng-v1",
          star: "一星级",
          num: "9.9",
          range: "0-999",
        },
        {
          icon: "el-icon-woneng-v2",
          star: "二星级",
          num: "9.5",
          range: "1000-9999",
        },
        {
          icon: "el-icon-woneng-v3",
          star: "三星级",
          num: "9",
          range: "10,000-99,999",
        },
        {
          icon: "el-icon-woneng-v4",
          star: "四星级",
          num: "8",
          range: "100,000-999,999",
        },
        {
          icon: "el-icon-woneng-v5",
          star: "五星级",
          num: "7",
          range: "1000,000-9,999,999",
        },
        {
          icon: "el-icon-woneng-v6",
          star: "超星级",
          num: "6",
          range: "10000000以上",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["QuestionAndAnswer"]),
    prev(val) {
      this.nextShow = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.buy-proxy {
  background-color: #f5f5f5;

  .surprise {
    background-color: #fff;
    .surprise-counter {
      width: 1200px;
      margin: 0 auto;
      padding: 40px 0;
      h4 {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 30px;
        font-family: "微软雅黑";
        color: $--color-text-primary;
      }
      .surprise-six {
        display: grid;
        grid-auto-flow: row dense;
        grid-gap: 20px;
        grid-template-columns: 1fr 1fr 1fr;
        .surprise-list {
          padding: 10px;
          text-align: center;
          transition: all 0.3s;
          &:hover {
            transform: translateY(-10px);
            img {
              transform: scale(1.1);
              transition: all 0.3s;
            }
          }
          img {
            width: 26%;
            height: auto;
          }
          span {
            display: block;
            margin-top: 10px;
            font-size: 18px;
            font-family: "微软雅黑";
            color: $--color-text-primary;
          }
          p {
            margin: 10px auto;
            width: 44%;
            font-size: 14px;
            color: $--color-text-secondary;
          }
        }
      }
    }
  }
  .box-bottom {
    margin: 0 auto;
    padding: 40px 0;
    width: 100%;
    text-align: center;
    background-color: #fff;
    h4 {
      margin: 30px auto 20px;
      width: 100%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 30px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    > span {
      display: block;
      margin-bottom: 45px;
      color: $--color-text-secondary;
    }
    .box-bottom-code {
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        text-align: center;
      }
      span {
        display: block;
        margin: 5px 0 25px;
        color: $--color-text-regular;
      }
    }
  }
  .box-wrapper {
    width: 1200px;
    margin: 20px auto 40px;
    h4 {
      margin: 30px auto 40px;
      width: 100%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 30px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .partner-level {
      position: relative;
      display: grid;
      grid-auto-flow: row dense;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      .line {
        position: absolute;
        top: 72px;
        left: 60px;
        right: 60px;
        height: 1px;
        background-color: #ddd;
      }
      .partner-level-item {
        text-align: center;
        z-index: 1;
        &:hover .sub-box {
          box-shadow: 0 2px 15px 0 $--background-color;
          transform: scale(1.1);
        }
        &:hover i {
          transform: translateY(-10px);
        }
        &:hover .balance-box {
          transform: translateY(10px);
        }
        i {
          font-size: 28px;
          color: #e24f55;
          transition: all 0.3s;
        }
        .sub-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto 5px;
          width: 85px;
          height: 85px;
          border-radius: 50%;
          border: 1px solid $--border-color;
          background-color: #fff;
          transition: all 0.3s;
          .level {
            font-size: 14px;
            line-height: 14px;
            color: $--color-text-regular;
          }
          .num-box {
            font-size: 24px;
          }
          u {
            margin-left: 3px;
            font-size: 14px;
            color: $--color-text-regular;
            text-decoration: none;
          }
        }
        .balance-box {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s;
          span {
            font-size: 14px;
            &:nth-child(1) {
              color: $--color-text-regular;
            }
            &:nth-child(2) {
              margin-top: 3px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
.buy-proxy ::v-deep .has-gutter {
  font-size: 16px;
  font-weight: 400;
}
.buy-proxy ::v-deep .cell {
  font-weight: 400;
}
.buy-proxy ::v-deep .el-table__body-wrapper .cell {
  font-size: 14px;
}
.el-icon-check {
  color: #e24f55;
  font-size: 22px;
}
.box-wrapper ::v-deep .el-tabs__nav {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.box-wrapper ::v-deep .el-tabs__item {
  text-align: center;
  white-space: pre-line;
  height: 70px !important;
  line-height: 20px !important;
  padding-top: 15px;
}
.box-wrapper ::v-deep .el-tabs--border-card {
  box-shadow: 0 0 0 0;
}
.box-bottom-code ::v-deep .iep-image {
  margin: 0 30px;
  width: 140px;
}
</style>
