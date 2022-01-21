import request from "@/router/axios";
import { DateData, gDateData } from '../dms/comprehensive';

const prefixUrl = "/qms/answer";

// 获取我的问卷分页
export function getPage(questionnaireId: number) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/answer_page`,
      method: "get",
      params: {
        questionnaireId,
        ...params,
      },
    });
  };
}
// export function getPage(params: any) {
//   return request({
//     url: `${prefixUrl}/answerPage`,
//     method: "get",
//     params: params,
//   });
// }
// 获取问卷填报的数据
export function getPageByQuesId(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

// 详情
export function getPageById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
// 游客作答提交问卷
export function createOuterPage(data: any) {
  return request({
    url: `${prefixUrl}/outer/create`,
    method: "post",
    data,
  });
}
// 提交问卷
export function createPage(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

//  限制手机号问卷提交
export function createOuterMobilePage(data: any, mobile: string) {
  return request({
    url: `${prefixUrl}/outer_mobile/create`,
    method: "post",
    data,
    params: {
      mobile,
    },
  });
}


// 下载
export function download(data: any) {
  return request({
    url: `${prefixUrl}/answer_export`,
    method: "post",
    data,
  });
}

//下载
export function downLoad(params: any) {
  return request({
    url: `${prefixUrl}/answer_export`,
    method: "post",
    data: params || {},
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// 导出
export function getDownload(data: any, fileName: any) {
  return request({
    url: `${prefixUrl}/answer_export`,
    method: "post",
    data: data,
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
    link.download = `${fileName}.xls`;
    link.click();
  });
}

// 获取每一题的分析报告
export function getQuestionAnswerPage(params: any) {
  return request({
    url: `${prefixUrl}/question_answer_page`,
    method: "get",
    params,
  });
}
// 问卷工作台
export function getAnswerTargetByDate(dates?: DateData) {
  return request({
    url: `${prefixUrl}/operation/answer_target`,
    method: "post",
    data: gDateData(dates),
  });
}
