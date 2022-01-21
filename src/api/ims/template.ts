import request from "@/router/axios";

const prefixUrl = "/ims/template";

export const getTemplateById = (id: number, parentId: number) => {
  return request({
    url: `${prefixUrl}`,
    method: "get",
    params: {
      id,
      parentId,
    },
  });
};

export const putTemplate = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const getTemplateWaringList = () => {
  return request({
    url: `${prefixUrl}/warning/list`,
    method: "get",
  });
};
