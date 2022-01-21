import request from "@/router/axios";
const prefixUrl = "/dms/user_follow";

// 关注用户
export function followById(id) {
  return request({
    url: `${prefixUrl}/follow/${id}`,
    method: "post",
  });
}

// 取关用户
export function unfollowById(id) {
  return request({
    url: `${prefixUrl}/unfollow/${id}`,
    method: "post",
  });
}

// 分页查询关注的用户
export function getFollowPage(params) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}

export function fetchPage(query) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: query,
  });
}
