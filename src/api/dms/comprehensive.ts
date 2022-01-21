import request from "@/router/axios";
import moment from "moment";

export type DateData = [Date | string, Date | string];

export const prefixUrl = "/dms/comprehensive";

export const getSoTaskData = (orgId: number) => {
  return request({
    url: `${prefixUrl}/org_task_count/${orgId}`,
    method: "get",
  });
};

export const gDateData = (dates: DateData = ["", ""]) => {
  if (dates === null) {
    return {
      startTime: "",
      endTime: "",
    };
  }
  const data = {
    startTime: dates[0] ? moment(dates[0]).format("YYYY-MM-DD HH:mm:ss") : "",
    endTime: dates[1] ? moment(dates[1]).format("YYYY-MM-DD HH:mm:ss") : "",
  };
  return data;
};

export function getPersonCore() {
  return request({
    url: `${prefixUrl}/person/core`,
    method: "get",
  });
}

export function getDynamic() {
  return request({
    url: `${prefixUrl}/person/dynamic`,
    method: "get",
  });
}

export function getPersonAgentCensus() {
  return request({
    url: `${prefixUrl}/person/agent_census`,
    method: "get",
  });
}

export function getOrgCommonlist(id: any) {
  return request({
    url: `${prefixUrl}/org_common_list/${id}`,
    method: "get",
  });
}

export function getSimilarOrglist(id: any) {
  return request({
    url: `${prefixUrl}/similar_org/${id}`,
    method: "get",
  });
}

export function getOrgCount(id: any) {
  return request({
    url: `${prefixUrl}/org_count/${id}`,
    method: "get",
  });
}

/**
 * 本日实时新增
 */
export function getDayCount() {
  return request({
    url: `${prefixUrl}/operation/day_count`,
    method: "get",
  });
}

/**
 * 平台昨日新增数据统计
 */
export function getYesterdayNewCount() {
  return request({
    url: `${prefixUrl}/operation/yesterday_new_count`,
    method: "get",
  });
}

/**
 * 平台数据总量统计
 */
export function getWholeCount() {
  return request({
    url: `${prefixUrl}/operation/whole_count`,
    method: "get",
  });
}
/**
 * 组织数据集合在一个接口
 */
export function getSoData(orgId: number) {
  return request({
    url: `${prefixUrl}/operation/so_data/${orgId}`,
    method: "get",
  });
}

export function getNewSoData() {
  return request({
    url: `${prefixUrl}/operation/new_so_data`,
    method: "get",
  });
}

export function getUserTargetByDate(dates?: DateData) {
  return request({
    url: `${prefixUrl}/operation/user_target`,
    method: "post",
    data: gDateData(dates),
  });
}

export function getOrgTargetByDate(dates?: DateData) {
  return request({
    url: `${prefixUrl}/operation/org_target`,
    method: "post",
    data: gDateData(dates),
  });
}

export function getThoughtTargetByDate(dates?: DateData) {
  return request({
    url: `${prefixUrl}/operation/thought_target`,
    method: "post",
    data: gDateData(dates),
  });
}

export function getOrderTargetByDate(dates?: DateData) {
  return request({
    url: `${prefixUrl}/operation/order_target`,
    method: "post",
    data: gDateData(dates),
  });
}
