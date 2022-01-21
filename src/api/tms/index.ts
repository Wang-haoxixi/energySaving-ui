import request from "@/router/axios";

const prefixUrl = "/tms/tag";
// @/api/tms/index
export function getTagList(query: any) {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
    params: query,
  });
}