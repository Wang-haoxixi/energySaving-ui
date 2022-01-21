import request from "@/router/axios";
const prefixUrl = "/qms/exam_answer";

export const answerExam = (data: any) => {
  return request({
    url: `${prefixUrl}/create_test_pager`,
    method: "post",
    data,
  });
};

export const editExam = (id: any) => {
  return request({
    url: `${prefixUrl}/continue_test_pager/${id}`,
    method: "get",
  });
};

export const getJudgeScoreDetail = (id: string) => {
  return request({
    url: `${prefixUrl}/correcting_page/${id}`,
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

// 提交单体分数
export const uploadScore = (data: any) => {
  return request({
    url: `${prefixUrl}/correcting_ques`,
    method: "post",
    data,
  });
};

//一键0分
export const postZeroScore = (data: any) => {
  return request({
    url: `${prefixUrl}/zero_score`,
    method: "post",
    data,
  });
};

