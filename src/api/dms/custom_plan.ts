import request from "@/router/axios";

const prefixUrl = "/dms/client_plan";
export const getPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};
export const getFile = (params: any) => {
  return request({
    url: `admin/file/${params}`,
    method: "get",
  });
};
export const createPage = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: data,
  });
};
export const updatePage = (data: any) => {
  return request({
    url: `${prefixUrl}/updateVersion`,
    method: "post",
    data: data,
  });
};
export const reNamePageById = (id: any, data: any) => {
  return request({
    url: `${prefixUrl}/rename/${id}`,
    method: "get",
    params: data,
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
    method: "post",
  });
};
