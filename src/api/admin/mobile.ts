import request from "@/router/axios";
const prefixUrl = "/admin/mobile";
/**
 * 获取手机验证码
 * @param mobile 电话或手机号
 */
export const getMobileCode = (mobile: string) => {
  return request({
    url: `${prefixUrl}/${mobile}`,
    method: "get",
  });
};
/**
 * 验证是否电话手机号重复
 * @param phone 电话手机
 */
export const validRegisterUserPhone = (phone: string) => {
  return request({
    url: `${prefixUrl}/repeat/phone/${phone}`,
    method: "get",
  });
};

export function cancellationCodeSendByMobile(mobile: string) {
  return request({
    url: `${prefixUrl}/send`,
    method: "get",
    params: {
      mobile,
      type: 'cancellation',
    },
  });
}
