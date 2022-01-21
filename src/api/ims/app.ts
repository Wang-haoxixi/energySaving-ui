import request from "@/router/axios";
import { AxiosPromise } from 'axios';
import { Page } from '@/types/common';

const prefixUrl = "/ims/app";
/**
 * 获取APP消息分页
 * @param params 分页参数
 */
export const getMsgPageById = (id: number) => {
  return function (params?: any): AxiosPromise<Page> {
    return request({
      url: `${prefixUrl}/sys_msg/page`,
      method: "get",
      params: { id, ...params },
    });
  };
};

export const getDealInfoById = (id: number) => {
  return request({
    url: `${prefixUrl}/friendinfo`,
    method: "get",
    params: {
      id,
    },
  });
};
