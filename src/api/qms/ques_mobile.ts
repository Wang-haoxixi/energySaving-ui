import request from "@/router/axios";

const prefixUrl = "/qms/ques_mobile";

export function getMobileListById(id: number) {
  return request({
    url: `${prefixUrl}/list/${id}`,
    method: "get",
  });
}
export function mobileSendMessage(params: any) {
  return request({
    url: `${prefixUrl}/send_message`,
    method: "get",
    params,
  });
}
export function mobileValidCode(params: any) {
  return request({
    url: `${prefixUrl}/valid_code`,
    method: "get",
    params,
  });
}