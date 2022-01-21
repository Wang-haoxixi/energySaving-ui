import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/tag-type
export function getTagTypeList() {
  return request({
    url: `${prefixUrl}/tag_type/list`,
    method: "get",
  });
}
export function getTagTypeParents(id = "") {
  return request({
    url: `${prefixUrl}/tag_type/parents`,
    method: "get",
    params: { id },
  });
}

export function getTagTypePage(opts: any) {
  return request({
    url: `${prefixUrl}/tag_type/page`,
    method: "get",
    params: opts,
  });
}

export function putTagType(tag: any) {
  return request({
    url: `${prefixUrl}/tag_type/update`,
    method: "post",
    data: tag,
  });
}

export function postTagType(tag: any) {
  return request({
    url: `${prefixUrl}/tag_type/create`,
    method: "post",
    data: tag,
  });
}

export function deleteTagTypeById(id: number) {
  return request({
    url: `${prefixUrl}/tag_type/delete/${id}`,
    method: "post",
  });
}
