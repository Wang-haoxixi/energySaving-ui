import request from "@/router/axios";
const prefixUrl = "/qms";

//分页
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/exam_certificate/page`,
    method: "get",
    params,
  });
}

//获取详情
export function getById(id: number) {
  return request({
    url: `${prefixUrl}/exam_certificate/${id}`,
    method: "get",
  });
}

// 更新证书
export function updateEntity(data: any) {
  return request({
    url: `${prefixUrl}/exam_certificate/update`,
    method: "post",
    data,
  });
}

// 删除证书
export function deleteById(data: any) {
  return request({
    url: `${prefixUrl}/exam_certificate/delete/${data}`,
    method: "post",
  });
}

// 新增证书
export function saveEntity(data: any) {
  return request({
    url: `${prefixUrl}/exam_certificate/save`,
    method: "post",
    data,
  });
}

/**
 * 获证人员信息
 */
export const getPersonPage = (params: any) => {
  return request({
    url: `${prefixUrl}/exam_user_certificate/exam_certificate`,
    method: "get",
    params,
  });
};

export const getMyCertificatePage = (params: any) => {
  return request({
    url: `${prefixUrl}/exam_user_certificate/my_certificate_pc`,
    method: "get",
    params,
  });
};

// 单用户发放证书
export function sendAward(data: any) {
  return request({
    url: `${prefixUrl}/exam_user_certificate/award?examId=${data}`,
    method: "post",
    data,
  });
};

// 更多专家
export function getMoreExpert(examId: string, certId: string) {
  return request({
    url: `${prefixUrl}/exam_user_certificate/more_expert_for_app`,
    method: "get",
    params: { examId, certificateId: certId },
  });
};

// 更多获得证书人员
export function getMoreCertUser(examId: string) {
  return request({
    url: `${prefixUrl}/exam_user_certificate/more_users_for_app`,
    method: "get",
    params: { examId },
  });
};


// 考试下发放证书
export function sendBatchAward(data: any) {
  return request({
    url: `${prefixUrl}/exam_user_certificate/batch_award?examinationId=${data}`,
    method: "post",
    data,
  });
};

// 生成证书预览图
export function generatePreview(data: any) {
  return request({
    url: `${prefixUrl}/exam_certificate/generate_preview_pic/${data}`,
    method: "post",
    data,
  });
}
