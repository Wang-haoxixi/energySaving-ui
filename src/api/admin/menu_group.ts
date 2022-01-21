import request from "@/router/axios";

const prefixUrl = "/admin/menu/group";
/**
 * 获取菜单组与工作台
 */
export const getMenuGroupList = () => {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
  });
};
/**
 * 新增工作台
 * @param data 工作台菜单DTO
 */
export const postMenuGroup = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 修改工作台
 * @param data DTO
 */
export const putMenuGroup = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 删除工作台
 * @param id 工作台ID
 */
export const delMenuGroupById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
