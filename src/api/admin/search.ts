import request from "@/router/axios";

const prefixUrl = "/admin/search";

export function searchUser(params: any) {
  return request({
    url: `${prefixUrl}/search_user`,
    method: "get",
    params
  });
}

export function searchOrg(params: any) {
  return request({
    url: `${prefixUrl}/search_org`,
    method: "get",
    params
  });
}
export function searchCount(keyword: string) {
  return request({
    url: `${prefixUrl}/search_count`,
    method: "get",
    params: { keyword }
  });
}

// 获取优秀用户
export function getAbleUserList() {
  return request({
    url: `${prefixUrl}/able_user`,
    method: "get"
  });
}
