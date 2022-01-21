import request from "@/router/axios";
export const prefixUrl = "/dms/apply_record";

// 代理商管理分页
export function getApplyRecordPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params,
  });
}
