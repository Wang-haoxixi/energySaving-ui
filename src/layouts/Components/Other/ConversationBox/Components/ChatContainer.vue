<template>
  <el-scrollbar ref="messageScroll" style="height: calc(100% - 60px);">
    <div class="history" v-if="messageHasMore">
      <el-button type="text" @click="getHistoryMessages">查看历史消息</el-button>
    </div>
    <div v-for="(item,index) in messageList" ref="itemBox" :key="item.messageUId">
      <el-divider
        class="time-dividing"
        v-if="timeDividing(item, index)"
      >{{timeDividing(item, index)|parseToDay}}</el-divider>
      <!-- 私聊群聊消息倒序 -->
      <div class="box">
        <PersonMessage class="message" :personItem="item"></PersonMessage>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import { mapState, mapActions } from "vuex";
import * as types from "../options";
import { parseToDay } from "@/filters/index";
import PersonMessage from "./PersonMessage";
export default {
  components: {
    PersonMessage,
  },
  data() {
    return {
      types,
      scrollFlag: true,
    };
  },
  computed: {
    ...mapState({
      messageHasMore: state => state.imc.messageHasMore,
      messageList: state => state.imc.messageList,
      messageType: state => state.imc.messageType,
      currentNewMessage: state => state.imc.currentNewMessage,
      currentConversation: state => state.imc.currentConversation,
      dialogShow: state => state.imc.dialogShow,
    }),
  },
  watch: {
    //消息列表改变时置底
    messageList() {
      if (this.scrollFlag) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        this.scrollFlag = false;
      }
    },
    //当前会话收到新消息时上移一点高度
    currentNewMessage() {
      if (!this.scrollFlag) {
        this.$nextTick(() => {
          this.scrollKeep();
        });
      }
    },
    //会话改变时打开置底开关
    currentConversation() {
      this.scrollFlag = true;
    },
    //重新展开聊天时消息置底
    dialogShow(v) {
      v && this.scrollToBottom();
    },
  },
  methods: {
    ...mapActions(["imcGetHistoryMessages"]),
    //获取历史消息
    async getHistoryMessages() {
      this.scrollFlag = false;

      await this.imcGetHistoryMessages();
    },

    //时间线
    timeDividing(item, index) {
      const prop = item.time ? "time" : "sentTime";
      if (index === 0) {
        return item[prop];
      }
      const yestoday = this.messageList[index - 1][prop];
      return parseToDay(item[prop]) !== parseToDay(yestoday)
        ? item[prop]
        : false;
    },
    // 滚动条置底
    scrollToBottom() {
      clearTimeout(this.timer);
      const div = this.$refs.messageScroll.$refs.wrap;
      // div.scrollTop = div.scrollHeight;
      //图片未加载时改变滚动条导致高度错误
      this.timer = setTimeout(() => {
        div.scrollTop = div.scrollHeight;
        clearTimeout(this.timer);
      }, 0);
    },
    // 滚动条保持
    scrollKeep() {
      const itemDiv = this.$refs.itemBox;
      const oHeight = itemDiv[itemDiv.length - 1].offsetHeight;
      const scrollDiv = this.$refs.messageScroll.$refs.wrap;
      scrollDiv.scrollTop = scrollDiv.scrollTop + oHeight + 10;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common";
</style>
