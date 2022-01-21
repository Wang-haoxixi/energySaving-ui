import request from "@/router/axios";
export const prefixUrl = "/dms/recruit_linkup";


/**
 * 能聘-聊天 判断用户是否有过沟通
 * @param params 
 */
export function ifUserLinkUp(params: any) {
  return request({
    url: `${prefixUrl}/if_user`,
    method: "get",
    params,
  });
}