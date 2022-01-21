import request from "@/router/axios";

const prefixUrl = "/fms/refund";
/**
 * 获取退款流程分页
 * @param type org so审核 operate 运维审核
 */
export const getRefundPageByType = (type: string) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page/${type}`,
      method: "get",
      params,
    });
  };
};
