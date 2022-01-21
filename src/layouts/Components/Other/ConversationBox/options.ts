// 固定图片资源HOST前缀
export const OSS_HOST_URL_PREFIX = "//woneng-oss.oss-cn-hangzhou.aliyuncs.com";
// 提醒
export const MSG_TIP = "APP:TIP";
export const TIP = "TIP";
// 待处理
export const WAIT_DEAL = "WAIT_DEAL";
export const MSG_WAIT_DEAL = "APP:WAIT_DEAL";
// SO通知
export const SO_MESSAGE = "SO_MESSAGE";
export const MSG_SO_MESSAGE = "APP:SO_MESSAGE";
// 红包
export const RED_ENVELOPE = "RED_ENVELOPE";
export const MSG_RED_ENVELOPE = "APP:RED_ENVELOPE";
// 协作任务通知
export const COLLABORATION_TASK = "COLLABORATION_TASK";
// 拉黑
export const DELETE_FRIEND = "DELETE_FRIEND";
//警告
export const CAVEAT = "CAVEAT";
// 数组
export const customTypes = [TIP, WAIT_DEAL, SO_MESSAGE, CAVEAT];
export const customMsgTypes = [MSG_TIP, MSG_WAIT_DEAL, MSG_SO_MESSAGE];
// 判断
export const isCustomTypes = (type: string) => customTypes.includes(type);
export const isCustomMsgTypes = (type: string) => customMsgTypes.includes(type);
export const isDeleteFriend = (type: string) => type === DELETE_FRIEND;
// Map
export const showTypeName = {
  [RED_ENVELOPE]: "红包",
  [WAIT_DEAL]: "待处理",
  [TIP]: "提醒",
  [SO_MESSAGE]: "组织通知",
  [COLLABORATION_TASK]: "协作任务通知",
  [DELETE_FRIEND]: "已拉黑",
  [CAVEAT]: "警告",
};
export const showTypeAvatar = {
  [RED_ENVELOPE]: `${OSS_HOST_URL_PREFIX}/sys/red_envelope.png`,
  [WAIT_DEAL]: `${OSS_HOST_URL_PREFIX}/sys/pending.png`,
  [TIP]: `${OSS_HOST_URL_PREFIX}/sys/remind.png`,
  [SO_MESSAGE]: `${OSS_HOST_URL_PREFIX}/sys/so.png`,
  [COLLABORATION_TASK]: `${OSS_HOST_URL_PREFIX}/sys/icon_renwu.png`,
  [DELETE_FRIEND]: `${OSS_HOST_URL_PREFIX}/sys/icon_df.png`,
  [CAVEAT]: `${OSS_HOST_URL_PREFIX}/sys/icon_jinggao.png`,
};
export type CustomType = keyof typeof showTypeName;
// 消息类型
export const msgType = {
  // "0":"",//其他消息
  "1": "RC:TxtMsg", //文本消息
  "2": "RC:ImgMsg", //图片消息
  "3": "RC:FileMsg", //文件消息
  "4": "RC:HQVCMsg", //语音消息
  "5": "RC:LBSMsg", //位置消息
  "6": "RC:ImgTextMsg", //图文消息
  "7": "RC:VcMsg", //语音消息
};
//消息类型数组
export const typeList = Object.values(msgType);

//分享消息类型
export const msgShareType = {
  "1": "APP:RECRUIT_SHARE", //  能聘
  "2": "APP:PRODUCT_SHARE", //  魔方
  "3": "APP:FRIEND_SHARE", //  用户
  "4": "APP:ORG_SHARE", //  组织
  "5": "APP:MATERIAL_SHARE", //  文章
  "6": "APP:EXAM_SHARE", //  考试
  "7": "APP:ACTIVITY_SHARE", //  活动
  "8": "APP:TASK_SHARE", //  任务
  "9": "APP:QUES_SHARE", //  问卷
};
export const shareTypeList = Object.values(msgShareType);
// 能聘类型消息
export const recruitType = {
  "1": "APP:RECRUIT_INITIATE", // 沟通一下
  "2": "APP:RECRUIT_INVITATION", // 能聘邀请投递
  "3": "APP:STATUS_NOTIFICATION", // 能聘邀请投递/面试邀请函 - 同意或者拒绝的消息通知
  "4": "APP:RECRUIT_INTERVIEW", // 面试邀请函
};
export const recruitTypeList = Object.values(recruitType);
