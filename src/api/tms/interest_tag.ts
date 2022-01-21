import request from "@/router/axios";
export const prefixUrl = "/tms/interest_tag";

export const getInterestTagPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params,
  });
};

export const getInterestTagById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  });
};
/**
 * 新增
 * @param data DTO
 */
export const postInterestTag = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data,
  });
};
/**
 * 修改
 * @param data DTO
 */
export const putInterestTag = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data,
  });
};
/**
 * 删除
 * @param id ID
 */
export const delInterestTagById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete`,
    method: 'post',
    data: [id],
  });
};
