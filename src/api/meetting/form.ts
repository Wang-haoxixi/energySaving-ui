import request from "@/router/axios";

const prefixUrl = "/qms/conference_enrole_form";

/**
 * 确认订单(自定义表单)
 * @param data 
 */
export const createEnrollForm = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
export const createEnrollFormALL = (data: any) => {
  return request({
    url: `${prefixUrl}/all/create`,
    method: "post",
    data,
  });
};
export const contactsByEnrole = (enroleId: number) => {
  return request({
    url: `${prefixUrl}/contacts_by_enrole`,
    method: "get",
    params: {
      enroleId,
    },
  });
};

/**
 * 报名联系人列表下载
 */

export function enroleFormDownload(params: any, fileName: any) {
  return request({
    url: `${prefixUrl}/download`,
    method: "get",
    params,
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