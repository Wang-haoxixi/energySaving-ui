import request from "@/router/axios";
const prefixUrl = "/qms";
// 分页查询考试题目 这个地方之前是get后来做了一些修改
export function getExamquestionPage(data: any) {
  return request({
    url: `${prefixUrl}/exam_question/page?current=${data.current}&size=${data.size}`,
    method: "post",
    data: data,
  });
}
// 新增考试题目
export function postExamquestionPage(data: any) {
  return request({
    url: `${prefixUrl}/exam_question/batch_save`,
    method: "post",
    data,
  });
}

// 删除考试题目
export function deleteExamquestion(data: any) {
  return request({
    url: `${prefixUrl}/exam_question/delete?id=${data}`,
    method: "post",
  });
}
// 删除考试题目批量
export function deleteQuestionBatchByIds(data: any) {
  return request({
    url: `${prefixUrl}/exam_question/batch_delete`,
    method: "post",
    data,
  });
}
// 更新考试题目批量
export function updateQuestionBatchByIds(data: any) {
  return request({
    url: `${prefixUrl}/exam_question/batch_update`,
    method: "post",
    data,
  });
}
//获取详情
export function getExamquestionPageById(id: number) {
  return request({
    url: `${prefixUrl}/exam_question/${id}`,
    method: "get",
  });
}
// 更新考试题目
export function updateExamquestionPage(data: any) {
  return request({
    url: `${prefixUrl}/exam_question/update`,
    method: "post",
    data,
  });
}
// 有冲突的时候更新考试题目
export function updateExamquestionPageAgain(data: any) {
  return request({
    url: `${prefixUrl}/exam_answer/batch_change_manage`,
    method: "post",
    data,
  });
}

/**
 * 试卷表
 */
export function getExamtestpaperPage(params: any) {
  return request({
    url: `${prefixUrl}/exam_test_paper/page`,
    method: "get",
    params,
  });
}
export function deleteExamtestpaperPage(data: any) {
  return request({
    url: `${prefixUrl}/exam_test_paper/delete?id=${data}`,
    method: "post",
  });
}

/**
 * 成绩管理
 */

//新增试卷
export function postTestPaper(data: any) {
  return request({
    url: `${prefixUrl}/exam_test_paper/save`,
    method: "post",
    data,
  });
}
//编辑试卷
export function putTestPaper(data: any) {
  return request({
    url: `${prefixUrl}/exam_test_paper/update`,
    method: "post",
    data,
  });
}
//查询
export function getTestPaperById(data: any) {
  return request({
    url: `${prefixUrl}/exam_test_paper/${data}`,
    method: "get",
  });
}

/**
 * 试卷分类
 */
export function getTestDictPage(params: any) {
  return request({
    url: `${prefixUrl}/exam_org_dict/so_dict_id`,
    method: "get",
    params,
  });
}

export function deleteTestDictById(id: any, category: any) {
  return request({
    url: `${prefixUrl}/exam_org_dict/delete/${category}/${id}`,
    method: "post",
  });
}

//新增
export function addTestDict(data: any) {
  return request({
    url: `${prefixUrl}/exam_org_dict/save`,
    method: "post",
    data,
  });
}

//修改
export function updateTestDict(data: any) {
  return request({
    url: `${prefixUrl}/exam_org_dict/update`,
    method: "post",
    data,
  });
}
/**
 * 成绩管理
 */
export function getExamexaminationmanagementPage(id: string, tabType: string | null = null) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/exam_examination_management/score_manage`,
      method: "get",
      params: {
        examId: id,
        tabType,
        ...params,
      },
    });
  };
}

/**
 * 我的考试
 */
export function getMyExamPage(params: any) {
  return request({
    url: `${prefixUrl}/exam_examination_management/my_pager_pc`,
    method: "get",
    params,
  });
}

export const getMyExamInfo = () => {
  return request({
    url: `${prefixUrl}/exam_examination_management/my_pager_pc_count`,
    method: "get",
  });
};

export function getExamResultPageByEId(id: string, tabType: string | null = null) {
  return getExamexaminationmanagementPage(id, tabType);
}

//查看答卷
export function getTestResultById(id: any) {
  return request({
    url: `${prefixUrl}/exam_answer/check_paper/${id}`,
    method: "get",
  });
}

//检查是否能查看试卷
export function checkState(params: any, type = 1) {
  return request({
    url: `${prefixUrl}/exam_answer/check_state_v2/${type}`,
    method: "get",
    params,
  });
}

//成绩管理中查看答卷
export function getTestResultByAdmin(id: any) {
  return request({
    url: `${prefixUrl}/exam_answer/check_paper_admin/${id}`,
    method: "get",
  });
}

//退款
export function getRefund(data: any) {
  return request({
    url: `${prefixUrl}/exam_examination/refund`,
    method: "post",
    data,
  });
}

//全部批改完成
export function commitCorrect(data: any) {
  return request({
    url: `${prefixUrl}/exam_answer/commit_correct`,
    method: "post",
    data,
  });
}
