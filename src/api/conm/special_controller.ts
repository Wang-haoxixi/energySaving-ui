import request from "@/router/axios";

const prefixUrl = "/cms/info_special";
// @/api/conm/info_attribute
//推荐位管理控制器
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}
export function getPageDetailById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
export function postPage(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
export function updatePage(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}
export function deleteSpecialById(id: number) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}