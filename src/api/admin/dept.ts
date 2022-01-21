import request from "@/router/axios";

const prefixUrl = "/admin/dept";
/**
 * 获取部门树
 */
export const getDeptTree = () => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
};
/**
 * 新增部门
 * @param data 部门DTO
 */
export const postDept = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 修改部门
 * @param data 部门DTO
 */
export const putDept = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 删除部门
 * @param id 部门ID
 */
export const delDeptById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
/**
 * 获取单个部门详情
 * @param id 部门ID
 */
export const getDeptById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
