import request from "@/router/axios";

const prefixUrl = "/fms/mobile";

export const getMobileList = () => {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
  });
};

export const delMobileById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "get",
  });
};

export const createMobile = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
