import request from "@/router/axios";

const prefixUrl = "/qms/statistic";

// 获得每一题的统计
export function getPageById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
