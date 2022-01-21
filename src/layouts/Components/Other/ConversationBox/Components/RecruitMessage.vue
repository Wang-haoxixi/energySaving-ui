<template>
  <div>
    <div
      class="message-tips"
      v-if="[recruitType['1'],recruitType['3']].includes(recruitItem.messageType)||([recruitType['2']].includes(recruitItem.messageType)&&recruitItem.messageDirection===1)"
    >
      <span
        v-if="recruitItem.messageType===recruitType['1']"
      >{{$options.filters.parseDate(recruitItem.sentTime,"HH:mm")}}发起沟通</span>
      <span
        v-else-if="recruitItem.messageType===recruitType['2']"
      >{{recruitItem.content.recruiterTips}}</span>
      <span v-else>{{recruitItem.content.content}}</span>
    </div>
    <div
      class="recruit-box"
      v-else-if="[recruitType['2'],recruitType['4']].includes(recruitItem.messageType)"
      :class="recruitItem.messageDirection===1?'right':'left'"
    >
      <div class="avatar">
        <iep-img :resizeOpt="{l:40}" :src="getAvatar(recruitItem)"></iep-img>
      </div>
      <div class="message-inner">
        <div class="name">{{getName(recruitItem)}}</div>
        <div
          class="invitation-card"
          v-loading="loading"
          v-if="recruitItem.messageType===recruitType['2']"
        >
          <div class="recruit-title">{{recruitItem.content.content}}</div>
          <div class="recruit-name">{{recruitItem.content.name}}</div>
          <div class="recruit-operate">
            <template v-if="deliverStatus==='0'">
              <el-button class="btn" type="primary" plain @click="handleRejectDeliver">拒绝</el-button>
              <el-button class="btn" type="primary" @click="handleAgreeDeliver">同意</el-button>
            </template>
            <template v-else>
              <el-button
                class="btn processed"
                type="default"
                disabled
              >{{deliverStatus==='1'?"已同意":"已拒绝"}}</el-button>
            </template>
          </div>
        </div>
        <div
          class="interview-card"
          v-loading="loading"
          v-else-if="recruitItem.messageType===recruitType['4']"
        >
          <div class="interview-title">
            <iep-img :src="recruitItem.content.soAvatar" :resizeOpt="{l:40}"></iep-img>
            <div
              class="so-name iep-ellipsis-flex"
              :title="recruitItem.content.soName"
            >{{recruitItem.content.soName}}</div>
          </div>
          <div class="interview-content">
            <span>发{{recruitItem.messageDirection===1?"送":"来"}}一份</span>
            <span>面试邀请函</span>
          </div>
          <div class="interview-operate">
            <el-button type="text" @click="handleCheckInterview">立即查看</el-button>
          </div>
        </div>
        <div v-else>{{recruitItem.content.content}}</div>
      </div>
    </div>
    <div v-else>其他消息</div>
    <DialogInterview ref="dialogInterview"></DialogInterview>
    <InfoDialog ref="apply" @callback="AgreeDeliverPartnerCB"></InfoDialog>
  </div>
