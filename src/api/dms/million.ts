import request from "@/router/axios";
export const prefixUrl = "/dms/million";

// 提交百万合伙人申请
export function createPartners(data: any) {
  return request({
    url: `${prefixUrl}/partners/create`,
    method: "post",
    data,
  });
}

// 获取申请列表-运营
export function getPartnerPage(params: any) {
  return request({
    url: `${prefixUrl}/partners/operate_page`,
    method: "get",
    params,
  });
}

// 获取申请详情
export function getPartnerDetailById(id: any) {
  return request({
    url: `${prefixUrl}/partners/${id}`,
    method: "get",
  });
}