import request from "@/router/axios";
const prefixUrl = "/qms/exam_exercise_management";
/**
 * 我的考试
 */
export function getMyExePage(params: any) {
  return request({
    url: `${prefixUrl}/my_exercise_for_app`,
    method: "get",
    params,
  });
}

export const getMyExeInfo = () => {
  return request({
    url: `${prefixUrl}/my_pager_pc_count`,
    method: "get",
  });
};
