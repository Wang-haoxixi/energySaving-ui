<template>
  <div class="process-wrapper">
    <div class="order-process left">
      <div class="order-number">订单号：{{form.orderNumber}}</div>
      <div
        class="order-status"
        :style="{color:orderStatus(form.status).color}"
      >{{orderStatus(form.status).label}}</div>
      <div class="remain-time" v-if="!form.finishTime&&['0'].includes(form.status)">
        <i class="el-icon-woneng-shijian"></i>
        <span>剩余时间：{{deadLine}}</span>
      </div>
      <div class="org">
        <span class="org-name iep-ellipsis-flex" :title="form.orgName">组织：{{form.orgName}}</span>
        <el-button class="blue" type="text" @click="handleDdvisory()">联系商家</el-button>
      </div>
      <div class="btn-group">
        <el-button type="primary" @click="handlePay" v-if="form.status==='0'">立即付款</el-button>
        <el-button @click="handleCancel" v-if="form.status==='0'">取消订单</el-button>
        <el-button type="primary" @click="handleRebuy" v-if="form.status==='2'">重新购买</el-button>
        <!-- <el-button type="primary" @click="handleEvalu" v-if="form.status==='1'">评价</el-button> -->
      </div>
    </div>
    <div class="order-process right">
      <span v-if="form.status==='0'">该订单会为您保留2小时（从下单之日算起），超出时间，系统将自动取消该订单</span>
      <span v-else-if="form.status==='2'">您的订单已取消</span>
      <span v-else-if="['1'].includes(form.status)">{{thanksByOrderType[form.orderType]}}</span>
      <el-steps :active="stepValue" align-center v-if="form.status!=='2'">
        <el-step title="提交订单" icon="el-icon-woneng-file-survey" :description="form.createTime"></el-step>
        <el-step title="付款成功" icon="el-icon-woneng-caiwu11" :description="form.finishTime"></el-step>
        <el-step title="完成" icon="el-icon-woneng-chenggong2" :description="form.finishTime"></el-step>
      </el-steps>
      <div class="order-cancel" v-else>
        <i class="el-icon-woneng-baojing"></i>
        <span>交易关闭</span>
        <span>关闭类型：{{dictsMap.cancelType[form.cancelType]}}</span>
      </div>
    </div>
    <IepDialogReqJoinSo ref="IepDialogReqJoinSo" @load-page="loadPage()"></IepDialogReqJoinSo>
  </div>
</template>
<script>
import { dictsMap, statusColor, jumpPath, thanksByOrderType } from "../options";
import operationMixins from "@/mixins/operationMixins";
import { cancelMyOrder } from "@/api/fms/order";
import { mapActions } from "vuex";
import { getUserHadList } from "@/api/admin/org";
import { applyOrg } from "@/api/admin/org";

import moment from "moment";
export default {
  name: "OrderProcess",
  mixins: [operationMixins],
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dictsMap,
      thanksByOrderType,
      deadLine: "",
      timer: null,
    };
  },
  computed: {
    stepValue() {
      if (this.form.status === "0") {
        return 1;
      } else if (this.form.status === "1") {
        return 3;
      } else {
        return 0;
      }
    },
  },
  methods: {
    orderStatus(status) {
      const obj = {
        label: dictsMap.status[status] || "暂无",
        value: status,
        color: statusColor[status] || "#666769",
      };
      return obj;
    },
    countdown({ finishTime, createTime }) {
      if (!finishTime) {
        const end = moment(createTime).add(2, "hours");
        let duration = null;
        let formatted;
        const fn = () => {
          formatted = "";
          duration = moment.duration(end.diff(moment()));
          duration.hours() && (formatted += duration.hours() + "时");
          duration.minutes() && (formatted += duration.minutes() + "分");
          duration.seconds() && (formatted += duration.seconds() + "秒");
          if (duration._milliseconds <= 0) {
            clearInterval(this.timer);
            this.deadLine = "已过期";
            return;
          }
          this.deadLine = formatted;
        };
        fn();
        this.timer = setInterval(fn, 1000);
      }
    },
    handlePay() {
      this.$openPage(`/channel/order/${this.form.orderNumber}/pay`);
    },
    handleCancel() {
      this._handleComfirm(this.form.orderNumber, cancelMyOrder, "取消订单");
    },
    handleRebuy() {
      if (jumpPath[this.form.orderType]) {
        const path =
          jumpPath[this.form.orderType] +
          (this.form.orderType === "1"
            ? this.form.goodsId
            : this.form.activityId);
        this.$openPage(path);
      } else {
        this.$message({ message: "订单类型错误", type: "info" });
      }
    },
    // handleEvalu() {
    // },
    loadPage() {
      this.$emit("loadPage");
    },
    ...mapActions(["imcOpenConversionByTargetId"]),
    _handleSendMsg(orgId) {
      this.imcOpenConversionByTargetId({
        targetId: orgId + "",
        type: 3,
      });
    },
    async handleDdvisory() {
      const { data } = await getUserHadList();
      const orgIds = data.map((m) => m.orgId);
      const { orgId, isExempt } = this.form;
      if (orgIds.includes(orgId)) {
        this._handleSendMsg(orgId);
      } else {
        if (isExempt) {
          const { data } = await applyOrg({ orgId });
          if (data) {
            this._handleSendMsg(orgId);
            setTimeout(() => {
              this.$message("已加入该组织，并跳转到群聊中");
            }, 500);
          }
        } else {
          this.$refs["IepDialogReqJoinSo"].orgId = orgId;
          this.$refs["IepDialogReqJoinSo"].dialogShow = true;
          setTimeout(() => {
            this.$message("该组织需要发起验证申请！");
          }, 500);
        }
      }
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.process-wrapper {
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  display: grid;
  grid-template-columns: 320px 1fr;
  .order-process {
    padding: 30px;
    font-size: 14px;
  }
  .left {
    border-right: 1px solid $--border-color;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    // .order-number {
    // }
    .order-status {
      margin-top: 10px;
      font-size: 18px;
    }
    .remain-time {
      margin-top: 5px;
      color: $--color-input-regular;
      i {
        margin-right: 5px;
      }
    }
    .org {
      margin-top: 5px;
      display: flex;
      .el-button {
        margin-left: 10px;
      }
      .org-name {
        flex: 1;
        line-height: 34px;
      }
    }
    .btn-group {
      margin-top: 10px;
    }
  }
  .right {
    .el-steps {
      margin-top: 50px;
      ::v-deep .is-process {
        color: #c0c4cc;
        border-color: #c0c4cc;
        font-weight: 500;
      }
      ::v-deep .el-step__title {
        font-size: 14px;
      }
      ::v-deep .is-finish {
        &.el-step__title {
          color: $--color-text-regular;
        }
        &.el-step__description {
          color: $--color-input-regular;
        }
      }
    }
    .order-cancel {
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 60px;
        color: $--color-primary;
        margin-top: 10px;
      }
      span {
        margin-top: 10px;
        &:last-of-type {
          color: $--color-input-regular;
        }
      }
    }
  }
}
.blue {
  color: $--color-secondary;
}
</style>
