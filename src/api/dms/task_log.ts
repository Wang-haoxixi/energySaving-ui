import request from "@/router/axios";
const prefixUrl = "/dms/task_log";

export const getTaskLog = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};
