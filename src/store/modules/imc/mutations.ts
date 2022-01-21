import * as types from './mutation-types';
import { ImcState } from './types';

export default {
  [types.SET_CONVERSATION_LIST](state: ImcState, conversationList: []) {
    state.conversationList = conversationList;
  },
  [types.SET_CURRENT_CONVERSATION](state: ImcState, currentConversation: any) {
    state.currentConversation = currentConversation;
  },
  [types.SET_MESSAGE_LIST](state: ImcState, messageList: []) {
    state.messageList = messageList;
  },
  [types.SET_MESSAGE_HAS_MORE](state: ImcState, messageHasMore: boolean) {
    state.messageHasMore = messageHasMore;
  },
  [types.SET_USER_INFO_MAP](state: ImcState, infoMap: any) {
    state.infoMap = infoMap;
  },
  [types.SET_CURRENT_NEW_MESSAGE](state: ImcState, currentNewMessage: any) {
    state.currentNewMessage = currentNewMessage;
  },
  [types.SET_CURRENT](state: ImcState, current: number) {
    state.current = current;
  },
  [types.SET_CUSTOM_MSG_PAGE](state: ImcState, func: any) {
    state.customMsgPage = func;
  },
  [types.SET_IS_CUSTOM](state: ImcState, isCustom: boolean) {
    state.isCustom = isCustom;
  },
  [types.SET_MESSAGE_TYPE](state: ImcState, messageType: string) {
    state.messageType = messageType;
  },
  [types.SET_MSG_LOADING](state: ImcState, msgLoading: boolean) {
    state.msgLoading = msgLoading;
  },
  [types.SET_DIALOGSHOW](state: ImcState, dialogShow: boolean) {
    state.dialogShow = dialogShow;
  },
  [types.SET_TOTALUNREADCOUNT](state: ImcState, totalUnreadCount: number) {
    state.totalUnreadCount = totalUnreadCount;
  },
  [types.SET_EMOJILIST](state: ImcState, emojiList: any[]) {
    state.emojiList = emojiList;
  },
  [types.SET_NOTIFYFLAG](state: ImcState, notifyFlag: boolean) {
    state.notifyFlag = notifyFlag;
  },
  [types.SET_RONGIM_DISABLE](state: ImcState, rongIMDisable: boolean) {
    state.rongIMDisable = rongIMDisable;
  },
  [types.SET_MESSAGE_CONTENT](state: ImcState, messageContent: string) {
    state.messageContent = messageContent;
  },
};
