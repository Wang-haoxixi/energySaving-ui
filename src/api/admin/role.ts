import request from "@/router/axios";

const prefixUrl = "/admin/role";

export const getRolePage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

export const getRoleById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

export const postRole = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

export const putRole = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const delRoleById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};

export const permissionUpd = (roleId: number, menuIds: string) => {
  return request({
    url: `${prefixUrl}/update/menu`,
    method: "post",
    params: {
      roleId: roleId,
      menuIds: menuIds,
    },
  });
};

export const getRoleList = () => {
  return request({
    url: `${prefixUrl}/list`,
  });
};

export const getAppRoleList = (id: number) => {
  return request({
    url: `${prefixUrl}/apply/role/list/${id}`,
  });
};

export const postAppRole = (data: any) => {
  return request({
    url: `${prefixUrl}/apply/create`,
    method: "post",
    data,
  });
};

export const putAppRole = (data: any) => {
  return request({
    url: `${prefixUrl}/apply/update`,
    method: "post",
    data,
  });
};

export const delAppRoleById = (id: number) => {
  return request({
    url: `${prefixUrl}/apply/delete/${id}`,
    method: "post",
  });
};

export const permissionAppUpd = (roleId: number, menuIds: string) => {
  return request({
    url: `${prefixUrl}/apply/power`,
    method: "post",
    params: {
      roleId: roleId,
      menuIds: menuIds,
    },
  });
};

export const getOrgRolePage = (params: any) => {
  return request({
    url: `${prefixUrl}/org/page`,
    method: "get",
    params,
  });
};

export const getOrgRoleUserListById = (roleId: number) => {
  return request({
    url: `${prefixUrl}/user_list/${roleId}`,
    method: "get",
  });
};

export const saveOrgRole = (data: any) => {
  return request({
    url: `${prefixUrl}/org/give/user/role`,
    method: "post",
    data,
  });
};

export const saveSysRole = (data: any) => {
  return request({
    url: `${prefixUrl}/sys/give/user/role`,
    method: "post",
    data,
  });
};
/**
 * 获取所有能给予的角色id name
 */
export const getDevOpsRoleList = () => {
  return request({
    url: `${prefixUrl}/dev/ops/list`,
    method: 'get',
  });
};

export const getOrgRoleList = () => {
  return request({
    url: `${prefixUrl}/org/list`,
  });
};
