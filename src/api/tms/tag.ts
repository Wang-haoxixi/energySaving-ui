import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/tag
export function getTagPage(opts: any) {
  return request({
    url: `${prefixUrl}/tag/page`,
    method: "get",
    params: opts,
  });
}
export function getTagById(id: number) {
  return request({
    url: `${prefixUrl}/tag/${id}`,
    method: "get",
  });
}

export function getTagViewById(id: number) {
  return request({
    url: `${prefixUrl}/tag/views/${id}`,
    method: "get",
  });
}

export function getTagViewByName(name: any) {
  return request({
    url: `${prefixUrl}/tag/views/name`,
    method: "get",
    params: {
      name,
    },
  });
}

export function putTag(obj: any) {
  return request({
    url: `${prefixUrl}/tag/update`,
    method: "post",
    data: obj,
  });
}

export function postTag(obj: any) {
  return request({
    url: `${prefixUrl}/tag/create`,
    method: "post",
    data: obj,
  });
}

export function deleteTagById(id: number) {
  return request({
    url: `${prefixUrl}/tag/delete/${id}`,
    method: "post",
  });
}

export function increaseTagView(id: number) {
  return request({
    url: `${prefixUrl}/tag/views/${id}`,
    method: "post",
  });
}
// 验证标签名字重复
export function validTagName(name: any) {
  return request({
    url: `${prefixUrl}/tag/check`,
    method: "post",
    data: { name },
  });
}
// 合并标签
export function mergeTag(mergeForm: any) {
  return request({
    url: `${prefixUrl}/tag/merge`,
    method: "post",
    data: { ...mergeForm },
  });
}
// 审核通过标签
export function reviewTag(ids: any) {
  return request({
    url: `${prefixUrl}/tag/review`,
    method: "post",
    data: ids,
  });
}
// 禁用标签
export function disableTag(ids: any) {
  return request({
    url: `${prefixUrl}/tag/disable`,
    method: "post",
    data: ids,
  });
}
// 批量删除标签
export function deleteTag(ids: any) {
  return request({
    url: `${prefixUrl}/tag/delete`,
    method: "post",
    data: ids,
  });
}
// 推荐标签
export function getRecTags() {
  return request({
    url: `${prefixUrl}/tag/rec_tags`,
    method: "get",
  });
}
// 每周标签
export function getWeekTags() {
  return request({
    url: `${prefixUrl}/tag/week_tags`,
    method: "get",
  });
}
// 所有标签
export function getIndexPage(query: any) {
  return request({
    url: `${prefixUrl}/tag/index_page`,
    method: "get",
    params: query,
  });
}
// 标签关联人
export function getPersonById(id: number) {
  return request({
    url: `${prefixUrl}/tag/person/${id}`,
    method: "get",
  });
}
// 标签类
export function getRelationsById(id: number) {
  return request({
    url: `${prefixUrl}/tag/relations/${id}`,
    method: "get",
  });
}
//批量编辑
export function updateBatchTag(obj: any) {
  return request({
    url: `${prefixUrl}/tag/update/batch`,
    method: "post",
    data: obj,
  });
}