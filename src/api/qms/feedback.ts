import request from "@/router/axios";
const prefixUrl = "/qms/exam_feedback";

// 分页
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}
// 我的分页
export function getMyFeedbackPage(params: any) {
  return request({
    url: `${prefixUrl}/my_feedback`,
    method: "get",
    params,
  });
}

//查询
export function getById(id: any) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

//处理反馈
export function solve(data: any) {
  return request({
    url: `${prefixUrl}/solve`,
    method: "post",
    data,
  });
}

//新增反馈
export function saveFeedback(data: any) {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
}

// 我的反馈-数量及通过情况
export function myFeedbackCount() {
  return request({
    url: `${prefixUrl}/my_feedback_count`,
    method: "get",
  });
}
