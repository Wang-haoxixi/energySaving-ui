import request from "@/router/axios";
export const prefixUrl = "/dms/common_comment";

export function createComment(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

// 通过被评论id、类型查询评论分页
export function getCommentPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}
export function getPersonalCommentPage(params: any) {
  return request({
    url: `${prefixUrl}/personal/page`,
    method: "get",
    params,
  });
}

// 评论点赞
export function likesComment(id: number) {
  return request({
    url: `${prefixUrl}/likes/${id}`,
    method: "get",
  });
}

// 评论点赞取消
export function disLikesComment(id: number) {
  return request({
    url: `${prefixUrl}/dislikes/${id}`,
    method: "get",
  });
}

// 通过被评论id查询回复信息分页
export function getReplyPage(params: any) {
  return request({
    url: `${prefixUrl}/reply_page`,
    method: "get",
    params,
  });
}

// 逻辑删除评论
export function commentDeleteById(id: any) {
  return request({
    url: `${prefixUrl}/logic_delete/${id}`,
    method: "post",
  });
}