</template>
<script>
import { recruitType } from "../options";
import { deliveryPosition } from "@/api/dms/recruit_operation";
import { postMsgCustomStatus } from "@/api/ims/rong";
import { getSelectStatus } from "@/api/dms/recruit_deliver";
import { getNoticeDetailsById } from "@/api/dms/recruit";
import { SET_CURRENT_CONVERSATION } from "@/store/modules/imc/mutation-types";
import { mapGetters, mapMutations, mapState } from "vuex";
import DialogInterview from "./DialogInterview";
import InfoDialog from "@/views/channel/recruit/detail/partner/infoDialog";
export default {
  name: "RecruitMessage",
  components: {
    DialogInterview,
    InfoDialog,
  },
  props: {
    recruitItem: {
      type: Object,
      required: true,
    },
    getAvatar: {
      type: Function,
      default: () => {},
    },
    getName: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      recruitType,
      loading: false,
      deliverStatus: 0, // 投递处理状态
    };
  },
  created() {
    this.solveSpecialMessage(this.recruitItem);
  },
  computed: {
    ...mapState({
      currentConversation: state => state.imc.currentConversation,
    }),
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapMutations({
      setCurrentConversation: SET_CURRENT_CONVERSATION,
    }),
    async handleAgreeDeliver() {
      const canType = this.recruitItem.content.canType;
      if (canType === "0") {
        this.AgreeDeliverPosition();
      } else if (canType === "1") {
        this.AgreeDeliverPartner();
      }
    },
    async AgreeDeliverPosition() {
      this.loading = true;
      const params = {
        recruitId: +this.recruitItem.content.recruitId,
        sendNotification: true,
        targeId: +this.recruitItem.content.deliverId,
        senderId: +this.currentConversation.targetId,
      };
      await deliveryPosition(params);
      this.getDeliverStatus(this.recruitItem);
      this.loading = false;
    },
    AgreeDeliverPartner() {
      const params = {
        recruitId: +this.recruitItem.content.recruitId,
        sendNotification: true,
        targeId: +this.recruitItem.content.deliverId,
        senderId: +this.currentConversation.targetId,
      };
      this.$refs.apply.open(params);
    },
    AgreeDeliverPartnerCB() {
      this.getDeliverStatus(this.recruitItem);
    },
    async handleRejectDeliver() {
      this.loading = true;
      const params = {
        dataId: this.recruitItem.content.deliverId,
        targetId: this.currentConversation.targetId,
        notificationType: 1,
        recruitName: this.recruitItem.content.name,
      };
      await postMsgCustomStatus(params);
      this.getDeliverStatus(this.recruitItem);
      this.loading = false;
    },
    solveSpecialMessage(item) {
      if (item.messageType === recruitType[1]) {
        if (item.content.recruitId) {
          // 如果当前会话已经有沟通岗位并且此条消息不是最新岗位就不使用
          if (
            this.currentConversation.recruit &&
            item.sentTime <= this.currentConversation.recruit.sentTime
          )
            return;
          item.content.sentTime = item.sentTime;
          this.$set(this.currentConversation, "recruit", item.content);
          this.setCurrentConversation(this.currentConversation);
        }
      } else if (item.messageType === recruitType[2]) {
        this.getDeliverStatus(item);
      }
    },
    async getDeliverStatus(item) {
      const { data } = await getSelectStatus(item.content.deliverId);
      if (data) {
        this.deliverStatus = data;
      }
    },
    async handleCheckInterview() {
      this.loading = true;
      const { data } = await getNoticeDetailsById(
        this.recruitItem.content.dataId,
      );
      const ref = this.$refs["dialogInterview"];
      ref.isSender = this.recruitItem.messageDirection === 1;
      ref.dialogTitle = data.type === "0" ? "面试邀请函" : "通知";
      ref.data = data;
      ref.dialogShow = true;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.message-tips {
  color: $--color-text-secondary;
  margin-bottom: 5px;
  text-align: center;
}
.recruit-box {
  display: flex;
  &.left {
    flex-direction: row;
    .message-inner {
      align-items: flex-start;
    }
  }
  &.right {
    flex-direction: row-reverse;
    .message-inner {
      align-items: flex-end;
    }
  }
  .avatar {
    margin-top: 10px;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      font-family: "微软雅黑";
      border-radius: $--border-radius-base;
      color: $--color-text-primary;
    }
  }
  .message-inner {
    flex: 1;
    margin: 5px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    .name {
      color: $--color-text-secondary;
      margin-bottom: 5px;
    }
    .invitation-card,
    .interview-card {
      width: 300px;
      height: 200px;
      box-shadow: 0px 0px 10px -7px $--color-primary;
      border-radius: $--border-radius-base;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;
      .recruit-title {
        margin-bottom: 30px;
        font-size: 14px;
      }
      .recruit-name {
        font-size: 20px;
        margin-bottom: 40px;
        padding: 0 20px;
        text-align: center;
        line-height: 22px;
        color: $--color-text-primary;
      }
      .recruit-operate {
        width: 100%;
        height: 50px;
        .btn {
          width: 50%;
          height: 100%;
          margin-left: 0;
        }
        .processed {
          width: 100%;
        }
      }
    }
    .interview-card {
      height: 180px;
      .interview-title {
        width: 90%;
        display: flex;
        align-items: center;
        flex: 1;
        .iep-image {
          width: 40px;
          height: 40px;
        }
        .so-name {
          flex: 1;
          margin-left: 10px;
          font-size: 14px;
        }
      }
      .interview-content {
        height: 50px;
        color: $--color-text-primary;

        span:nth-of-type(2) {
          font-size: 16px;
        }
      }
      .interview-operate {
        border: solid $--border-color;
        border-width: 1px 0 0 0;
        width: 100%;
        .el-button {
          width: 100%;
          height: 50px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>