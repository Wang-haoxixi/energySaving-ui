import request from "@/router/axios";

const prefixUrl = "/dms/client";

export const getAllPage = (params: any) => {
  return request({
    url: `${prefixUrl}/all_page`,
    method: "get",
    params: params,
  });
};

export const getCustomPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};
export const getSeaPage = (params: any) => {
  return request({
    url: `${prefixUrl}/sea/page`,
    method: "get",
    params: params,
  });
};
export const ClaimSeaById = (id: any) => {
  return request({
    url: `${prefixUrl}/sea/claim/${id}`,
    method: "post",
  });
};
export const getAssistPage = (params: any) => {
  return request({
    url: `${prefixUrl}/assist_page`,
    method: "get",
    params: params,
  });
};
export const getExistence = (params: any) => {
  return request({
    url: `${prefixUrl}/whether_same`,
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
export const createSeaPage = (data: any) => {
  return request({
    url: `${prefixUrl}/sea/create`,
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
export const getTransfer = (selectIds: Array<[]>, userId: number) => {
  return request({
    url: `${prefixUrl}/transfer`,
    method: "post",
    data: {
      sourceIds: selectIds,
      targetId: userId,
    },
  });
};
export function deleteCustomById(id: any) {
  return request({
    url: `${prefixUrl}/logic_delete/${id}`,
    method: "get",
  });
}

export function deleteSeaById(id: any) {
  return request({
    url: `${prefixUrl}/sea/logic_delete/${id}`,
    method: "get",
  });
}