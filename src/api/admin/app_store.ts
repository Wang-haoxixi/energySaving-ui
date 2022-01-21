import request from "@/router/axios";

const prefixUrl = "/admin/app_store";
/**
 * 应用商店分页
 * @param params 分页参数
 */
export const getAppStorePage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
/**
 * 应用详情接口
 * @param id 应用ID
 */
export const getAppStoreById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
/**
 * 删除应用
 * @param id 应用ID
 */
export const delAppStoreById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "get",
  });
};
/**
 * 通过应用ID获取应用的所有版本
 * @param id 应用ID
 */
export const getAppStoreVersionListById = (id: number) => {
  return request({
    url: `${prefixUrl}/relation/list/${id}`,
    method: "get",
  });
};
/**
 * 改变应用状态
 * @param appId 应用ID
 * @param status 应用改变状态
 */
export const changeAppStoreById = (appId: number, status: string) => {
  return request({
    url: `${prefixUrl}/change`,
    method: "get",
    params: {
      appId,
      status,
    },
  });
};
/**
 * 上架应用
 * @param appId 应用ID
 */
export const upAppStoreById = (appId: number) => {
  return changeAppStoreById(appId, "2");
};
/**
 * 下架应用
 * @param appId 应用ID
 */
export const downAppStoreById = (appId: number) => {
  return changeAppStoreById(appId, "1");
};
/**
 * 新增应用
 * @param data 应用DTO
 */
export const postAppStore = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 新增应用版本
 * @param data 应用版本DTO
 */
export const postAppStoreVersion = (data: any) => {
  return request({
    url: `${prefixUrl}/relation/create`,
    method: "post",
    data,
  });
};
/**
 * 修改应用
 * @param data 应用DTO
 */
export const putAppStore = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 修改应用版本
 * @param data 应用版本DTO
 */
export const putAppStoreVersion = (data: any) => {
  return request({
    url: `${prefixUrl}/relation/update`,
    method: "post",
    data,
  });
};
/**
 * 删除应用版本
 * @param id 应用版本ID
 */
export const delAppStoreVersionById = (id: number) => {
  return request({
    url: `${prefixUrl}/relation/delete/${id}`,
    method: "get",
  });
};
/**
 * 购买应用
 * @param data 包装的ids applyId orgId
 */
export const buyAppForOrg = (data: any) => {
  return request({
    url: `${prefixUrl}/buy`,
    method: "post",
    data,
  });
};
/**
 * 获取组织的应用列表
 */
export const getOrgAppList = () => {
  return request({
    url: `${prefixUrl}/org/had/list`,
    method: "get",
  });
};

export const enableApplication = (id: number) => {
  return request({
    url: `${prefixUrl}/enable`,
    method: 'get',
    params: {
      appId: id,
    },
  });
};
