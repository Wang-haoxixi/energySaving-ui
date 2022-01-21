import request from "@/router/axios";

const prefixUrl = "/auth/mobile";

export const postLoginByMobile = (mobile: string, code: string) => {
  const grant_type = "mobile";
  return request({
    url: `${prefixUrl}/token/sms`,
    headers: {
      Authorization: "Basic Z2RzOmdkcw==",
    },
    method: "post",
    params: { mobile: "SMS@" + mobile, code, grant_type },
  });
};
