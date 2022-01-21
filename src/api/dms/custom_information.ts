import request from "@/router/axios";

const prefixUrl = "/dms/client_information";
export const getPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};
export const createPage = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: data,
  });
};
export const postViewTimes = (id: any) => {
  return request({
    url: `${prefixUrl}/view/${id}`,
    method: "post",
  });
};
export const updatePage = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: data,
  });
};
export const getPageById = (id: any) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
export const delPageById = (id: any) => {
  return request({
    url: `${prefixUrl}/logic_delete/${id}`,
    method: "get",
  });
};
