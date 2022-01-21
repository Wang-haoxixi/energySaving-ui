import request from "@/router/axios";

const prefixUrl = "/fms/flow";

export const getFlowPage = (params: any, objectType: number) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: {
      ...params,
      objectType,
    },
  });
};

export function getPersonFlowPage(params: any) {
  return getFlowPage(params, 4);
}
export function getOrgFlowPage(params: any) {
  return getFlowPage(params, 3);
}
export function getPlatformFlowPage(params: any) {
  return getFlowPage(params, 1);
}

export function getCoinIssuePage(params: any) {
  return getFlowPage(params, 0);
}
