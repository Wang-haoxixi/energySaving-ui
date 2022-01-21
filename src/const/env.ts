// 配置编译环境和线上环境之间的切换
const env = process.env;

const CODEURL = "/api/code";
const WXAPPID = "wx7866ead93ed521ad";
const GLOBAL_KEY = "WONENG";
const WX_REDIRECT_URI_PREFIX = "http://woneng.net";
const MSGINIT = "获取验证码";
const MSGSCUCCESS = "${time}秒后重发";
const MSGTIME = 60;
const VCODEMAXLENGTH = 4;
/**
 * 邀请生成文字
 * @param url 跳转URL
 * @param orgName 组织名
 */
const INVITE_STRING_FUNC = (url: string, orgName: string) =>
  // `点击链接加入我的智慧组织“${orgName}”共同构建未来组织，推动人类进步！http://woneng.net${url}`;  // 我能
  // `点击链接加入我的智慧组织“${orgName}”共同构建未来组织，推动人类进步！http://183.131.134.242:15986${url}`; // 节能保 - 测试站
  `点击链接加入我的智慧组织“${orgName}”共同构建未来组织，推动人类进步！https://admin.jienengbao.top${url}`; // 节能保 - 正式站

const GLOBAL_SEARCH_OPTIONS = [
  { name: "找人", value: "1", label: "user", count: 0 },
  { name: "找组织", value: "2", label: "org", count: 0 },
  { name: "话题", value: "3", label: "topic", count: 0 },
  { name: "专栏", value: "4", label: "article", count: 0 },
  { name: "任务", value: "5", label: "task", count: 0 },
  { name: "魔方", value: "6", label: "product", count: 0 },
  { name: "活动", value: "7", label: "activity", count: 0 },
  { name: "问卷", value: "8", label: "questionnaire", count: 0 },
  { name: "能聘", value: "9", label: "recruit", count: 0 },
  { name: "考试", value: "10", label: "exam", count: 0 },
];

const PRIVACY_TIP = {
  1: false,
  2: "该用户设置了权限，您可添加其为好友后查看！",
  3: "该用户设置了权限，您无权查看其个人风采页！",
};

const SO_JOIN_TIP = "该组织暂未对外开放！";

export {
  CODEURL,
  WXAPPID,
  GLOBAL_KEY,
  WX_REDIRECT_URI_PREFIX,
  env,
  MSGINIT,
  MSGSCUCCESS,
  MSGTIME,
  VCODEMAXLENGTH,
  INVITE_STRING_FUNC,
  GLOBAL_SEARCH_OPTIONS,
  PRIVACY_TIP,
  SO_JOIN_TIP,
};
