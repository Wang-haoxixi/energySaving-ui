import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/tag
export function getRecordMap(id: number) {
  return request({
    url: `${prefixUrl}/record/map/${id}`,
    method: "get",
  });
}
export function getRecordList(id: number, limit = 5) {
  return request({
    url: `${prefixUrl}/record/list/${id}`,
    method: "get",
    params: { limit },
  });
}
