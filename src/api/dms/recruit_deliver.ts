import request from "@/router/axios";
export const prefixUrl = "/dms/recruit_deliver";

export const getSelectStatus = (id: number) => {
  return request({
    url: `${prefixUrl}/select_status`,
    method: "get",
    params: {
      id,
    },
  });
};