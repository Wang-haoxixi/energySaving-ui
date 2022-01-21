import { ActionContext } from 'vuex';
import { Message } from 'element-ui';
import * as types from './mutation-types';
import { RootState } from '@/store/types';
import { getInfoById } from '@/api/admin/app';
import { getMsgPageById } from '@/api/ims/app';
import { baseInfoMap, createNotification } from './base';
import { ImcState, ConversationItem, errorCode, ImcError } from './types';
import { isCustomTypes, msgType, typeList, recruitTypeList } from '@/layouts/Components/Other/ConversationBox/options';

/**
 * 删除会话
 * @param param0
 * @param item 该会话
 */
export const imcDelConversationById = ({ state, commit, dispatch }: ActionContext<ImcState, RootState>, item: any) => {
  const { imClient, currentConversation } = state;
  const conversation = imClient.Conversation.get({
    targetId: item.targetId,
    type: item.type,
  });
  conversation.destory().then(function () {
    // console.log('删除会话成功');
    if (currentConversation.targetId === item.targetId) {
      commit(types.SET_CURRENT_CONVERSATION, {});
      commit(types.SET_IS_CUSTOM, true);
    }
    dispatch("imcClearUnreadCount", item);
    dispatch('imcGetConversationList');
  });
};

/**
 * 发送消息
 * @param param0
 * @param content
 */
export const imcSendMessage = ({ state, commit }: ActionContext<ImcState, RootState>, { content, type }: { content: string, type: string }) => {
  const { imClient, currentConversation, rongIMLib, messageList } = state;
  const conversationInstance = imClient.Conversation.get({
    targetId: currentConversation.targetId,
    type: currentConversation.type,
  });
  let conversationOptions = {};
  switch (type) {
    case msgType[1]:
      conversationOptions = {
        messageType: rongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
        content: {
          content, // 文本内容
        },
      };
      break;
    case msgType[2]:
      conversationOptions = {
        messageType: rongIMLib.MESSAGE_TYPE.IMAGE,  // 'RC:ImgMsg'
        content, // 图片内容
      };
      break;
    default:
      break;
  }
  conversationInstance.send(conversationOptions).then((message: any) => {
    messageList.push(message);
    commit(types.SET_MESSAGE_LIST, messageList);
  }).catch((err: ImcError) => {
    Message.warning(errorCode[err.code]);
    // console.log(err);
  });
};

/**
 * 自定义消息获取历史消息
 * @param param0
 */
export const imcGetMsgHistory = async ({ state, commit }: ActionContext<ImcState, RootState>) => {
  commit(types.SET_MSG_LOADING, true);
  commit(types.SET_CURRENT, state.current + 1);
  const { data } = await state.customMsgPage({ current: state.current });
  // 设置消息列表
  const list = [...state.messageList, ...data.records];
  commit(types.SET_MESSAGE_LIST, list);

  // 设置是否更多消息
  const hasMore = data.total - data.current * data.size > 0; // 是否还有历史消息可以获取
  commit(types.SET_MESSAGE_HAS_MORE, hasMore);

  // 设置当前页码
  commit(types.SET_CURRENT, data.current);
  commit(types.SET_MSG_LOADING, false);
};

/**
 * 重新刷新自定义消息
 * @param param0
 */
export const imcRefreshMsg = async ({ state, commit }: ActionContext<ImcState, RootState>) => {
  commit(types.SET_MSG_LOADING, true);
  commit(types.SET_IS_CUSTOM, true);
  commit(types.SET_CURRENT, 1);
  const { data } = await state.customMsgPage();
  // 设置消息列表
  const list = data.records;
  commit(types.SET_MESSAGE_LIST, list);

  // 设置是否更多消息
  const hasMore = data.total - data.current * data.size > 0; // 是否还有历史消息可以获取
  commit(types.SET_MESSAGE_HAS_MORE, hasMore);

  // 设置当前页码
  commit(types.SET_CURRENT, data.current);
  commit(types.SET_MSG_LOADING, false);
};

/**
 * 获取自定义会话消息
 * @param param0
 * @param item 会话
 */
