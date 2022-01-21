import request from "@/router/axios";
const prefixUrl = "/ims/manualCustomerService";

export function getTablePage(query) {
  return request({
    url: `${prefixUrl}/getPendingReplyPage`,
    method: "get",
    parmas: query,
  });
}

export function putQuestion(query) {
  return request({
    url: `${prefixUrl}/putQuestion`,
    method: "post",
    data: query,
  });
}

export function pickUp(query) {
  return request({
    url: `${prefixUrl}/pickUp`,
    method: "post",
    params: query,
  });
}

export function disconnect(query) {
  return request({
    url: `${prefixUrl}/disconnect`,
    method: "post",
    params: query,
  });
}

export function getGroupByUser(query) {
  return request({
    url: `${prefixUrl}/getGroupByUser`,
    method: "get",
    params: query,
  });
}

export function transfer(query) {
  return request({
    url: `${prefixUrl}/transfer`,
    method: "post",
    params: query,
  });
}
