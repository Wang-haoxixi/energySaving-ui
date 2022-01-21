import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/tag-level
export function getTagLevelList() {
  return request({
    url: `${prefixUrl}/tag_level/list`,
    method: "get",
  });
}

export function getTagLevelPage(opts: any) {
  return request({
    url: `${prefixUrl}/tag_level/page`,
    method: "get",
    params: opts,
  });
}

export function postTagLevel(obj: any) {
  return request({
    url: `${prefixUrl}/tag_level/create`,
    method: "post",
    data: obj,
  });
}

export function putTagLevel(obj: any) {
  return request({
    url: `${prefixUrl}/tag_level/update`,
    method: "post",
    data: obj,
  });
}

export function deleteTagLevelById(id: number) {
  return request({
    url: `${prefixUrl}/tag_level/delete/${id}`,
    method: "post",
  });
}
