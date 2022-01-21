import request from "@/router/axios";

const prefixUrl = "/admin/block";

/**
 * 获取黑名单
 * @param 搜索参数
 */
export const getBlackList = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

/**
 * 加入黑名单
 * @param id 用户id
 */
export const addBlackList = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

/**
 * 移除黑名单
 * @param id 用户id
 */
export const removeBlackList = (id: number) => {
  return request({
    url: `${prefixUrl}/remove/${id}`,
    method: "get",
  });
};
