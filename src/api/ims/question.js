import request from "@/router/axios";
const prefixUrl = "/ims/question";

export function getQuestionPage(query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: "get",
    params: query,
  });
}

export function saveOrUpdateOne(data) {
  return request({
    url: `${prefixUrl}/saveOrUpdateOne`,
    method: "post",
    data: data,
  });
}

export function getQuestionById(params) {
  return request({
    url: `${prefixUrl}/getOne`,
    method: "get",
    params: params,
  });
}

export function deleteQuestion(data) {
  return request({
    url: `${prefixUrl}/deleteOne`,
    method: "post",
    params: data,
  });
}

export function goodReview(params) {
  return request({
    url: `${prefixUrl}/goodReview`,
    method: "post",
    params: params,
  });
}

export function badReview(params) {
  return request({
    url: `${prefixUrl}/badReview`,
    method: "post",
    params: params,
  });
}
