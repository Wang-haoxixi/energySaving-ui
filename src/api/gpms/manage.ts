import request from "@/router/axios";
const prefixUrl = "/dms/project/online";

// 审批列表
export function getApprovalList(obj: any) {
  return request({
    url: "/dms/project/info/page/approval",
    method: "get",
    params: obj,
  });
}
//审核
export function approvalById(obj: any) {
  return request({
    url: "/dms/project/info/update/approval",
    method: "post",
    data: obj,
  });
}
//接收方分页
export function getPageCarryon(params: any) {
  return request({
    url: `${prefixUrl}/page_receiver`,
    method: "get",
    params: params,
  });
}
//发送方分页
export function getSendPage(params: any) {
  return request({
    url: `${prefixUrl}/page_sender`,
    method: "get",
    params: params,
  });
}
//网签合同新增
export function createOnlinecon(obj: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
export function updateOnlinecon(obj: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}
// 详情
export function getOnlineconDetail(onlineConId: any) {
  return request({
    url: `${prefixUrl}/${onlineConId}`,
    method: "get",
  });
}
export function deleteOnlinecon(id: any) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: [id],
  });
}
//撤回
export function revokeOnlinecon(obj: any) {
  return request({
    url: `${prefixUrl}/revoke`,
    method: "post",
    data: obj,
  });
}

//签订审核
export function verifyOnlinecon(obj: any) {
  return request({
    url: `/${prefixUrl}/verify`,
    method: "post",
    data: obj,
  });
}

