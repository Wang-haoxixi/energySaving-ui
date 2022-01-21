import request from "@/router/axios";

const prefixUrl = "/admin/sensitive_word";

export const getWordPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

export const getWordById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

export const postWord = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

export const putWord = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const delWordById = (data: any) => {
  return request({
    url: `${prefixUrl}/logic_delete/batch`,
    method: "post",
    data,
  });
};