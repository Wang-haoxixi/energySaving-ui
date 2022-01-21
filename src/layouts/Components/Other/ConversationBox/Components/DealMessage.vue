<template>
  <div class="deal-message">
    <div class="wrapper">
      <div class="img">
        <iep-img :src="dealItem.senderAvatar"></iep-img>
      </div>
      <div class="text">
        <div class="name">
          <span class="type">待处理</span>
          {{dealItem.senderName}}
        </div>
        <div class="content">{{dealItem.text}}</div>
      </div>
    </div>
    <div class="operate" v-show="!dealItem.isDeal">
      <el-button icon="el-icon-right" @click="handleShow()">去处理</el-button>
      <iep-dialog :dialog-show="dialogShow" title="查看详情" width="500px" @close="_close()">
        <iep-input-area v-model="content" placeholder disabled></iep-input-area>
        <template slot="footer">
          <el-button type="primary" :loading="isLoad" @click="handleProcess(true)">通过</el-button>
          <el-button :loading="isLoad" @click="handleProcess(false)">拒绝</el-button>
        </template>
      </iep-dialog>
    </div>
    <div class="operate" v-show="dealItem.isDeal">
      <span class="deal">已处理</span>
    </div>
  </div>
</template>
<script>
import { passMessageById, rejectMessageById } from "@/api/ims/message";

import { getDealInfoById } from "@/api/ims/app";
import { mapActions } from "vuex";
export default {
  props: {
    dealItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoad: false,
      dialogShow: false,
      content: "",
    };
  },
  methods: {
    ...mapActions(["imcRefreshMsg"]),
    async handleShow() {
      const { data } = await getDealInfoById(this.dealItem.id);
      this.content = data.remarks;
      this.dialogShow = true;
    },
    _close() {
      this.dialogShow = false;
    },
    async handleProcess(isOk = true) {
      const func = isOk ? passMessageById : rejectMessageById;
      try {
        this.isLoad = true;
        await func(this.dealItem.id);
        this._close();
      } catch (error) {
        console.log(error);
      } finally {
        this.imcRefreshMsg();
        this.isLoad = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.deal-message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .wrapper {
    display: flex;
    .img {
      width: 42px;
      height: 42px;
      border-radius: $--border-radius-base;
      border: 1px solid $--border-color;
      background-color: #fff;
    }
    .name {
      font-size: 14px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
    }
    .text {
      position: relative;
      margin: 0 10px 0 20px;
      padding: 10px;
      min-height: 38px;
      font-family: "微软雅黑";
      color: $--color-text-primary;
      background-color: #fff;
      border-radius: $--border-radius-base;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &::before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        left: -7px;
        top: 2px;
        border-width: 0 4px 10px 0;
        border-style: solid;
        border-right-color: transparent;
        border-bottom-color: #fff;
        border-bottom-left-radius: 30px;
      }
    }
  }
  .deal {
    color: $--color-text-regular;
  }
}
</style>
