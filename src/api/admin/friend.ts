import request from "@/router/axios";

const prefixUrl = "/admin/friend";
/**
 * 获取好友列表
 * @param realName 好友搜索名字
 */
export const getFriendList = (realName = "") => {
  return request({
    url: `${prefixUrl}/search/list`,
    method: "get",
    params: {
      realName,
    },
  });
};
/**
 * 发送好友请求
 * @param data 发送好友请求DTO
 */
export const createFriend = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 删除好友
 * @param id 好友用户ID
 */
export const deleteFriend = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "get",
  });
};
