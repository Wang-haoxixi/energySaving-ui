<template>
  <div class="so-message">
    <div class="title">
      <div class="sender-box">
        <div class="img">
          <iep-img :src="soItem.senderAvatar" alt />
        </div>
        <div class="content-box">
          <div class="name" :title="soItem.senderName">{{soItem.senderName}}</div>
          <div class="content">
            发布了一则
            <el-link
              class="btn-link"
              type="primary"
              :underline="false"
              @click="handleOpen()"
            >《{{soItem.title}}》</el-link>的通知
          </div>
          <div class="send-time">{{soItem.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    soItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    handleOpen() {
      this.$openPage(`/spa/notice/${this.soItem.id}`);
      this.setDialogShow(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.so-message {
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .sender-box {
      display: flex;
      align-items: flex-start;
      width: 100%;
      .img {
        margin-top: 5px;
        min-width: 36px;
        width: 36px;
        height: 36px;
      }
      .name {
        max-width: 120px;
        min-width: 80px;
        font-size: 12px;
        color: $--color-text-regular;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .send-time {
      min-width: 115px;
      color: $--color-text-secondary;
    }
  }
  .content-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: calc(100% - 56px);
    margin: 0 0 0 20px;
    padding: 10px;
    min-height: 38px;
    font-family: "微软雅黑";
    color: $--color-text-primary;
    background-color: #fff;
    border-radius: $--border-radius-base;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
    .content {
      margin: 5px 0;
      font-size: 14px;
    }
  }
  .content {
    display: flex;
    align-items: center;
    // margin: 0 10px;
    padding: 0 10px 0 0;
    .btn-link {
      font-size: 12px;
    }
  }
}
</style>
