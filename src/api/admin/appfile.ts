import request from "@/router/axios";
const prefixUrl = "/admin/file";


export const uploadByCard = (data: any, config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
}) => {
  return request(
    {
      url: `${prefixUrl}/sftp/upload`,
      method: "post",
      data: data,
      ...config,
    },
  );
};
