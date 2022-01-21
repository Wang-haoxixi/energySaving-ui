import request from "@/router/axios";

const prefixUrl = "/ims/sys_msg";

export const getMessageCategoryList = () => {
  return request({
    url: `${prefixUrl}/category/list`,
    method: "get",
  });
};
export const getSoNewestNotice = () => {
  return request({
    url: `${prefixUrl}/newest/notice`,
    method: "get",
  });
};

export const getMessageListById = (id: number) => {
  return request({
    url: `${prefixUrl}/list/${id}`,
    method: "get",
  });
};

export const getMessageById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

export const passMessageById = (id: number) => {
  return request({
    url: `${prefixUrl}/pass/${id}`,
    method: "get",
  });
};

export const rejectMessageById = (id: number) => {
  return request({
    url: `${prefixUrl}/reject/${id}`,
    method: "get",
  });
};

export const sendNotice = (data: any) => {
  return request({
    url: `${prefixUrl}/send/notice`,
    method: "post",
    data,
  });
};

export const updateNotice = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const updateTop = (sysInfoId: string) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: {
      sysInfoId,
      isTop: true,
    },
  });
};
export const updateDown = (sysInfoId: string) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: {
      sysInfoId,
      isTop: false,
    },
  });
};

export const getNoticePageByOrgId = (orgId: number) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page`,
      method: "get",
      params: {
        ...params,
        orgId,
      },
    });
  };
};

export const sendWarning = (data: any) => {
  return request({
    url: `${prefixUrl}/send/warning`,
    method: "post",
    data,
  });
};
