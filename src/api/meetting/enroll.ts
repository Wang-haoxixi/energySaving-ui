import request from "@/router/axios";

const prefixUrl = "/qms/conference_enrole";

let meetId = 0;

/**
 * 会议报名信息提交
 * @param data
 */
export const createEnroll = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};

/**
 * 活动接入订单后的报名
 * @param data 
 */
export const createEnrollV2 = (data: any) => {
  return request({
    url: `${prefixUrl}/v2/create`,
    method: "post",
    data,
  });
};

export const updateSoRemarks = (data: any) => {
  return request({
    url: `${prefixUrl}/update_so_remark`,
    method: "post",
    data,
  });
};

export const getDetail = (params: any) => {
  return request({
    url: `${prefixUrl}/get`,
    method: "get",
    params,
  });
};

export const getPayDetail = (params: any) => {
  return request({
    url: `${prefixUrl}/payment/form`,
    method: "get",
    params,
  });
};

/**
 * 付款表单_V2
 * @param enroleId
 */
export const getPayDetailById = (enroleId: number) => {
  return request({
    url: `${prefixUrl}/payment/form_v2`,
    method: "get",
    params: {
      enroleId,
    },
  });
};

export const getEnroleUser = (params: any) => {
  return request({
    url: `${prefixUrl}/enrole_user`,
    method: "get",
    params,
  });
};

export const getSuccessDetail = (params: any) => {
  return request({
    url: `${prefixUrl}/get/success`,
    method: "get",
    params,
  });
};

export const changeenroleID = (data: any) => {
  meetId = data;
};

export const getEntryPage = (params: any) => {
  params.conferenceId = meetId;
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
export const getActivityUserPageById = (conferenceId: number) => {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/page_v2`,
      method: "get",
      params: {
        conferenceId,
        ...params,
      },
    });
  };
};
export const getActivityUserPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page_v2`,
    method: "get",
    params,
  });
};

export const deleteEnroll = (data: any) => {
  return request({
    url: `${prefixUrl}/delete`,
    method: "post",
    data,
  });
};

export function getDownload(data: any, fileName: any) {
  return request({
    url: `${prefixUrl}/download`,
    method: "get",
    params: data,
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "arraybuffer",
  }).then((response: any) => {
    // 处理返回的文件流
    // console.log("处理返回的文件流", response);
    const blob = new Blob([response], {
      type: "application/vnd.ms-excel",
      // type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    link.click();
  });
}

export const cancelEnroll = (data: any) => {
  return request({
    url: `${prefixUrl}/cannel`,
    method: "post",
    data,
  });
};

/**
 * 票务统计
 * @conferenceId 会议id
 * @endTime 结束时间
 * @startTime 开始时间
 */

export const ticketingStatistics = (params: any) => {
  return request({
    url: `${prefixUrl}/ticketing_statistics`,
    method: "get",
    params,
  });
};

/**
 * 会议报名状态统计
 * @conferenceId 会议id
 */

export const statusStatistics = (params: any) => {
  return request({
    url: `${prefixUrl}/status_statistics`,
    method: "get",
    params,
  });
};

/**
 * 会议报名用户数量统计
 * @conferenceId 会议id
 * @endTime 结束时间
 * @startTime 开始时间
 */

export const userStatistics = (params: any) => {
  return request({
    url: `${prefixUrl}/user_statistics`,
    method: "get",
    params,
  });
};

export const signStatistics = (params: any) => {
  return request({
    url: `${prefixUrl}/sign_statistics`,
    method: "get",
    params,
  });
};

// 会议报名信息审核
export const enroleAudit = (data: any) => {
  return request({
    url: `${prefixUrl}/audit`,
    method: "post",
    data,
  });
};
