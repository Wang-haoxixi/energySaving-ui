import request from "@/router/axios";

const prefixUrl = "/dms/client_contact";
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
export const getClientPage = (params: any) => {
  return request({
    url: `${prefixUrl}/client_page`,
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
export const createApplyPage = (data: any) => {
  return request({
    url: `${prefixUrl}/apply/create`,
    method: "post",
    data: data,
  });
};
export const dealApplyPage = (id: any, params: any) => {
  return request({
    url: `${prefixUrl}/apply/deal/${id}`,
    method: "get",
    params: params,
  });
};
export const getApplyPage = (id: any) => {
  return request({
    url: `${prefixUrl}/apply/${id}`,
    method: "get",
  });
};
export const updatePage = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: data,
  });
};
export const getContactById = (id: any) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

export const getTransfer = (selectIds: Array<[]>, userId: number) => {
  return request({
    url: `${prefixUrl}/transfer`,
    method: "post",
    params: {
      sourceIds: selectIds,
      targetId: userId,
    },
  });
};
