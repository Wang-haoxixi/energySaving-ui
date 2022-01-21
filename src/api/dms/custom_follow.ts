import request from "@/router/axios";

const prefixUrl = "/dms/client_follow";
export const getAllPage = (params: any) => {
  return request({
    url: `${prefixUrl}/all_page`,
    method: "get",
    params: params,
  });
};
export const getPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};
export const getContactPage = (params: any) => {
  return request({
    url: `${prefixUrl}/contact_page`,
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
