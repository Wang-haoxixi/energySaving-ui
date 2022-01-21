import request from "@/router/axios";
const prefixUrl = "/qms/cooperation_comment";

// 获取评论分页-带类型查询
export function getCommentPage(params: any) {
  return request({
    url: `${prefixUrl}/page_type`,
    method: "get",
    params,
  });
}

// 任务发布评论
export function createComment(data: any) {
  return request({
    url: `${prefixUrl}/publish`,
    method: "post",
    data,
  });
}

// 评论回复
export function createReply(data: any) {
  return request({
    url: `${prefixUrl}/reply`,
    method: "post",
    data,
  });
}

// 根据评论id查询评论信息
export function getReplyById(params: any) {
  return request({
    url: `${prefixUrl}/select_id`,
    method: "get",
    params: params,
  });
}

// 评论详情
export function getReplyPage(params: any) {
  return request({
    url: `${prefixUrl}/comment_detatils`,
    method: "get",
    params: params,
  });
}

// 任务评论举报
export function reportComment(data: any) {
  return request({
    url: `${prefixUrl}/report`,
    method: "post",
    data,
  });
}