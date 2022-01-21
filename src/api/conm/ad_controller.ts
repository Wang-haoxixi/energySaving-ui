import request from "@/router/axios";

const prefixUrl = "/cms/info_ad";
// @/api/conm/info_attribute
//推荐位管理控制器
export const getInfoAdPage = (siteId: number) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "get",
      params: { ...params, siteId },
    });
  };
};
export function getInfoAdPageDetailById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
export function postInfoAdPage(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
export function updateInfoAdPage(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}
export function deleteADById(id: number) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}

// 通过广告位查询广告
export function getInfoAdList(slotNumber: any) {
  return request({
    url: `${prefixUrl}/2/list`,
    method: "get",
    params: {
      slotNumber: slotNumber,
    },
  });
}
