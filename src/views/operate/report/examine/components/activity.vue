<template>
  <iep-basic-container class="examine-container">
    <div class="poster-item">
      <div class="poster-head">
        <div class="poster-title">{{data.name}}</div>
        <div class="poster-detail">
          <div class="poster-detail-item">
            <span>时间：</span>
            {{data.startTime}}至{{data.endTime}}
          </div>
          <div class="poster-detail-item">
            <span>地点：</span>
            {{data.city}} {{data.field}}
          </div>
          <div class="poster-detail-item">
            <span>限额：</span>
            {{totalNumber}}人
          </div>
          <div class="poster-detail-item">
            <span>组织：</span>
            {{data.orgName}}
          </div>
          <div class="poster-detail-item">
            <span>发布者：</span>
            {{data.createByName}}
          </div>
          <div class="poster-detail-item">
            <span>组织邀请开放状态：</span>
            {{data.organizationInvited === "1" ? "开放" : "关闭"}}
          </div>
        </div>
      </div>
      <div class="poster-img">
        <iep-img :src="data.poster" class="poster"></iep-img>
      </div>
    </div>
    <div class="ticket-wrapper">
      <div class="ticket-wrapper-title">票种选择</div>
      <div class="ticket-wrapper-list">
        <div class="ticket-list">
          <div
            v-for="ticket in data.ticketingManagements"
            :key="ticket.id"
            class="ticket-item"
            @click="selectTicket(ticket)"
          >
            <div class="wrap">
              <span
                class="ticket-item-type"
                :class="{'type-free': ticket.ticketingType === '1'}"
              >{{ticket.ticketingType === "1" ? "免费票" : "付费票"}}</span>
              <span class="ticket-item-title">{{ticket.ticketingName}}</span>
            </div>
            <div class="ticket-item-detail">
              <div class="ticket-item-detail-type">
                <span v-if="ticket.ticketingType === '2'">{{getMoney(ticket)}}</span>
              </div>
              <div class="ticket-item-detail-number">
                <span class="ticket-item-detail-number-info">余：</span>
                <span class="ticket-item-detail-number-surplus">{{ticket.surplus}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tags-box"></div>
    <div class="detail-wrapper">
      <div class="detail-wrapper-title">活动内容</div>
    </div>
    <div>
      <div class="detail-wrapper-info">
        <div class="detail-left">
          <div class="detail-left-details" v-html="data.details"></div>
        </div>
      </div>
    </div>
  </iep-basic-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    totalNumber() {
      let total = 0;
      if (this.data.ticketingManagements) {
        for (let i = 0; i < this.data.ticketingManagements.length; i++) {
          total += this.data.ticketingManagements[i].number;
        }
      }
      return total;
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.poster-item {
  display: flex;
  .poster-head {
    width: calc(100% - 220px);
    min-width: 500px;
    .poster-title {
      font-family: "微软雅黑";
      color: $--color-text-primary;
      font-size: 24px;
      line-height: 30px;
    }
    .poster-detail {
      margin-top: 10px;
      color: $--color-text-regular;
      font-size: 14px;
      line-height: 26px;
      .poster-detail-item span {
        color: #777;
      }
    }
  }
  .poster-img {
    width: 200px;
    height: 200px;
  }
}
.ticket-wrapper {
  position: relative;
  .ticket-wrapper-title {
    width: 10%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }
  .ticket-wrapper-list {
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
    .ticket-list {
      margin-top: -20px;
    }
    .ticket-item {
      transition: all 0.3s;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 286px;
      border-radius: 4px;
      border: 1px #eff0f1 solid;
      padding: 15px;
      cursor: pointer;
      .wrap {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .ticket-item-type {
        background-color: #eea366;
        color: #ffffff;
        font-size: 12px;
        padding: 0px 12px;
        border-radius: $--large-border-radius;
        &.type-free {
          background-color: #74c676;
        }
      }
      .ticket-item-detail {
        margin: 3px 0 3px 0;
        color: #e25055;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        .ticket-item-detail-type {
          color: #e25055;
        }
        .ticket-item-detail-number {
          font-size: 14px;
          .ticket-item-detail-number-info {
            color: $--color-text-secondary;
          }
          .ticket-item-detail-number-surplus {
            font-family: "微软雅黑";
            color: $--color-text-primary;
          }
        }
      }
    }
  }
}
.tags-box {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.tags-box ::v-deep .el-tag {
  margin-right: 5px;
}
.detail-wrapper {
  margin-top: 30px;
  font-family: "微软雅黑";
  color: $--color-text-primary;
  font-size: 20px;
  line-height: 36px;
  border-bottom: 1px solid $--border-color;
  display: flex;

  .detail-wrapper-title {
    font-size: 18px;
    line-height: 35px;
  }
  .detail-wrapper-info {
    display: flex;
    .detail-left-details {
      padding: 15px 0 25px;
    }
  }
}
</style>
