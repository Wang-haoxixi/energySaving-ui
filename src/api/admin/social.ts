import request from "@/router/axios";

const prefixUrl = "/admin/social";

export function socialBindAccount(params: any) {
  return request({
    url: `${prefixUrl}/bind`,
    method: "get",
    params,
  });
}

export function getAppletsQRCode(id: number, type = "activity") {
  return request({
    url: `${prefixUrl}/applets_qr_code`,
    method: "get",
    params: {
      scene: `${type}_${id}`,
    },
  });
}

export function socialUnBindAccount(params: any) {
  return request({
    url: `${prefixUrl}/unbind`,
    method: "get",
    params,
  });
}

export function getBindCheck(params: any) {
  return request({
    url: `${prefixUrl}/check`,
    method: "get",
    params,
  });
}

export const postSocial = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

export const putSocial = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
export const getSocialPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
export const delSocialById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
