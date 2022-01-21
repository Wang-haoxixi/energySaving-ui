import request from "@/router/axios";
const prefixUrl = "/dms/report_personal_week_month";

export const createData = (obj: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
};

export const updateData = (obj: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
};

export const getTableData = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};
