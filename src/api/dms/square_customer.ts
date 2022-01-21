import request from "@/router/axios";
export const prefixUrl = "/dms/square_customer";
/**
 * 为产品添加客户
 * @param data
 */
export const addProductCustomer = (data: any) => {
  return request({
    url: `${prefixUrl}/add/customer`,
    method: 'post',
    data,
  });
};
/**
 * 删除客户
 * @param id 删除的ID
 */
export const removeProductCustomer = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  });
};
/**
 * 活动改产品的所有客户
 * @param productId 产品ID
 */
export const getProductCustomerList = (productId: number) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: {
      id: productId,
    },
  });
};
