import request from "@/router/axios";

const prefixUrl = "/auth/token";

export const postLogout = () => {
  return request({
    url: `${prefixUrl}/logout`,
    method: "delete",
  });
};