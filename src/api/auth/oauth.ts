import request from "@/router/axios";

const prefixUrl = "/auth/oauth";

const scope = "server";

export const postLogin = (username: any, password: any, code: any, randomStr: any) => {
  const grant_type = "password";
  return request({
    url: `${prefixUrl}/token`,
    headers: {
      isToken: false,
      TENANT_ID: "1",
      Authorization: "Basic Z2RzOmdkcw==",
    },
    method: "post",
    params: { username, password, randomStr, code, grant_type, scope },
  });
};