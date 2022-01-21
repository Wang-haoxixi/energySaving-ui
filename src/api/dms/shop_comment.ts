import request from "@/router/axios";
export const prefixUrl = "/dms/shop_comment";

export function postComment(obj: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
/**
 * 评论等级分布
 * @param id 目标ID
 * @param type 目标类型 1-产品 2-方案
 */
export function getRank(id: number) {
  return request({
    url: `${prefixUrl}/rank/${id}`,
    method: "get",
  });
}

export function getCommentPage(params: any) {
  return request({
    url: `${prefixUrl}/comment_page`,
    method: "get",
    params: params,
  });
}
