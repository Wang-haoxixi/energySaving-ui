// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
// import { clearUnread } from '@/api/im'
import {
  mapGetters,
} from "vuex";

export default {
  data() {
    return {
      chatList: [],
      socket: null,
      stompClient: null,
      receiver: { // 小能账号
        userId: 0,
        username: "serve",
        realName: "小能",
        avatar: "/img/ics/ican.png",
        type: 2,
      },
    };
  },
  computed: {
    // ...mapState({
    //   responseMsg: state => state.im.responseMsg,
    // }),
    ...mapGetters(
      ["imCurrentChat", "userInfo", "imGroups"],
    ),
  },
  methods: {
    handleSentMsg() {
      if (!this.question) return;
      // 连接聊天对象
      const data = JSON.stringify({
        msg: this.question,
        type: this.receiver.type,
        msgType: 1,
        msgCode: new Date().getTime(),
      });
      console.log("receiver: ", this.receiver, this.userInfo.userId);
      console.log(`/unicast/mcs_${this.receiver.userId}/${this.userInfo.userId}-${this.receiver.userId}`, data);
      this.stompClient.send(`/unicast/mcs_${this.receiver.userId}/${this.userInfo.userId}-${this.receiver.userId}`, {}, data);
      // 对话框操作
      this.list.push({
        avatar: this.userInfo.avatar,
        type: "question",
        content: this.question,
      });
      this.scrollBottom();
      this.question = "";
    },
    connection() {
      console.log("长链接中断");
    },
  },
  watch: {
    // responseMsg (val) {
    //   if (this.isArtificial) {
    //     if (val.userId === this.receiver.userId && val.sendOrReceive === 1) {
    //       this.list.push({
    //         type: "answer",
    //         answer: val.message,
    //         options: [],
    //       });
    //       this.scrollBottom();
    //     }
    //   }
    // },
  },
  created() {

  },
};
