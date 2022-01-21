import request from "@/router/axios";
const prefixUrl = "/dms/task_sign";

export const taskSignUp = (id: any) => {
  return request({
    url: `${prefixUrl}/create/${id}`,
    method: "post",
  });
};

export const getChoosePage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};

export const choosePeople = (obj: any) => {
  return request({
    url: `${prefixUrl}/choose`,
    method: "post",
    data: obj,
  });
};

export const taskCancelById = (id: any) => {
  return request({
    url: `${prefixUrl}/cancel/${id}`,
    method: "post",
  });
};

