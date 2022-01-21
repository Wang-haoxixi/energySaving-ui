import request from "@/router/axios";
const prefixUrl = "/dms/task_relation";

export const deleteRelation = (obj: any) => {
  return request({
    url: `${prefixUrl}/del`,
    method: "POST",
    data: obj,
  });
};

export const addRelation = (obj: any) => {
  return request({
    url: `${prefixUrl}/add`,
    method: "POST",
    data: obj,
  });
};
