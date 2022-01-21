<template>
  <div class="tip-message">
    <div class="title">
      <div class="sender-box">
        <div class="img">
          <iep-img :src="showTypeAvatar[CAVEAT]" :alt="caveatItem.title" />
        </div>
        <div class="content-box">
          <div class="content">
            <div class="name">{{caveatItem.title}}</div>
            <div class="sub-title" v-html="contentSolve(caveatItem.text)"></div>
            <div class="send-time">{{caveatItem.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import currentMixin from "../mixins/mixin";
import { showTypeAvatar, CAVEAT } from "../options";
export default {
  mixins: [currentMixin],
  props: {
    caveatItem: {
      type: Object,
      required: true,
    },
  },
  inject: ["reload"],
  data() {
    return {
      opt: "el-icon-woneng-yidu1",
      color: "gray",
      showTypeAvatar,
      CAVEAT,
    };
  },
};
</script>
<style lang="scss" scoped>
.tip-message {
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
        font-size: 12px;
        color: $--color-text-regular;
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
    color: $--color-text-primary;
    background-color: #fff;
    border-radius: $--border-radius-base;
    box-sizing: border-box;
  }
  .content {
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
    .sub-title {
      margin: 5px 0;
    }
  }
  .red {
    color: $--color-primary;
  }
  .gray {
    color: #babec0;
  }
}
</style>
