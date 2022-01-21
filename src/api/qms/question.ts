import request from "@/router/axios";

const prefixUrl = "/qms/question";

// 获取问题分页
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}
