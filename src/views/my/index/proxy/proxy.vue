<template>
  <div class="my-proxy">
    <div style="width:100%;">
      <div class="box">
        <div class="rank">
          <span>合伙人等级：</span>
          <span>
            <i class="rank-icon" :class="_rankIconName(form.rank)"></i>
          </span>
        </div>
        <div class="explain" @click="$openPage('/channel_proxyProduct/buy_proxy')">合伙人等级说明</div>
      </div>
      <div class="tip">
        <el-alert
          :title="`当前合伙人排名${form.ranking}距离下一级合伙人还差${form.balance}宝贝`"
          type="warning"
          :closable="false"
        ></el-alert>
      </div>
      <el-row
        class="box"
        style="margin: 50px 0 25px;padding-bottom:30px;border-bottom: 1px solid $--border-color;"
      >
        <div class="box-item">
          <div class="value">{{form.orderAmount}}</div>
          <div class="smallTitle">我的订单</div>
        </div>
        <el-divider class="el-divider" direction="vertical"></el-divider>
        <div class="box-item">
          <div class="value">{{form.bailSum}}</div>
          <div class="smallTitle">预付款</div>
        </div>
      </el-row>
      <el-row class="box">
        <h4>当前权益</h4>
        <div class="box-item interests">
          <div class="left" style="background-color: #fffbf2;color:#f3af8e;">
            <i class="el-icon-woneng-daili"></i>
          </div>
          <div class="right">
            <div class="smallTitle">产品代理</div>
            <span class="num">{{form.discountRate}}</span>
          </div>
        </div>
        <div class="box-item interests">
          <div class="left" style="background-color: #f4f9fd;color:#72a7dc;">
            <i class="el-icon-woneng-caiwu1"></i>
          </div>
          <div class="right">
            <div class="smallTitle">宝贝返还</div>
            <span class="num">{{form.quantitySum}}贝</span>
          </div>
        </div>
        <div class="box-item interests" style="cursor: pointer;">
          <div class="left" style="background-color: #fffbf2;color:#edbe71;">
            <i class="el-icon-woneng-xitongguanli"></i>
          </div>
          <div class="right">
            <div class="smallTitle">更多权益</div>
            <span class="num see" @click="$openPage('/channel_proxyProduct/buy_proxy')">查看</span>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getMyAgent } from "@/api/dms/proxy";
const initForm = () => {
  return {
    rankId: 1, //等级
    realName: "", //姓名
    mobile: "", //电话
    orgName: "", // 组织
    rank: "1", //等级
    bailSum: 0, // 保证金
    balance: 0, //距离下一级还差多少
    ranking: 0, // 当前排名
    orderAmount: 0,
    discountRate: 0,
    quantitySum: 0,
  };
};
export default {
  name: "detail",
  data() {
    return {
      form: initForm(),
      btnName: "升级代理",
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    _rankIconName(rank) {
      if ([1, 2, 3, 4, 5, 6, 7].includes(+rank)) {
        return `el-icon-woneng-v${rank}`;
      }
      return "el-icon-woneng-v1";
    },
    async loadPage() {
      const { data } = await getMyAgent();
      if (!data) {
        this.btnName = "申请代理";
        this.form = initForm();
      } else {
        this.form = this.$mergeByFirst(initForm(), data);
        this.form.discountRate = this.form.discountRate + "折";
      }
    },
    upgrade() {
      this.$router.push({
        path: "/channel_proxyProduct/buy_proxy",
        query: {
          agentType: 1,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.my-proxy {
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 15px;
  }
  .rank {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    .rank-icon {
      font-size: 30px;
      color: rgb(243, 190, 92);
    }
  }
  .smallTitle {
    height: 30px;
    line-height: 30px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    text-align: center;
    font-size: 16px;
  }
  .box-item {
    display: inline-block;
    margin: 20px 30px;
    &:first-child {
      padding-right: 60px;
      // border-right: 1px solid $--border-color;
    }
    .smallTitle {
      color: $--color-text-secondary;
    }
  }
  .el-divider {
    height: 60px;
  }
  .interests {
    display: inline-flex;
    align-items: center;
    padding: 18px 30px;
    margin: 0 20px;
    border: 1px solid $--border-color;
    border-radius: $--border-radius-base;
    &:hover {
      box-shadow: 0 1px 3px 0 $--background-color;
    }
    .left {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      width: 60px;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      > i {
        font-size: 32px;
        height: 60px;
        line-height: 60px;
      }
    }
    .right {
      margin-left: 15px;
      color: $--color-text-regular;
      .num {
        font-size: 14px;
        color: $--color-text-regular;
      }
      .see:hover {
        color: $--color-primary;
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
  .tip {
    max-width: 400px;
    text-align: center;
  }
  .value {
    text-align: center;
    font-size: 24px;
    color: #e36e6f;
  }
  .right {
    color: $--color-primary;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.right {
  font-size: 14px;
}
.tip ::v-deep .el-alert {
  padding: 3px 16px;
  border-radius: 20px;
}
.explain {
  font-size: 14px;
  color: $--color-primary;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
