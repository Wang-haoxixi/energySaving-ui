import request from "@/router/axios";

const prefixUrl = "/admin/follow";
/**
 * 获取所有关注的人
 * @param data
 */
export const getFollowPage = (data: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "post",
    data,
  });
};
/**
 * 获取他人的所有关注的人
 * @param data
 */
export const getFollowPageById = (id: number) => {
  return function (data: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "post",
      data: {
        userId: id,
        type: 1,
        ...data,
      },
    });
  };
};
/**
 * 获取他人的所有粉丝
 * @param userId 用户ID
 */
export const getFanPageById = (id: number) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/fan_page`,
      method: "get",
      params: {
        userId: id,
        ...params,
      },
    });
  };

};
/**
 * 获取所有粉丝
 * @param userId 用户ID
 */
export const getFanById = (userId: number) => {
  return request({
    url: `${prefixUrl}/fan_page`,
    method: "get",
    params: {
      userId,
    },
  });
};
/**
 * 获取用户的关注
 * @param userId 用户ID
 */
export const getFollowById = (userId: number) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "post",
    data: {
      userId,
      type: 1,
    },
  });
};
/**
 * 关注与取关操作
 * @param data 关注DTO
 */
export const follow = (data: any) => {
  return request({
    url: `${prefixUrl}/user`,
    method: "post",
    data,
  });
};
/**
 * 获取推荐的关注
 */
export const followRecommend = (userId = null, size = 5) => {
  return request({
    url: `${prefixUrl}/recommend`,
    method: "get",
    params: {
      userId,
      size,
    },
  });
};
/**
 * 我的关系图谱
 */
export const followSocialNetwork = () => {
  return request({
    url: `${prefixUrl}/social_network`,
    method: "get",
  });
};

export const recommendPage = () => {
  return request({
    url: `${prefixUrl}/recommend_page`,
    method: "get",
  });
};

/**
 * 获取他人所有关注的组织
 * @param data
 */
export const getFollowSoById = (id: number) => {
  return function (data: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "post",
      data: {
        userId: id,
        type: 2,
        ...data,
      },
    });
  };
};
