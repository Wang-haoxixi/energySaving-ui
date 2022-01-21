import request from "@/router/axios";
const prefixUrl = "/dms/org_dynamic";

export const getDynamicPage = (params: any) => {
  return request({
    url: `${prefixUrl}/loading`,
    method: "get",
    params: params,
  });
};
