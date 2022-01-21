import request from "@/router/axios";

const prefixUrl = "/dms/plan";

export const createMenu = (data: any) => {
  return request({
    url: `${prefixUrl}/create_menu`,
    method: "post",
    data: data,
  });
};

export function getDetailById(id: any) {
  return request({
    url: `${prefixUrl}/menu/${id}`,
    method: "get",
  });
}
