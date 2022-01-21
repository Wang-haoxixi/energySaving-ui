import request from "@/router/axios";

const prefixUrl = "/admin/category";
/**
 * 分类树
 * @param params (无意义)
 */
export const getCategoryTree = (params: any) => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
    params,
  });
};
/**
 * 新增分类
 * @param data 分类DTO
 */
export const postCategory = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 修改分类
 * @param data 分类DTO
 */
export const putCategory = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 删除分类
 * @param id 分类ID
 */
export const delCategoryById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
/**
 * 通过编码获取
 * @param number 分类编码
 */
export const getCategoryTreeByNumber = (number: string, params: any) => {
  return request({
    url: `${prefixUrl}/children/${number}`,
    method: "get",
    params,
  });
};
