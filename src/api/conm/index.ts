import request from "@/router/axios";

const prefixUrl = "/cms/info_site";
// @/api/conm/index
//站点管理控制器
export function getPageById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
export function getStationManagementPage() {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
  });
}

export function postStationManagementCreate(obj: object) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
export function deleteStationManagement(id: number) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}
export function updateStationManagement(obj: Record<string, any>) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}
