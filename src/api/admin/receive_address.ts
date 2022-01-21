import request from "@/router/axios";

const prefixUrl = "/admin/receive_address";

/**
 * 获取用户收货地址列表
 */
export const getReceiveAddressList = () => {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
  });
};

/**
 * 新增用户收货地址列表
 * @param data
 */
export const createReceiveAddress = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
};

/**
 * 修改用户收货地址列表
 * @param data
 */
export const updateReceiveAddress = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

/**
 * 设置默认
 * @param id ID
 */
export const defaultReceiveAddress = (id: number) => {
  return request({
    url: `${prefixUrl}/default/${id}`,
    method: "post",
  });
};

/**
 * 删除
 * @param id ID
 */
export const deleteReceiveAddress = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
