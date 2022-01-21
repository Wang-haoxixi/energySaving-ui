import request from "@/router/axios";

const prefixUrl = "/ims/rong";

/**
 * 能聘-沟通一下(发起沟通)
 * @param data 
 */
export const postMsgCustomInitiate = (data: any) => {
  return request({
    url: `${prefixUrl}/msg/custom/initiate`,
    method: "post",
    data,
  });
};

// 能聘投递邀请
export const sendInvitation = (data: any) => {
  return request({
    url: `${prefixUrl}/msg/custom/invitation`,
    method: "post",
    data,
  });
};

/**
 * 能聘投递邀请/面试邀请函-同意或者拒绝的消息通知
 * @param data 
 */
export const postMsgCustomStatus = (data: any) => {
  return request({
    url: `${prefixUrl}/msg/custom/status`,
    method: "post",
    data,
  });
};