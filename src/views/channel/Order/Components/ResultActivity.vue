<template>
  <div class="order-container" v-loading="loading">
    <div class="result-wrapper" v-if="isPermit&&resultData.orderStatus==='1'">
      <el-button class="iep-back-btn" type="default" @click="$router.go(-1)">返回</el-button>
      <div class="tip tip-wrap">
        <i class="el-icon-woneng-chenggong2shixin"></i>
        <div v-if="resultData.auditStatus==='0'">购票成功</div>
        <div v-else>报名成功，稍后将由主办方进行审核确认</div>
      </div>
      <div class="content">
        <div class="content-item">
          <div class="label">付款方式：</div>
          <div class="text">
            <div v-if="resultData.paymentMethod==='0'">免费票</div>
            <div v-if="resultData.paymentMethod==='1'">宝贝支付</div>
            <div v-if="resultData.paymentMethod==='2'">微信支付</div>
          </div>
        </div>
        <div class="content-item">
          <div class="label">创建时间：</div>
          <div class="text">{{resultData.orderCreateTime|parseToTimeMinutes}}</div>
        </div>
        <div class="content-item">
          <div class="label">活动名称：</div>
          <div class="text">{{resultData.activityName}}</div>
        </div>
        <div class="content-item">
          <div
            class="text textCenter"
            v-if="+resultData.organizationInvited&&+resultData.orgAddFlag"
          >
            <span>您已成功加入该活动</span>
            <el-tag class="operate" @click="handleGoSo">前往活动圈子</el-tag>
          </div>
          <div class="text textCenter" v-else>
            <span>感谢您的参与</span>
          </div>
        </div>
        <div class="share-box">
          <div>分享此活动给更多好友吧</div>
          <div>
            <el-link :href="shareLink" target="_self">{{shareLink}}</el-link>
          </div>
          <iep-img class="image" :src="qrcodeData"></iep-img>
        </div>
        <el-link class="record" type="primary" @click="handleToRecord">查看报名记录</el-link>
      </div>
    </div>
    <iep-no-data v-else-if="isPermit" message="该订单未支付成功" complex></iep-no-data>
    <iep-no-data v-else message="无权查看TA人订单" complex></iep-no-data>
  </div>
</template>
<script>
import { getAppletsQRCode } from "@/api/admin/social";
import { payCallbackNumber } from "@/api/meetting/ticket";
import { mapGetters, mapActions } from "vuex";
class ResultDTO {
  activityId = 0;
  activityName = "";
  auditStatus = "0";
  activityTime = "";
  enrollId = 0;
  orderCreateTime = "";
  orderStatus = "";
  orgAddFlag = "";
  orgId = 0;
  orgName = "";
  organizationInvited = "";
  paymentMethod = "";
  ticketId = 0;
  ticketingType = "";
}
export default {
  name: "Result",
  data() {
    return {
      qrcodeData: "",
      loading: false,
      isPermit: true,
      resultData: new ResultDTO(),
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    shareLink() {
      const link =
        location.origin +
        "/channel/activity/detail/" +
        this.resultData.activityId;
      return link;
    },
    ...mapGetters(["currentMenuGroup"]),
  },
  methods: {
    ...mapActions(["orgChangeAction"]),
    async getQRCode() {
      const { data } = await getAppletsQRCode(this.resultData.activityId);
      if (data) {
        this.qrcodeData = data;
      }
    },
    async init() {
      this.loading = true;
      const { data } = await payCallbackNumber(this.id);
      if (data) {
        this.resultData = this.$mergeByFirst(new ResultDTO(), data);
        this.getQRCode();
      } else {
        this.isPermit = false;
      }
      this.loading = false;
    },
    async handleGoSo() {
      await this.orgChangeAction(this.resultData.orgId);
      this.$openPage(`/wel/${this.currentMenuGroup.path}`);
    },
    handleToRecord() {
      this.$router.push({
        path: "/my/index/participate",
        query: {
          tabName: "activity",
        },
      });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
@import "../common.scss";
.iep-back-btn {
  align-self: flex-end;
}
.tip-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding-top: 30px;
  i {
    margin-bottom: 15px;
    font-size: 75px;
    color: #3cd489;
  }
  span {
    font-size: 20px;
    font-family: Microsoft YaHei;
    color: #303031;
  }
}
.result-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    .content-item {
      display: flex;
      width: 500px;
      font-size: 14px;
      color: $--color-text-regular;
      margin: 10px 0;
      align-items: center;
      .label {
        width: 180px;
        text-align: right;
      }
      .text {
        flex: 1;
      }
      .operate {
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .share-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      color: $--color-text-regular;
      margin: 30px auto 10px;
      width: 100%;
      background: $--background-color;
      padding: 20px 0;
      div {
        margin-bottom: 10px;
        ::v-deep span {
          color: $--color-text-regular;
        }
      }
      .image {
        width: 100px;
        height: 100px;
      }
    }
    .record {
      align-self: flex-end;
      font-size: 12px;
    }
  }
  .textCenter {
    text-align: center;
  }
}
</style>