export const imcGetMsg = async ({ commit, dispatch, state }: ActionContext<ImcState, RootState>, item: ConversationItem) => {
  commit(types.SET_CURRENT_CONVERSATION, item);
  const { currentConversation } = state;
  commit(types.SET_MESSAGE_TYPE, item.targetId);
  const getMsgPage = getMsgPageById(item.latestMessage.content.id);
  commit(types.SET_CUSTOM_MSG_PAGE, getMsgPage);
  await dispatch('imcRefreshMsg');
  if (currentConversation.unreadMessageCount) {
    dispatch("imcClearUnreadCount", currentConversation);
  }
};

/**
 * 获取会话实例
 * @param param0
 * @param targetId
 */
export const imcGetConversation = ({ state, commit, dispatch }: ActionContext<ImcState, RootState>, item: ConversationItem) => {
  // 注: imClient 实例通过 RongIMLib.init 获取(单个页面仅需初始化一次)
  commit(types.SET_MSG_LOADING, true);
  commit(types.SET_CURRENT_CONVERSATION, item);
  const { imClient, currentConversation } = state;
  const conversationInstance = imClient.Conversation.get({
    targetId: currentConversation.targetId,
    type: currentConversation.type,
  });
  // 获取未读条数的历史消息;
  const option = {
    timestrap: +new Date(),
    count: currentConversation.unreadMessageCount || 1,
  };
  conversationInstance.getMessages(option).then(function (result: any) {
    const list = result.list; // 历史消息列表
    commit(types.SET_MESSAGE_LIST, list);
    const hasMore = result.hasMore; // 是否还有历史消息可以获取
    commit(types.SET_MESSAGE_HAS_MORE, hasMore);
    // 避免出现content undefault
    commit(types.SET_IS_CUSTOM, false);
    commit(types.SET_MSG_LOADING, false);
  });
  // 清楚当前会话未读数
  if (currentConversation.unreadMessageCount) {
    dispatch("imcClearUnreadCount", currentConversation);
  }
};

/**
 * 获取最新的最多 n 会话列表
 * @param param0
 * @param count 获取最多列表数目
 */
export const imcGetConversationList = ({ state, commit, dispatch }: ActionContext<ImcState, RootState>, count = undefined) => {
  const { imClient } = state;
  const option = { count };
  imClient.Conversation.getList(option).then(function (conversationList: any) {
    // console.log('获取会话列表成功', conversationList);
    commit(types.SET_CONVERSATION_LIST, conversationList);
    dispatch("imcGetTotalUnreadCount");
    if (Notification.permission !== "granted") {
      createNotification({ content: { content: "消息通知已开启" } }, "收到一条新消息");
    }
  });
};

/**
 * 开始私聊
 * @param param0
 * @param targetId
 * @param type 1 私聊 3 群聊
 */
export const imcOpenConversionByTargetId = async ({ state, dispatch, commit }: ActionContext<ImcState, RootState>, {
  targetId, type, messageContent,
}: { targetId: string, type: number, messageContent: string }) => {
  const { conversationList, imClient } = state;
  const idx = conversationList.findIndex((m: ConversationItem) => m.targetId === targetId);
  if (idx >= 0) {
    // 存在已有的会话列表中
    dispatch("imcGetConversation", conversationList[idx]);
    commit(types.SET_DIALOGSHOW, true);
  } else {
    // 新建一个会话
    await dispatch('getMsgUserOrgInfo', { targetId, type });
    const conversation = imClient.Conversation.get({
      targetId,
      type,
    });
    commit(types.SET_CURRENT_CONVERSATION, conversation);
    commit(types.SET_MESSAGE_LIST, []);
    commit(types.SET_MESSAGE_HAS_MORE, false);
    // 避免出现content undefault
    commit(types.SET_IS_CUSTOM, false);
    commit(types.SET_MESSAGE_CONTENT, messageContent ?? '');
    commit(types.SET_DIALOGSHOW, true);
  }
};

/**
 * 接收消息并插入
 * @param param0
 * @param message
 */
