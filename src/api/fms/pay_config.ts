import request from "@/router/axios";

const prefixUrl = "/fms/pay_config";

export const postPayConfig = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

export const putPayConfig = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
export const getPayConfigPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
export const delPayConfiglById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "get",
  });
};