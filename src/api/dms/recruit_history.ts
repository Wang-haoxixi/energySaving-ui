import request from "@/router/axios";
export const prefixUrl = "/dms/recruit_history";

// 能聘大厅筛选条件查询
export function getRecruitHistory(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}