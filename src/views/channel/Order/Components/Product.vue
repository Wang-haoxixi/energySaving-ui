<template>
  <div>
    <!-- 我的等级详情 -->
    <div class="vip-wrap">
      <div>由于您用宝贝完成了一笔支付，您的合伙人等级及享受的权益可能发生相应的变动</div>
      <div class="result-item">
        <span>当前合伙人等级：</span>
        <i :class="`el-icon-woneng-v${proxyDetail.rank}`"></i>
      </div>
      <div class="result-item">
        <span>宝贝余额：</span>
        <span>{{proxyDetail.balance}}贝</span>
      </div>
      <div class="result-item">
        <span>当前权益：</span>
        <div class="result-info">
          <span>
            <i class="el-icon-woneng-daili"></i>
          </span>
          <div class="result-info-txt">
            <span>产品代理</span>
            <span>{{proxyDetail.discountRate}}折</span>
          </div>
        </div>
        <div class="result-info">
          <span>
            <i class="el-icon-woneng-list4"></i>
          </span>
          <div class="result-info-txt">
            <span>更多权益</span>
            <span>查看</span>
          </div>
        </div>
      </div>
      <div class="you-can">
        <span>您可以：</span>
        <span @click="$openPage('/my/index/proxy')">查看详情</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$openPage('/my/index/nengbar')">宝贝流水</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="$openPage('/channel_proxyProduct/buy_proxy')">我要充值</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="vip-wrap">
      <div class="label">相关附件：</div>
      <div class="attach-list">
        <div v-if="!attachList.length">暂无相关附件</div>
        <div v-for="(item,i) in attachList" :key="i" class="attacth-item">
          <el-link icon="el-icon-link" @click="handleDownload(item)">{{item.original}}</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { downloadUrl } from "@/api/common";
import { getProductShopById } from "@/api/dms/product";
import { getMyProxyDetail } from "@/api/dms/proxy";
class ProxyDetailDTO {
  balance = 0;
  discountRate = 10;
  rank = 1;
}
export default {
  data() {
    return {
      proxyDetail: new ProxyDetailDTO(),
      attachList: [],
    };
  },
  watch: {
    id(o, n) {
      console.log(o, n);
    },
  },
  created() {
    this.loadVip();
  },
  methods: {
    async loadSelf(id) {
      const { data } = await getProductShopById(id);
      this.attachList = data.attachList;
    },
    async loadVip() {
      const { data } = await getMyProxyDetail();
      this.proxyDetail = this.$mergeByFirst(new ProxyDetailDTO(), data);
    },

    handleDownload(item) {
      this.$message("附件下载中");
      downloadUrl(item.attachFile, item.original);
    },
  },
};
</script>
<style lang="scss" scoped>
.attach-list {
  margin-left: 20px;
  margin-top: 10px;
}
.vip-wrap {
  margin: 0 auto;
  width: 700px;
  .result-item {
    margin-top: 12px;
    i {
      font-size: 20px;
      color: $--color-primary;
    }
    span {
      display: inline-block;
      vertical-align: top;
      text-align: right;
      color: $--color-text-regular;
      &:nth-child(1) {
        width: 112px;
      }
      &:nth-child(2) {
        max-width: 260px;
        text-align: left;
      }
    }
    .result-info {
      display: inline-block;
      vertical-align: top;
      margin-right: 15px;
      padding: 10px;
      width: 150px;
      background-color: #fff;
      border: 1px solid rgba(245, 245, 245, 1);
      border-radius: 10px;
      box-sizing: border-box;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
      }
      > span {
        display: inline-block;
        width: 46px;
        height: 46px;
        vertical-align: middle;
        text-align: center;
        background: $--third-background-color;
        border-radius: 50%;
        i {
          line-height: 46px;
          color: $--color-fourth;
        }
      }
      &:last-child > span {
        background: $--secondary-background-color;
        i {
          color: $--color-third;
        }
      }
      i {
        font-size: 22px;
      }
      .result-info-txt {
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        span {
          display: block;
          width: auto;
          max-width: 70px;
          text-align: left;
          color: $--color-text-regular;
          &:last-child {
            font-family: "微软雅黑";
            color: $--color-text-primary;
          }
        }
      }
      &:last-child .result-info-txt span {
        &:last-child {
          cursor: pointer;
          &:hover {
            color: $--color-primary;
          }
        }
      }
    }
  }

  .you-can {
    margin-top: 20px;
    span {
      display: inline-block;
      margin: 0 5px;
      text-align: right;
      height: 14px;
      line-height: 14px;
      &:nth-child(1) {
        width: 112px;
      }
      &:nth-child(n + 2) {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          color: $--color-primary;
        }
      }
    }
  }
}
</style>
