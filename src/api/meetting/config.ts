import request from "@/router/axios";
const prefixUrl = "/qms/conference_config";

/**
 * 获取报名表单配置
 * @param params activityId=0
 */
export const getFormConfig = (params: any) => {
  return request({
    url: `${prefixUrl}/get_form_config`,
    method: "get",
    params,
  });
};