<template>
  <div
    class="msg-container iep-basic-scroll"
    ref="messageScroll"
    style="height:100%;overflow:auto;"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
  >
    <!-- <div class="history" v-if="messageHasMore">
      <el-button type="text" @click="getHistoryMessages">查看历史消息</el-button>
    </div>-->
    <div v-for="(item,index) in messageList" ref="itemBox" :key="item.messageUId">
      <el-divider
        class="time-dividing"
        v-if="timeDividing(item, index)"
      >{{timeDividing(item, index)|parseToDay}}</el-divider>
      <!-- 普通提醒等自定义消息类型正序，滚动正序 -->
      <div class="box">
        <TipMessage
          v-if="messageType===types.TIP"
          class="message"
          :tipItem="item"
          @openExamDialog="openExamDialog"
        ></TipMessage>
        <DealMessage v-else-if="messageType===types.WAIT_DEAL" class="message" :dealItem="item"></DealMessage>
        <SoMessage v-else-if="messageType===types.SO_MESSAGE" class="message" :soItem="item"></SoMessage>
        <CaveatMessage v-else-if="messageType===types.CAVEAT" class="message" :caveatItem="item"></CaveatMessage>
        <div v-else class="message">{{item.text}}</div>
      </div>
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="!messageHasMore">没有更多了</p>
    <ExamViewDialog @finishJumpStartStudy="finishJumpStartStudy" ref="ExamViewDialog"></ExamViewDialog>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import * as types from "../options";
import { parseToDay } from "@/filters/index";
import TipMessage from "./TipMessage";
import DealMessage from "./DealMessage";
import SoMessage from "./SoMessage";
import CaveatMessage from "./CaveatMessage";
import ExamViewDialog from "@/views/exam/examList/Page/Components/ExamViewDialog.vue";
export default {
  components: {
    TipMessage,
    DealMessage,
    SoMessage,
    CaveatMessage,
    ExamViewDialog,
  },
  data() {
    return {
      types,
      scrollFlag: true,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      messageHasMore: (state) => state.imc.messageHasMore,
      messageList: (state) => state.imc.messageList,
      messageType: (state) => state.imc.messageType,
      currentNewMessage: (state) => state.imc.currentNewMessage,
      currentConversation: (state) => state.imc.currentConversation,
      dialogShow: (state) => state.imc.dialogShow,
    }),
    disabled() {
      return this.loading || !this.messageHasMore;
    },
  },
  watch: {
    //消息列表改变时置底
    messageList() {
      if (this.scrollFlag) {
        this.$nextTick(() => {
          this.scrollToTop();
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
      v && this.scrollToTop();
    },
  },
  methods: {
    ...mapMutations({
      setDialogShow: "SET_DIALOGSHOW",
    }),
    ...mapActions(["imcGetMsgHistory"]),
    async load() {
      this.loading = true;
      try {
        await this.imcGetMsgHistory();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
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
    // 滚动条置顶
    scrollToTop() {
      const div = this.$refs.messageScroll;
      this.$nextTick(() => {
        div.scrollTop = 0;
      });
    },
    // 滚动条保持
    scrollKeep() {
      const itemDiv = this.$refs.itemBox;
      const oHeight = itemDiv[itemDiv.length - 1].offsetHeight;
      const scrollDiv = this.$refs.messageScroll;
      scrollDiv.scrollTop = scrollDiv.scrollTop + oHeight + 10;
    },
    openExamDialog(item) {
      this.$refs["ExamViewDialog"].id = item.dataId;
      this.$refs["ExamViewDialog"].dialogShow = true;
    },
    finishJumpStartStudy() {
      this.$refs["ExamViewDialog"].dialogShow = false;
      this.setDialogShow(false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./common";
.msg-container p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
  text-align: center;
  margin: 14px 0;
}
</style>
