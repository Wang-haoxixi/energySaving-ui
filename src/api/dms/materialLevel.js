import request from "@/router/axios";
const prefixUrl = "/dms/material_level";

export function getLevelTree(query) {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
    params: query,
  });
}

export function createForm(obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}

export function updateForm(obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}

export function deleteDataByIds(obj) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: obj,
  });
}
