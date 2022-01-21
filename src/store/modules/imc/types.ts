export interface ImcState {
  rongIMLib: any
  imClient: any
  conversationList: any[]
  currentConversation: any
  messageList: any[]
  messageHasMore: boolean
  current: number
  customMsgPage: Function
  infoMap: any
  currentNewMessage: any
  isCustom: boolean
  messageType: string
  msgLoading: boolean
  dialogShow: boolean
  totalUnreadCount: number
  emojiList: any[]
  notifyFlag: boolean
  rongIMDisable: boolean
  messageContent: string
}
export interface ConversationItem {
  hasMentiond: boolean
  latestMessage: Record<string, any>
  mentiondInfo: undefined
  targetId: string
  type: number
  unreadMessageCount: number
}

export const errorCode = {
  '-1': '请求超时(一般为本地网络问题)',
  '-2': 'SDK内部错误',
  '-3': '开发者参数传入错误',
  '405': '已被对方加入黑名单',
  '20604': '发送频率过快',
  '22406': '不在群组中',
  '22408': '在群组中被禁言',
  '23406': '不在聊天室中',
  '23408': '已在聊天室中被禁言',
  '23409': '已被踢出并禁止加入聊天室',
  '23410': '聊天室不存在',
  '23411': '聊天室成员超限',
  '23412': '聊天室参数无效',
  '23414': '聊天室云存储业务未开通',
  '25101': '撤回消息失败',
  '26001': 'push设置参数无效',
  '20605': '操作被禁止',
  '20606': '不支持的操作',
  '21501': '发送的消息中包含敏感词',
  '21502': '消息中敏感词已经被替换',
  '30001': '用户未连接成功，需连接成功后再执行',
  '30007': '导航请求失败(一般为本地网络问题)',
  '30010': 'CMP嗅探失败(一般为本地网络问题)',
  '33007': '未开通单群聊历史消息云存储',
};
export type ErrorCode = typeof errorCode;
export type ErrorCodeKey = keyof ErrorCode;
export interface ImcError {
  code: ErrorCodeKey
  msg: string
}
