import request from "@/router/axios";

const prefixUrl = "/qms/exam_ques_config";

export function getRandomConfig(params: any) {
  return request({
    url: `${prefixUrl}/get_ques_num_for_config`,
    method: 'get',
    params,
  });
}
