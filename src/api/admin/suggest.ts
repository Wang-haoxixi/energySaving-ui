import request from "@/router/axios";

const prefixUrl = "/admin/suggest";
/**
 * 新增建议
 * @param data title, type, content, file
 */
export const postSuggest = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 建议分页
 * @param params
 */
export const getSuggestPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
/**
 * 单个查询
 * @param id
 */
export const getSuggestById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
/**
 * 处理建议
 * @param data id ID, amount 打赏金额, message 反馈, status 1 待处理 2 已采纳 3 已驳回
 */
export const dealSuggest = (data: any) => {
  return request({
    url: `${prefixUrl}/deal`,
    method: "post",
    data,
  });
};
