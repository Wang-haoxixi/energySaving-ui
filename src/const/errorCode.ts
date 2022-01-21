const errorCode = {
  "401": "当前操作没有权限或者登入过期",
  "403": "当前操作没有权限",
  "404": "资源不存在",
  "417": "未绑定登录账号，请使用密码登录后绑定",
  "426": "用户名不存在或密码错误",
  "428": "验证码错误,请重新输入",
  "429": "请求过频繁",
};

type ErrorCode = typeof errorCode;

type ErrorCodeKey = keyof ErrorCode;

function getErrorCode(name: ErrorCodeKey, msg: string): string {
  return errorCode[name] || msg;
}

export { getErrorCode, ErrorCodeKey };
