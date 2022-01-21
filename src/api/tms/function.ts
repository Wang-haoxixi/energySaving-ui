import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/function
export function getTagFunctionList() {
  return request({
    url: `${prefixUrl}/function/list`,
    method: "get",
  });
}

export function getTagFunctionMap() {
  return request({
    url: `${prefixUrl}/function/map`,
    method: "get",
  });
}

export function postTagFunction(obj: any) {
  return request({
    url: `${prefixUrl}/function/create`,
    method: "post",
    data: obj,
  });
}

export function putTagFunction(obj: any) {
  return request({
    url: `${prefixUrl}/function/update`,
    method: "post",
    data: obj,
  });
}

export function deleteTagById(id: number) {
  return request({
    url: `${prefixUrl}/function/delete/${id}`,
    method: "post",
  });
}

export function enableTagFunction(id: number) {
  return request({
    url: `${prefixUrl}/function/update_enable/${id}`,
    method: "post",
  });
}
