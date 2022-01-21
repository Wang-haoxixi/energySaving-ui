import request from "@/router/axios";

const prefixUrl = "/fms/account";

export const getAccountBalance = () => {
  return request({
    url: `${prefixUrl}/balance`,
    method: "get",
  });
};

export const issuedAmount = (data: any) => {
  return request({
    url: `${prefixUrl}/coin/making`,
    method: "post",
    data,
  });
};
/**
 * 平台!
 * @param data
 */
export const transferAmount = (data: any) => {
  return request({
    url: `${prefixUrl}/platform/transfer`,
    method: "post",
    data,
  });
};
/**
 * 个人
 * @param data
 */
export const transactionAmount = (data: any) => {
  return request({
    url: `${prefixUrl}/transaction`,
    method: "post",
    data,
  });
};
/**
 * 组织
 * @param data
 */
export const transactionSoAmount = (data: any) => {
  return request({
    url: `${prefixUrl}/so/transaction`,
    method: "post",
    data,
  });
};

export const getAccountVal = (params: any) => {
  return request({
    url: `${prefixUrl}/balance/valuation`,
    method: "get",
    params,
  });
};
