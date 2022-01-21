import request from "@/router/axios";
const prefixUrl = "/dms/project/relation/dict";

export function getDataList(num: any) {
  return request({
    url: `${prefixUrl}/list/${num}`,
    method: "get",
  });
}
export const addData = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

export const updateData = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const delData = (id: number) => {
  return request({
    url: `${prefixUrl}/logic_delete/${id}`,
    method: "post",
  });
};
//获取配置项
export function getDictList() {
  return request({
    url: `${prefixUrl}/all_list`,
    method: "get",
  });
}