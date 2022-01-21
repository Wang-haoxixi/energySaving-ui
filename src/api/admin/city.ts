import request from "@/router/axios";

const prefixUrl = "/admin/city";
/**
 * 获取城市树
 */
export const getCityTree = () => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
};
