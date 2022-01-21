import request from "@/router/axios";

const prefixUrl = "/admin/log";
/**
 * 获取日志分页
 * @param params 分页参数
 */
export const getLogPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