export const imcAddMessageToList = ({ state, rootGetters, commit, dispatch }: ActionContext<ImcState, RootState>, message: any) => {
  const { currentConversation, messageList, dialogShow, rongIMLib, notifyFlag } = state;
  const { userInfo } = rootGetters;
  if (currentConversation) {
    const { targetId } = currentConversation;
    if (isCustomTypes(targetId)) {
      // dispatch("imcGetMsg", currentConversation);
      dispatch("imcRefreshMsg");
      if (dialogShow) {
        dispatch("imcClearUnreadCount", currentConversation);
      }
    } else {
      if (targetId === message.targetId && [...typeList, ...recruitTypeList].includes(message.messageType)) {
        messageList.push(message);
        commit(types.SET_MESSAGE_LIST, messageList);
        commit(types.SET_CURRENT_NEW_MESSAGE, message);
        if (dialogShow) {
          dispatch("imcClearUnreadCount", currentConversation);
        }
      } else if (targetId === message.senderUserId && message.messageType === "RC:RcCmd") {
        const newMessageList = messageList.map(item => {
          return item.messageUId === message.content.messageUId ? message : item;
        });
        commit(types.SET_MESSAGE_LIST, newMessageList);
      }
    }
  }
  if (message.messageType === "RC:RcCmd") return;
  if (!dialogShow) {
    if (userInfo.userId == message.senderUserId) return;
    if (notifyFlag) {
      createNotification(message, "收到新消息", rongIMLib, (item: any) => { dispatch("imcOpenConversation", item); });
      commit("SET_NOTIFYFLAG", false);
      const timer = setTimeout(() => {
        commit("SET_NOTIFYFLAG", true);
        clearTimeout(timer);
      }, 60000);
    }
  }
};

/**
 * 获取历史消息
 * @param targetId
 */
export const imcGetHistoryMessages = ({ state, commit }: ActionContext<ImcState, RootState>) => {
  // 注: imClient 实例通过 RongIMLib.init 获取(单个页面仅需初始化一次)
  commit(types.SET_MSG_LOADING, true);
  const { imClient, currentConversation, messageList } = state;
  const conversationInstance = imClient.Conversation.get({
    targetId: currentConversation.targetId,
    type: currentConversation.type,
  });
  const firstMessage = messageList[0];
  const d = firstMessage.sentTime || 0;
  const option = {
    timestrap: d,
    count: 20,
  };
  conversationInstance.getMessages(option).then((result: any) => {
    let list = result.list; // 历史消息列表
    list = list.concat(messageList);
    commit(types.SET_MESSAGE_LIST, list);
    const hasMore = result.hasMore; // 是否还有历史消息可以获取
    commit(types.SET_MESSAGE_HAS_MORE, hasMore);
    commit(types.SET_MSG_LOADING, false);
  });
};

/**
 * 撤回
 * @param sentTime
 * @param messageUId
 */
export const imcRevokeMessage = ({ state, commit }: ActionContext<ImcState, RootState>, message: any) => {
  const { imClient, currentConversation, messageList } = state;
  const conversationInstance = imClient.Conversation.get({
    targetId: currentConversation.targetId,
    type: currentConversation.type,
  });
  const { sentTime, messageUId } = message;
  const option = {
    sentTime: sentTime,
    messageUId: messageUId,
  };
  conversationInstance.recall(option).then((result: any) => {
    const newMessageList = messageList.map(item => {
      return item.messageUId === result.content.messageUId ? result : item;
    });
    commit(types.SET_MESSAGE_LIST, newMessageList);
  });;
};

/**
 * 获取未读总数
 */
export const imcGetTotalUnreadCount = ({ state, commit }: ActionContext<ImcState, RootState>) => {
  const { imClient } = state;
  imClient.Conversation.getTotalUnreadCount().then((totalUnreadCount: number) => {
    // console.log('获取未读总数成功', totalUnreadCount);
    commit(types.SET_TOTALUNREADCOUNT, totalUnreadCount);
  });
};

/**
 * 清楚当前会话未读数
 * @param item
 *
 */
export const imcClearUnreadCount = ({ state, dispatch }: ActionContext<ImcState, RootState>, item: any) => {
  if (item.targetId) {
    const { imClient } = state;
    const conversationInstance = imClient.Conversation.get({
      targetId: item.targetId,
      type: item.type,
    });
    conversationInstance.read().then(() => {
      // console.log('清除未读数成功'); // im.watch conversation 将被触发
      dispatch("imcGetTotalUnreadCount");
    });
  }
};

/**
 * 打开聊天窗口
 * @param item
 *
 */
export const imcOpenConversation = ({ state, commit, dispatch }: ActionContext<ImcState, RootState>, item: any) => {
  const { currentConversation, dialogShow, conversationList } = state;
  if (!dialogShow) {
    commit(types.SET_DIALOGSHOW, true);
  }
  if (currentConversation.targetId !== item.targetId) {
    const conversation = conversationList.find(i => i.targetId === item.targetId);
    if (conversation) {
      if (isCustomTypes(item.targetId)) {
        dispatch("imcGetMsg", conversation);
      } else {
        dispatch("imcGetConversation", conversation);
      }
    }
  }
};

