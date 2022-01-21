import request from "@/router/axios";

const prefixUrl = "/admin/dev_ops";

export const getDevOpsUserPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params,
  });
};

export const postDevOpsUser = (data: any) => {
  return request({
    url: `${prefixUrl}/add `,
    method: 'post',
    data,
  });
};

export const delDevOpsUserById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};

export const getDevOpsUserById = (id: number) => {
  return request({
    url: `${prefixUrl}/user/${id}`,
    method: 'get',
  });
};

export const getDevOpsRolePage = (params: any) => {
  return request({
    url: `${prefixUrl}/role/page`,
    method: 'get',
    params,
  });
};

/**
 * 获取运维所能赋予的角色树
 */
export const getDevOptRoleTree = () => {
  return request({
    url: `${prefixUrl}/role_tree`,
    method: 'get',
  });
};

/**
 * 创建运维角色
 * @param data
 */
export const createDevOptRole = (data: any) => {
  return request({
    url: `${prefixUrl}/role/create`,
    method: 'post',
    data,
  });
};

/**
 * 删除运维角色
 * @param id
 */
export const delDevOptRoleById = (id: number) => {
  return request({
    url: `${prefixUrl}/role/delete/${id}`,
    method: 'post',
  });
};

/**
 * 设置
 * @param data
 */
export const setDevOptRole = (data: any) => {
  return request({
    url: `${prefixUrl}/give/user/role`,
    method: 'post',
    data,
  });
};

/**
 * 获取该角色已有的用户列表方法
 * @param roleId
 */
export const getDevOptRoleUserListById = (roleId: number) => {
  return request({
    url: `${prefixUrl}/role/${roleId}`,
    method: "get",
  });
};

export const getDevOptRoleUserList = () => {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
  });
};
