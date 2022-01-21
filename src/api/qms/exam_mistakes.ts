import request from "@/router/axios";
const prefixUrl = "/qms/exam_mistakes";
/**
 * 我的考试错题接口
 */
export function getExamMyMistakesPage(params: any) {
  return request({
    url: `${prefixUrl}/my_mistakes`,
    method: "get",
    params,
  });
}
export function getExamMistakesById(id: string) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
export function myMistakesCount() {
  return request({
    url: `${prefixUrl}/my_mistakes_count`,
    method: "get",
  });
}