/**
 * 设置监听
 * @param param0
 */
export const initAndWatchIM = ({ state, commit, dispatch }: ActionContext<ImcState, RootState>) => {
  const { imClient, rongIMLib } = state;
  rongIMLib.RongIMEmoji.init();
  rongIMLib.RongIMVoice.init();
  commit(types.SET_EMOJILIST, rongIMLib.RongIMEmoji.list);
  commit(types.SET_USER_INFO_MAP, baseInfoMap);
  imClient.watch({
    conversation: (event: any) => {
      const { conversationList } = state;
      const updatedConversationList = event.updatedConversationList; // 更新的会话列表
      // console.log('更新会话汇总:', updatedConversationList);
      commit(types.SET_CONVERSATION_LIST, imClient.Conversation.merge({
        conversationList,
        updatedConversationList: updatedConversationList,
      }));
    },
    message: (event: any) => {
      const message = event.message;
      // console.log('收到新消息', message);
      dispatch('imcAddMessageToList', message);
      dispatch("imcGetTotalUnreadCount");
    },
    status: (event: any) => {
      const status = event.status;
      switch (status) {
        case rongIMLib.CONNECTION_STATUS.CONNECTED:
          console.log('链接成功');
          break;
        case rongIMLib.CONNECTION_STATUS.CONNECTING:
          console.log('正在连接中');
          break;
        case rongIMLib.CONNECTION_STATUS.DISCONNECTED:
          console.log('已主动断开连接');
          break;
        case rongIMLib.CONNECTION_STATUS.NETWORK_UNAVAILABLE:
          console.log('网络不可用'); // SDK 内部会自动进行重连
          break;
        case rongIMLib.CONNECTION_STATUS.SOCKET_ERROR:
          console.log('Socket 链接错误'); // SDK 内部会自动进行重连
          break;
        case rongIMLib.CONNECTION_STATUS.KICKED_OFFLINE_BY_OTHER_CLIENT:
          console.log('其他设备登录, 本端被踢'); // 己端被踢, 不可进行重连. 否则会造成多端循环互踢
          break;
        case rongIMLib.CONNECTION_STATUS.BLOCKED:
          console.log('链接断开, 用户已被封禁');
          break;
        default:
          console.log('链接状态变化为:', status);
          break;
      }
    },
  });
};

/**
 * 连接服务器
 * @param param0
 */
export const connectIM = ({ state, rootGetters, commit, dispatch }: ActionContext<ImcState, RootState>) => {
  const { imClient } = state;
  const token = rootGetters.userInfo.rongToken;
  const user = { token };
  imClient.connect(user).then((user: any) => {
    console.log('链接成功, 链接用户 id 为: ', user.id);
    dispatch('imcGetConversationList');
    commit(types.SET_RONGIM_DISABLE, false);
  }).catch((error: any) => {
    console.log('链接失败: ', error.code, error.msg);
  });
};
export const disconnectIM = ({ state, commit }: ActionContext<ImcState, RootState>) => {
  const { imClient } = state;
  imClient.disconnect().then(function () {
    console.log('断开链接成功');
    commit(types.SET_RONGIM_DISABLE, true);
  });
};

/**
 * 查询用户名和头像
 * @param id 用户id
 * @param type 查询类型 1 用户 2 组织
 */
export const getMsgUserOrgInfo = async ({ state, commit }: ActionContext<ImcState, RootState>, { targetId, type }: { targetId: string, type: number }) => {
  const { infoMap } = state;
  const index = JSON.stringify({ id: targetId, type: type || 1 });
  if (infoMap.name[index] && infoMap.avatar[index]) {
    return;
  } else {
    infoMap.name[index] = 'Loading...';
    infoMap.avatar[index] = '/img/icons/apple-touch-icon-76x76.png';
    commit(types.SET_USER_INFO_MAP, { ...infoMap });
    const result = await getInfoById({ targetId, type });
    // debugger;
    const { name, avatar } = result.data;
    infoMap.name[index] = name || "Loading...";
    infoMap.avatar[index] = avatar || "/img/icons/apple-touch-icon-76x76.png";
    commit(types.SET_USER_INFO_MAP, { ...infoMap });
  }
};
