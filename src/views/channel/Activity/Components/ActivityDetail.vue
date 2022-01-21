<template>
  <el-card class="activity-detail">
    <div class="header">
      <div class="info">
        <iep-img :resizeOpt="{l:433}" :src="activity.poster" class="image" />
        <div class="txt-content">
          <div class="title">{{activity.name}}</div>
          <div
            class="time"
          >时间：{{activity.startTime|parseToTimeMinutes}}至{{activity.endTime|parseToTimeMinutes}}</div>
          <div
            class="adress"
            v-if="activity.city||activity.field"
          >地点：{{activity.city}} {{activity.field}}</div>
          <div class="limit">限额：{{activity.limit}}人</div>
          <div class="org">
            <IepPopoverOrgCard :orgId="activity.orgId">
              <span
                class="org-info"
                @click="$openPage(`/channel/styles/so/${activity.orgId}/index`)"
              >
                <iep-img
                  class="org-img"
                  :src="activity.orgAvatar"
                  :alt="activity.orgName"
                  width="30"
                ></iep-img>
                <span class="company-name">{{activity.orgName}}</span>
              </span>
            </IepPopoverOrgCard>
            <template v-if="activity.organizationInvited==='1'">
              <u>|</u>
              <span class="explain">报名后即加入该组织</span>
            </template>
          </div>
        </div>
      </div>
      <el-button class="iep-back-btn" v-if="isHistory" @click="handleBack">返回</el-button>
    </div>
    <div class="ticket item-class">
      <div class="ticket-chioce">
        <div class="sub-title">票种选择</div>
        <div class="tickets">
          <ticket
            v-for="(o,index) of activity.ticketingManagements"
            :key="o.id"
            :ticket="o"
            :isChoose="isChoose(o,index)"
            @click.native="handleChoose(index)"
          ></ticket>
        </div>
      </div>
      <div class="remarks">备注：{{activity.ticketingManagements[choiceIndex].remarks}}</div>
    </div>
    <div class="count item-class">
      <div class="sub-title">订购数量</div>
      <el-input-number
        v-model="num"
        :min="1"
        :max="maxNumber"
        :disabled="!activity.ticketingManagements[choiceIndex].surplus||activity.isTicket==='1'"
        label="订购数量"
      ></el-input-number>
      <div class="tips">该票种单次限购&nbsp;{{limitTicket}}&nbsp;张</div>
    </div>
    <div class="oprate item-class">
      <el-button
        type="primary"
        :disabled="!activity.ticketingManagements[choiceIndex].surplus||activity.isTicket==='1'"
        @click="handleOrder()"
      >我要报名</el-button>
      <div class="opt">
        <span>
          <i class="el-icon-woneng-yanjing1"></i>
          {{activity.browseNum}}
        </span>
        <span @click="handleCollection()">
          <span v-if="activity.collect">
            <i class="el-icon-woneng-xingxingshixin yellow"></i>已收藏
          </span>
          <span v-else>
            <i class="el-icon-woneng-xingxing"></i>收藏
          </span>
        </span>
        <span>
          <i class="el-icon-woneng-jubao1 collect" @click="handleReport"></i>
        </span>
      </div>
    </div>
    <IepDialogMessage ref="IepDialogMessage" title="主办方开启了审核">
      <template slot="desc">报名后需由主办方审核通过, 方可参加活动</template>
      <template slot="button">
        <el-button @click="handleOutputOrder()">继续</el-button>
      </template>
    </IepDialogMessage>
    <IepDialogMessage ref="IepDialogMessage1" title="购票须知">
      <template slot="desc">
        <p>此票种主办方开启了无法退票的设置,</p>
        <p>购买后无法退款哦</p>
      </template>
      <template slot="button">
        <el-button @click="handleOutputOrder()">继续</el-button>
      </template>
    </IepDialogMessage>
  </el-card>
