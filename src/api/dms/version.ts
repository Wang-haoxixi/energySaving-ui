import request from "@/router/axios";

const prefixUrl = "/dms/version";

export function getVersionPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

export function getVersionById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function getVersionTree() {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
}

export function postVersion(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

export function putVersion(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
}

export function deleteVersionById(id: number) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: [id],
  });
}
