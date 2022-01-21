import request from "@/router/axios";

const prefixUrl = "/qms/conference_ticketing";

export const postTicket = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

export const deleteTicket = (data: any) => {
  return request({
    url: `${prefixUrl}/logic_batch_delete`,
    method: "post",
    data,
  });
};

export const getTicketById = (params: any) => {
  return request({
    url: `${prefixUrl}/get`,
    method: "get",
    params,
  });
};

export const getTicketByAid = (conferenceId: number) => {
  return request({
    url: `${prefixUrl}/get_by_conference`,
    method: "get",
    params: { conferenceId },
  });
};

export const putTicket = (data: any) => {
  return request({
    url: `${prefixUrl}/edit_ticket`,
    method: "post",
    data,
  });
};

export const pay = (data: any) => {
  return request({
    url: `${prefixUrl}/pay`,
    method: "post",
    data,
  });
};

export const payment = (data: any) => {
  return request({
    url: `${prefixUrl}/offline_payment_confirm`,
    method: "post",
    data,
  });
};
// 查询签到码
export const getSignInCodeById = (enrollId: number) => {
  return request({
    url: `${prefixUrl}/sign_in_code`,
    method: "get",
    params: {
      enrollId,
    },
  });
};
// 核销签到码
export const writeOffSignInCode = (data: any) => {
  return request({
    url: `${prefixUrl}/write_off`,
    method: "post",
    data: {
      orderNos: data,
    },
  });
};

/**
 * 活动支付
 * @id 报名订单id
 * @paymentMethod 支付方式
 * @safePassWord 支付密码
 */

export const activityPay = (data: any) => {
  return request({
    url: `${prefixUrl}/activity_pay`,
    method: "post",
    data,
  });
};

/**
 * 活动支付回调
 * @id 订单id
 */

export const activityPayCallback = (id: number) => {
  return request({
    url: `${prefixUrl}/activity_pay_callback/${id}`,
    method: "get",
  });
};

/**
 * 活动支付回调
 * @id 订单id
 */

export const payCallbackNumber = (orderNumber: number) => {
  return request({
    url: `${prefixUrl}/pay_callback_number/${orderNumber}`,
    method: "get",
  });
};
