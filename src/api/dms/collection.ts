import request from "@/router/axios";
export const prefixUrl = "/dms/collection";

export function fetchPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

/**
 * 新增收藏
 * @param data 0材料，1专栏，2说说，3任务，4纪要，5会议 6魔方
 */
export function createCollection(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

// 批量逻辑删除收藏
export function deleteCollection(data: any) {
  return request({
    url: `${prefixUrl}/delete`,
    method: "post",
    data,
  });
}

// 根据关联id进行删除
export function deleteCollectionById(data: any) {
  return request({
    url: `${prefixUrl}/app/delete`,
    method: "post",
    data,
  });
}