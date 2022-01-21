<template>
  <iep-dialog :dialog-show="dialogShow" :title="dialogTitle" width="400px" @close="_close()">
    <div class="top-box" @click="handleJump">
      <template v-if="isSender">
        <iep-img :src="data.receiveAvatar" :resizeOpt="{l:40}"></iep-img>
        <div class="org-name iep-ellipsis-flex">{{data.receiveName}}</div>
        <i class="el-icon-woneng-arrowright"></i>
      </template>
      <template v-else>
        <iep-img :src="data.orgAvatar" :resizeOpt="{l:40}"></iep-img>
        <div class="org-name iep-ellipsis-flex">{{data.orgName}}</div>
        <i class="el-icon-woneng-arrowright"></i>
      </template>
    </div>
    <div class="card-box">
      <div class="card-content">{{data.content}}</div>
      <div class="card-other">
        <h3>{{trantfName(data.recruitName)}}</h3>
        <div class="time">面试时间：{{trantfTime(data.invitationTime)}}</div>
        <div class="place">面试地点：{{data.address}}</div>
      </div>
    </div>
    <div class="btn-group" slot="footer" v-loading="loading">
      <template v-if="data.state==='0'">
        <template v-if="isSender">
          <span class="state">待处理</span>
        </template>
        <template v-else>
          <el-button type="default" @click="handleSolveInterview(2)">拒绝</el-button>
          <el-button type="primary" @click="handleSolveInterview(1)">确认到现场面试</el-button>
        </template>
      </template>
      <template v-else>
        <span class="state">{{data.state==='1'?'已接受':'已拒绝'}}</span>
      </template>
    </div>
  </iep-dialog>
</template>
<script>
import { updateNoticeState } from "@/api/dms/recruit";
import { mapMutations } from "vuex";

const dataDefault = () => ({
  id: 0,
  recruitName: "",
  recruitId: 0,
  orgId: 0,
  state: "0",
  stateName: "待处理",
  invitationTime: "",
  senderId: 0,
  receiveId: 0,
  orgName: "",
  orgAvatar: "",
  receiveName: "",
  receiveAvatar: "",
  latitude: 0,
  longitude: 0,
  address: "",
  type: "0",
  theme: "",
  content: "",
});
export default {
  data() {
    return {
      dialogShow: false,
      dialogTitle: "面试邀请函",
      data: dataDefault(),
      isSender: true,
      loading: false,
    };
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    _close() {
      this.dialogShow = false;
    },
    trantfName(val) {
      const list = val.split("-");
      return list[list.length - 1];
    },
    trantfTime(val) {
      return this.$options.filters.parseDate(val, "M月D日 HH:mm");
    },
    handleJump() {
      this._close();
      this.setDialogShow(false);
      if (this.isSender) {
        this.$openPage(`/channel/styles/user/${this.data.receiveId}/index`);
      } else {
        this.$openPage(`/channel/styles/so/${this.data.orgId}/index`);
      }
    },
    async handleSolveInterview(state) {
      this.loading = true;
      await updateNoticeState({
        id: this.data.id,
        state,
      });
      this._close();
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.top-box {
  display: flex;
  align-items: center;
  cursor: pointer;
  .iep-image {
    width: 40px;
    height: 40px;
  }
  .org-name {
    flex: 1;
    margin: 0 10px;
  }
}
.card-box {
  margin-top: 20px;
  border: 1px solid $--border-color;
  border-radius: $--border-radius-base;
  padding: 20px;
  overflow: hidden;
  .card-content {
    margin-bottom: 20px;
  }
  .card-other {
    background: $--background-color;
    padding: 20px;
    border-radius: $--border-radius-base;
    overflow: hidden;
    text-align: center;
    h3 {
      font-weight: 900;
      color: $--color-text-secondary;
      font-size: 18px;
    }
  }
}
.btn-group {
  .state {
    color: $--color-input-regular;
  }
}
</style>