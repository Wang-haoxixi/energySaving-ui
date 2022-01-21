import request from "@/router/axios";
const prefixUrl = "/qms/exam_exercise_answer";

export const answerExe = (data: any) => {
  return request({
    url: `${prefixUrl}/create_test_pager`,
    method: "post",
    data,
  });
};

export const editExe = (id: any) => {
  return request({
    url: `${prefixUrl}/continue_test_pager/${id}`,
    method: "get",
  });
};

//答题  保存并退出
export const answerHandle = (data: any) => {
  return request({
    url: `${prefixUrl}/answer_question`,
    method: "post",
    data,
  });
};

//交卷
export const paperHand = (data: any) => {
  return request({
    url: `${prefixUrl}/commit_paper`,
    method: "post",
    data,
  });
};

//查看答卷
export function getExeCheckPaperById(id: any) {
  return request({
    url: `${prefixUrl}/check_paper/${id}`,
    method: "get",
  });
}
