import request from "@/router/axios";

const prefixUrl = "/cms/info_node";
// @/api/conm/index
//栏目管理控制器

export function getPageById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
//添加栏目
export function addObj(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
//栏目分页
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}
//删除
export function deleteNodeById(id: number) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}
export function updateObj(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}