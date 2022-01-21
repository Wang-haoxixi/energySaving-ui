import request from "@/router/axios";
const scope = "server";
/**
 * 发送短信
 * @param mobile 手机号
 */
export const getMobileCode = (mobile: string) => {
  return request({
    url: `/admin/mobile/${mobile}`,
    method: "get",
  });
};
/**
 * 验证是否重复
 * @param name 用户名
 */
export const validRegisterUserName = (name: string) => {
  return request({
    url: `/admin/user/repeatUsername/${name}`,
    method: "get",
  });
};
/**
 * 注册
 * @param userObject 用户
 */
export const registerUser = (userObject: any) => {
  return request({
    url: "/admin/user/register",
    method: "post",
    data: {
      ...userObject,
    },
  });
};
/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @param code 验证码
 * @param randomStr 随机数
 */
export const loginByUsername = (
  username: string,
  password: string,
  code: string,
  randomStr: any,
) => {
  const grant_type = "password";

  return request({
    url: "/auth/oauth/token",
    headers: {
      Authorization: "Basic Z2RzOmdkcw==",
    },
    method: "post",
    params: { username, password, randomStr, code, grant_type, scope },
  });
};
/**
 * 持续性获取token
 * @param refresh_token 复用token
 */
export const refreshToken = (refresh_token: string) => {
  const grant_type = "refresh_token";
  return request({
    url: "/auth/oauth/token",
    headers: {
      Authorization: "Basic Z2RzOmdkcw==",
    },
    method: "post",
    params: { refresh_token, grant_type, scope },
  });
};
/**
 * 用手机登录
 * @param mobile 手机号
 * @param code 验证码
 */
export const loginByMobile = (mobile: string, code: string) => {
  const grant_type = "mobile";
  return request({
    url: "/auth/mobile/token/sms",
    headers: {
      Authorization: "Basic Z2RzOmdkcw==",
    },
    method: "post",
    params: { mobile: "SMS@" + mobile, code: code, grant_type },
  });
};
/**
 * 第三方登陆
 * @param state 第三方登录方式
 * @param code 码
 */
export const loginBySocial = (state: any, code: any) => {
  const grant_type = "mobile";
  return request({
    url: "/auth/mobile/token/social",
    headers: {
      Authorization: "Basic Z2RzOmdkcw==",
    },
    method: "post",
    params: { mobile: state + "@" + code, grant_type },
  });
};
/**
 * 登出
 */
export const logout = () => {
  return request({
    url: "/auth/token/logout",
    method: "delete",
  });
};
