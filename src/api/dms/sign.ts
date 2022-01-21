import request from "@/router/axios";
const prefixUrl = "/dms/sign";

export const getUserSignListById = (id: number) => {
  return request({
    url: `${prefixUrl}/list/${id}`,
    method: 'get',
  });
};

export const postUserSign = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data,
  });
};

export const agreeSignById = (id: number) => {
  return request({
    url: `${prefixUrl}/agree/${id}`,
    method: 'get',
  });
};
