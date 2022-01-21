import request from "@/router/axios";

const prefixUrl = "/admin/menu";
/**
 * 获取菜单
 */
export const getMenu = () => {
  return request({
    url: `${prefixUrl}`,
    method: "get",
  });
};
/**
 * 获取菜单LIST
 */
export const getMenuList = () => {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
  });
};
/**
 * 获取菜单树
 */
export const getMenuTree = () => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
};
/**
 * 获取子菜单
 * @param menuId 菜单ID
 */
export const getSubmenuList = (menuId: number) => {
  return request({
    url: `${prefixUrl}/children_list`,
    method: "get",
    params: {
      parentId: menuId,
    },
  });
};
/**
 * 新增菜单
 * @param data 菜单DTO
 */
export const postMenu = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 获取单个菜单
 * @param id 菜单ID
 */
export const getMenuById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
/**
 * 删除菜单
 * @param id 菜单ID
 */
export const delMenuById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
/**
 * 修改菜单
 * @param data 菜单DTO
 */
export const putMenu = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 获取菜单树
 * @param params 搜索参数
 */
export const fetchMenuTree = (params?: any) => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
    params,
  });
};
/**
 * 获取有关权限的菜单树
 * @param id roleId
 * @param params 搜索参数
 */
export const fetchRoleMenuTreeById = (id: number, params?: any) => {
  return request({
    url: `${prefixUrl}/role_relation_tree/${id}`,
    method: "get",
    params,
  });
};
/**
 * 获取无关系统的菜单树
 * @param params 搜索参数
 */
export const fetchNoSysMenuTree = (params: any) => {
  return request({
    url: `${prefixUrl}/no_sys_tree`,
    method: "get",
    params,
  });
};


/**
 * 获取角色菜单树
 * @param roleName 角色名
 */
export const fetchRoleTree = (roleName: string) => {
  return request({
    url: `${prefixUrl}/tree/${roleName}`,
    method: "get",
  });
};
