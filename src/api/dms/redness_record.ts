import request from "@/router/axios";
export const prefixUrl = "/dms/redness_record";

// 红度分析
export function getRednessAnalysis(params: any) {
  return request({
    url: `${prefixUrl}/redness_analysis`,
    method: "get",
    params,
  });
}
// 红度详情分页
export function getRednessDetailPageByTID(relationId: any, type: string) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "get",
      params: {
        relationId,
        type,
        ...params,
      },
    });
  };
}
// 红度详情分页
export function getRednessDetailPage(relationId: any, type: string) {
  return getRednessDetailPageByTID(relationId, type);
}

/**
 * 组织活跃度
 */
export function getOrgActivity() {
  return request({
    url: `${prefixUrl}/org/activity`,
    method: "get",
  });
}
