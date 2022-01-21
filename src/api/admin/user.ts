import request from "@/router/axios";

const prefixUrl = "/admin/user";

export const postRegister = (data: any) => {
  return request({
    url: `${prefixUrl}/register`,
    method: "post",
    data,
  });
};

export const getUserInfo = () => {
  return request({
    url: `${prefixUrl}/information`,
    method: "get",
  });
};

export const getUserMoreInfo = () => {
  return request({
    url: `${prefixUrl}/detail`,
    method: "get",
  });
};

export const putUserMoreInfo = (data: any) => {
  return request({
    url: `${prefixUrl}/detail/update`,
    method: "post",
    data,
  });
};

export const getUserSelf = () => {
  return request({
    url: `${prefixUrl}`,
    method: "get",
  });
};

export function getUserPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}
/**
 * 获取可以新增成员的用户分页
 * @param params
 */
export function getUserUserPage(params: any) {
  return request({
    url: `${prefixUrl}/user/page`,
    method: "get",
    params,
  });
}

export function resetPassByUserId(id: number) {
  return request({
    url: `${prefixUrl}/reset/password/${id}`,
    method: "get",
  });
}

export function postUser(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

export function getUserById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function getUserShowById(id: number) {
  return request({
    url: `${prefixUrl}/show/${id}`,
    method: "get",
  });
}

export function delUserById(id: number) {
  return request({
    // url: `${prefixUrl}/${id}`,
    // method: "delete",
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}

export function putUser(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
}

export function resetPassword(data: any) {
  return request({
    url: `${prefixUrl}/find/password`,
    method: "post",
    data,
  });
}

export function resetSafePassword(data: any) {
  return request({
    url: `${prefixUrl}/edit/safe/password`,
    method: "post",
    data,
  });
}

export function cancellationUser(data: any) {
  return request({
    url: `${prefixUrl}/cancellation`,
    method: "post",
    data,
  });
}

export function userChangeMobile(data: any) {
  return request({
    url: `${prefixUrl}/change/mobile`,
    method: "post",
    data,
  });
}

export function userChangeOrg(id: number) {
  return request({
    url: `${prefixUrl}/set/org/${id}`,
    method: "post",
  });
}

export function getUserCardById(id: number) {
  return request({
    url: `${prefixUrl}/card/${id}`,
    method: "get",
  });
}

export function setUserPrivacy(params: any) {
  return request({
    url: `${prefixUrl}/card/privacy/set`,
    method: "get",
    params,
  });
}

export function getUserSearchPage(params: any) {
  return request({
    url: `${prefixUrl}/common/search`,
    method: "get",
    params,
  });
}

export function getOperateUserPage(params: any) {
  return request({
    url: `${prefixUrl}/operate/page`,
    method: "get",
    params,
  });
}

export function getOperateUserLockOrUnlock(userId: number) {
  return request({
    url: `${prefixUrl}/lock_unlock/${userId}`,
    method: "post",
  });
}


export function setUserPrivacyStyle(style: number) {
  return request({
    url: `${prefixUrl}/style/privacy/set`,
    method: "post",
    params: {
      style,
    },
  });
}

// 更新用户信息
export function updateInfomationByApp(data: any) {
  return request({
    url: `${prefixUrl}/app/update`,
    method: "post",
    data,
  });
}

// 用户引导设置
export function updateUserGuideInfo() {
  return request({
    url: `${prefixUrl}/guided/set`,
    method: "get",
  });
}
