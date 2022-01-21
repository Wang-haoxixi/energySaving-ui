import request from "@/router/axios";
export const prefixUrl = "/dms/channel";

export function getSearchPage(params: any) {
  return request({
    url: `${prefixUrl}/search_topic`,
    method: "get",
    params,
  });
}

export function getUOCount() {
  return request({
    url: `${prefixUrl}/uo_count`,
    method: "get",
  });
}

export function getSearchCount(keyword: string) {
  return request({
    url: `${prefixUrl}/search_count`,
    method: "get",
    params: {
      keyword,
    },
  });
}

export function getAbleOrgList() {
  return request({
    url: `${prefixUrl}/able_org`,
    method: "get",
  });
}

export function getRecOrgList() {
  return request({
    url: `${prefixUrl}/rec_org`,
    method: "get",
  });
}

export function getRecUserList() {
  return request({
    url: `${prefixUrl}/rec_user`,
    method: "get",
  });
}
