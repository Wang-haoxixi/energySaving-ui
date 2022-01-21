import { ImcState } from "./types";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const appkey = process.env.VUE_APP_RONG_APP_KEY || '82hegw5u8vy3x';

const imcState: ImcState = {
  // 融云IM库
  rongIMLib: window.RongIMLib,
  // IM 初始化
  imClient: window.RongIMLib.init({
    appkey,
  }),
  conversationList: [],
  currentConversation: {},
  isCustom: true,
  messageList: [],
  messageHasMore: false,
  // 自定义消息
  current: 1,
  customMsgPage: () => { },
  messageType: '',
  // 用户名和头像
  infoMap: {},
  // 当前会话收到的最新消息
  currentNewMessage: {},
  // 加载中
  msgLoading: false,
  // 弹框
  dialogShow: false,
  //未读消息总数
  totalUnreadCount: 0,
  //emoji库
  emojiList: [],
  //通知flag
  notifyFlag: true,
  //融云加载失败会话禁用
  rongIMDisable: true,
  messageContent: '',
};
export default imcState;
