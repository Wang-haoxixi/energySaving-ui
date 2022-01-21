import request from "@/router/axios";

const prefixUrl = "/admin/dict";
/**
 * 字典分页
 * @param params 分页参数
 */
export const getDictPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
/**
 * 给予运营特殊字典设置权限
 * @param params
 */
export const getDictPageForPermission = (code: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "get",
      params: {
        code,
        ...params,
      },
    });
  };
};
/**
 * 新增字典
 * @param data 字典DTO
 */
export const postDict = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 查看单个字典
 * @param id 字典ID
 */
export const getDictById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
/**
 * 获取字典的数据
 * @param id 字典ID
 */
export const getChild = (id: number | string) => {
  return request({
    url: `${prefixUrl}/child/${id}`,
    method: "get",
  });
};
/**
 * 新增字典数据
 * @param data 字典数据DTO
 */
export const postChild = (data: any) => {
  return request({
    url: `${prefixUrl}/child/create`,
    method: "post",
    data,
  });
};
/**
 *修改字典数据
 * @param data 字典数据DTO
 */
export const putChild = (data: any) => {
  return request({
    url: `${prefixUrl}/child/update`,
    method: "post",
    data,
  });
};
/**
 * 删除字典数据
 * @param id 字典数据ID
 */
export const deleteChildById = (id: number) => {
  return request({
    url: `${prefixUrl}/child/delete/${id}`,
    method: "post",
  });
};
/**
 * 删除字典
 * @param id 字典ID
 */
export const delDictById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
/**
 * 修改字典
 * @param data 字典DTO
 */
export const putDict = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 获取所有字典
 */
export const getDictAllMap = () => {
  return request({
    url: `${prefixUrl}/all_map`,
    method: "get",
  });
};
