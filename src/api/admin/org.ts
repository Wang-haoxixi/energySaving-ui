import request from "@/router/axios";

const prefixUrl = "/admin/org";
/**
 * 创建组织
 * @param data 组织信息
 */
export const postOrg = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 通过ID查询组织
 * @param id ID
 */
export const getOrgById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
/**
 * 通过ID查询组织风采页
 * @param id ID
 */
export const getOrgShowById = (id: number) => {
  return request({
    url: `${prefixUrl}/show/${id}`,
    method: "get",
  });
};
/**
 * 获取用户所在的所有组织
 */
export const getUserOrgList = () => {
  return request({
    url: `${prefixUrl}/user/list`,
    method: "get",
  });
};
/**
 * 获取组织下的所有用户分页
 * @param params 分页
 */
export const getOrgUserPage = (params: any) => {
  return request({
    url: `${prefixUrl}/user/page`,
    method: "get",
    params,
  });
};

export const getOrgPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

export const getOrgWorkplace = () => {
  return request({
    url: `${prefixUrl}/workplace`,
    method: "get",
  });
};

export const getUserHadList = () => {
  return request({
    url: `${prefixUrl}/user/had/list`,
    method: "get",
  });
};

export const delOrgById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};

export const fireUserById = (orgId: number) => {
  return function(userId: number) {
    return request({
      url: `${prefixUrl}/fire`,
      method: "get",
      params: {
        userId,
        orgId,
      },
    });
  };
};

export const putOrg = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const applyOrg = (data: any) => {
  return request({
    url: `${prefixUrl}/apply`,
    method: "post",
    data,
  });
};

export const orgPassUserJoins = (data: any) => {
  return request({
    url: `${prefixUrl}/pass/joins`,
    method: "post",
    data,
  });
};

/**
 * 删除管理/unset/admin/{userId}
 */
export const delOrgAdminByUserId = (id: number) => {
  return request({
    url: `${prefixUrl}/unset/admin/${id}`,
    method: "get",
  });
};

//退出组织
export const outOrg = (orgId: number) => {
  return request({
    url: `${prefixUrl}/sign/out/${orgId}`,
    method: "get",
  });
};

export const getOrgCardById = (orgId: number) => {
  return request({
    url: `${prefixUrl}/card/${orgId}`,
    method: "get",
  });
};

export const getOrgAdminList = () => {
  return request({
    url: `${prefixUrl}/admin/list`,
    method: "get",
  });
};

export const setOrgAdminBatch = (data: any) => {
  return request({
    url: `${prefixUrl}/set/admin/batch`,
    method: "post",
    data,
  });
};

export const getOrgLogPage = (params: any) => {
  return request({
    url: `${prefixUrl}/log/page`,
    method: "get",
    params,
  });
};

export const getOrgLogPageById = (id: number) => {
  return function(params: any) {
    return request({
      url: `${prefixUrl}/log/page/platform/${id}`,
      method: "get",
      params,
    });
  };
};

/**
 * 日志列表
 */
export const getOrgLogList = () => {
  return request({
    url: `${prefixUrl}/log/list`,
    method: "get",
  });
};

export const getOrgSquarePage = (params: any) => {
  return request({
    url: `${prefixUrl}/square/page`,
    method: "get",
    params,
  });
};

export const inviteUserSo = (data: any) => {
  return request({
    url: `${prefixUrl}/invite`,
    method: "post",
    data,
  });
};
export const transferSo = (data: any) => {
  return request({
    url: `${prefixUrl}/transfer`,
    method: "post",
    data,
  });
};

export const inviteSoUsersBatch = (data: any) => {
  return request({
    url: `${prefixUrl}/batch/invite`,
    method: "post",
    data,
  });
};

/**
 * 是否允许加入
 * isOpen=
 * isExempt=
 * allowJoin=
 * isCharge=
 * @param exempt 0否，1是
 */
export const orgOpenAllow = (params: any) => {
  return request({
    url: `${prefixUrl}/open/allow`,
    method: "get",
    params,
  });
};

export const orgUserExistList = (id: number) => {
  return request({
    url: `${prefixUrl}/user/id/list/${id}`,
    method: "get",
  });
};

export const getOrgShareQrSrc = (id: number) => {
  return request({
    url: `${prefixUrl}/share/qr/code/${id}`,
    method: "get",
  });
};

export const getOrgSearchPage = (params: any) => {
  return request({
    url: `${prefixUrl}/common/search`,
    method: "get",
    params,
  });
};

export const getOrgUserList = () => {
  return request({
    url: `${prefixUrl}/user_list`,
    method: "get",
  });
};

export const updateOrgChargeCost = (data: any) => {
  return request({
    url: `${prefixUrl}/edit/cost`,
    method: "post",
    params: {
      ...data,
    },
  });
};
export const getRecommandMember = (groupId: number) => {
  return request({
    url: `${prefixUrl}/recommendUser/${groupId}`,
    method: "get",
  });
};
/**
 * 获取组织所有用户
 * @param id 组织ID
 */
export const getOrgMemberPageById = (id: number) => {
  return function(params: any) {
    return request({
      url: `${prefixUrl}/show/user`,
      params: {
        orgId: id,
        ...params,
      },
    });
  };
};

export const setOrgRange = (value: string) => {
  return request({
    url: `${prefixUrl}/range/set`,
    method: "post",
    params: {
      scope: value,
    },
  });
};

export const getOrgBalanceValuation = () => {
  return request({
    url: `${prefixUrl}/balance/valuation`,
    method: "get",
  });
};

// 获取当前用户管理的组织
export const getUserManageOrgList = (params: any) => {
  return request({
    url: `${prefixUrl}/user/manage`,
    method: "get",
    params,
  });
};
