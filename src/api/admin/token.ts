import request from "@/router/axios";

const prefixUrl = "/admin/token";

export function getTokenPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}
/**
 * 强制下线
 * @param id token
 */
export function delTokenById(id: string) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "delete",
  });
}