</template>
<script>
// import { collectionById } from "@/api/meetting/publish";
import { createCollection } from "@/api/dms/collection";
import Ticket from "./Ticket";
import { mapMutations } from "vuex";
export default {
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  name: "ActivityDetail",
  components: {
    Ticket,
  },
  data() {
    return {
      num: 1,
      choiceIndex: 0,
    };
  },
  watch: {
    num(v) {
      this.$emit("handleChange", "orderNum", v);
    },
    choiceIndex() {
      this.num = 1;
    },
  },
  computed: {
    isHistory() {
      return history.length - 1;
    },
    limitTicket() {
      const { limitTicket } =
        this.activity.ticketingManagements[this.choiceIndex];
      return limitTicket;
    },
    maxNumber() {
      const { limitTicket, surplus } =
        this.activity.ticketingManagements[this.choiceIndex];
      return Math.min(limitTicket, surplus);
    },
  },
  methods: {
    handleOrder() {
      const ticket = this.activity.ticketingManagements[this.choiceIndex];
      if (!ticket.allowedRefund) {
        this.$refs["IepDialogMessage1"].dialogShow = true;
        return;
      }
      this.handleOrder1();
    },
    handleOrder1() {
      const ticket = this.activity.ticketingManagements[this.choiceIndex];
      if (!ticket.allowedRefund) {
        this.$refs["IepDialogMessage1"].dialogShow = true;
        return;
      }
      this.handleOutputOrder();
    },
    handleOutputOrder() {
      if (this.num) {
        this.$emit("handleOrder");
      } else {
        this.$message.warning("购票数量不能为空");
      }
    },
    handleChoose(index) {
      this.choiceIndex = index;
    },
    isChoose(item, index) {
      if (index === this.choiceIndex) {
        this.$emit("handleChange", "ticketingId", item.id);
        return true;
      }
      return false;
    },
    async handleCollection() {
      // if (!isCollect) {
      const { data } = await createCollection({
        targetId: this.activity.id,
        type: 5,
        name: this.activity.name,
      });
      if (data) {
        this.$message.success("收藏成功！");
        this.$emit("loadPage");
      }
      // }
    },
    handleBack() {
      this.$router.go(-1);
    },
    // 举报
    ...mapMutations({
      openReportDialog: "OPEN_REPORT_DIALOG",
    }),
    handleReport() {
      this.openReportDialog({ id: this.activity.id, type: 11 });
    },
  },
};
</script>
<style lang="scss" scoped>
.activity-detail {
  overflow: inherit;
  ::v-deep .el-card__body {
    padding-right: 30px;
    overflow: inherit;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .iep-back-btn {
      &:hover,
      &:focus {
        border-color: $--border-color;
        background-color: $--background-color;
        color: $--color-text-primary;
      }
    }
  }
  .info {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    .image {
      margin-top: -40px;
      margin-left: -40px;
      width: 433px;
      height: 260px;
      border-radius: 10px;
      border: 1px solid #eff0f1;
      background: #ffffff;
    }
    .txt-content {
      margin-left: 25px;
      .title {
        margin-bottom: 25px;
        font-size: 24px;
      }
      .time,
      .adress,
      .limit {
        margin-bottom: 15px;
        font-size: 14px;
        color: #666769;
      }
      .org {
        display: flex;
        align-items: center;
        margin-top: 15px;
        font-size: 14px;
        .org-info {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .org-img {
          margin-right: 15px;
          width: 30px;
          height: 30px;
          border-radius: 5px;
          border: 1px solid #eff0f1;
        }
        .explain {
          color: #666769;
        }
        u {
          display: inline-block;
          margin: 0 15px;
          vertical-align: middle;
          color: #eff0f1;
        }
      }
    }
  }
  .item-class {
    .sub-title {
      margin-right: 25px;
    }
    .tips {
      margin-left: 25px;
      font-size: 14px;
      color: $--color-input-regular;
    }
  }
  .ticket {
    .ticket-chioce {
      display: flex;
      align-items: center;
    }
    .tickets {
      display: flex;
      box-sizing: border-box;
    }
    .remarks {
      margin: 15px 0 15px 90px;
      font-size: 14px;
      color: $--color-primary;
    }
  }
  .count {
    margin-top: 30px;
    display: flex;
    align-items: center;
    ::v-deep .el-input-number {
      width: 140px;
      height: 36px;
      line-height: 36px;
      .el-input,
      .el-input__inner {
        height: 36px;
        line-height: 34px;
        font-size: 16px;
        background-color: #fff;
      }
      .el-input-number__decrease {
        margin-right: -1px;
      }
      .el-input-number__increase {
        margin-left: -1px;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        width: 36px;
        height: 34px;
        font-size: 16px;
        line-height: 34px;
        background-color: #fff;
        color: $--color-text-secondary;
        border-color: #eff0f1;
        i {
          color: $--color-text-secondary;
        }
      }
      .is-disabled {
        i {
          color: $--color-input-regular;
        }
      }
    }
  }
  .oprate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    ::v-deep .el-button {
      margin-left: 89px;
      padding: 12px 25px;
      font-size: 16px;
      text-align: center;
      // background: #f74437;
      background: $--color-primary;
      border-radius: 10px;
      color: #fff;
    }
    .opt {
      span {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        color: $--color-text-regular;
        &:hover {
          opacity: 0.7;
        }
        &:nth-child(2),
        &:nth-child(3) {
          margin-left: 40px;
          cursor: pointer;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
          font-size: 20px;
          color: $--color-text-secondary;
        }
      }
      .yellow {
        color: $--color-fourth;
      }
    }
  }
}
</style>
