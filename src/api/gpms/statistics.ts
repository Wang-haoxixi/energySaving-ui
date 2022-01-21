import request from "@/router/axios";
const prefixUrl = "/dms/project/info/data";

export const getInfoMy = () => {
  return request({
    url: `${prefixUrl}/my`,
    method: "get",
  });
};
export const getInfoAll = () => {
  return request({
    url: `${prefixUrl}/all`,
    method: "get",
  });
};

export const getInfoCurve = (params: any) => {
  return request({
    url: `${prefixUrl}/curve`,
    method: "get",
    params: params,
  });
};