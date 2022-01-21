import request from "@/router/axios";

const prefixUrl = "/admin/mentor";
/**
 * 拜师
 * @param data 拜师DTO
 */
export const createMentor = (data: any) => {
  return request({
    url: `${prefixUrl}/apprentice`,
    method: "post",
    data,
  });
};
/**
 * 获取师徒
 * @param userId 用户ID
 */
export const getMyRelationList = (userId: string) => {
  return request({
    url: `${prefixUrl}/relation_list/${userId}`,
    method: "get",
  });
};

/**
 * 取消师徒关系
 * @param userId 用户ID
 */
export const cancelMentor = (userId: number) => {
  return request({
    url: `${prefixUrl}/relieve/${userId}`,
    method: 'post',
  });
};
/**
 * 获取师徒列表
 * @param realName 师徒搜索名字
 */
export const getMentorList = (realName = "") => {
  return request({
    url: `${prefixUrl}/search/list`,
    method: "get",
    params: {
      realName,
    },
  });
};
