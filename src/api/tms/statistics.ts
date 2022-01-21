import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/statistics
export function getTagStatistics() {
  return request({
    url: `${prefixUrl}/statistics/count`,
    method: "get",
  });
}

export function getTagDistributed() {
  return request({
    url: `${prefixUrl}/statistics/distributed`,
    method: "get",
  });
}

export function getTagDayNew() {
  return request({
    url: `${prefixUrl}/statistics/day_new`,
    method: "get",
  });
}

export function getTagWeekNew() {
  return request({
    url: `${prefixUrl}/tag/week_tags`,
    method: "get",
  });
}

export function getTagCommon() {
  return request({
    url: `${prefixUrl}/statistics/common`,
    method: "get",
  });
}
export function getTagRelationList(id: number) {
  return request({
    url: `${prefixUrl}/statistics/relation/${id}`,
    method: "get",
  });
}
